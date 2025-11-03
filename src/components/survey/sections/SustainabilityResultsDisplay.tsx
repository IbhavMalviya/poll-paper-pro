import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SurveyData } from "@/types/survey";
import { Leaf, Zap } from "lucide-react";

interface SustainabilityResultsDisplayProps {
  surveyData: Partial<SurveyData>;
}

const SustainabilityResultsDisplay = ({ surveyData }: SustainabilityResultsDisplayProps) => {
  if (!surveyData.renewableElectricityAccess || !surveyData.estimatedAnnualFootprint) {
    return null;
  }

  const getAccessLevel = (access: string) => {
    switch (access) {
      case "Yes, fully renewable":
        return { level: "Excellent", color: "bg-green-600", impact: "Very Low Impact" };
      case "Partially (grid + renewable)":
        return { level: "Good", color: "bg-blue-600", impact: "Moderate Impact" };
      case "No, only grid electricity":
        return { level: "Standard", color: "bg-yellow-600", impact: "Higher Impact" };
      case "Don't know":
        return { level: "Unknown", color: "bg-gray-600", impact: "Impact Unknown" };
      default:
        return { level: "Unknown", color: "bg-gray-600", impact: "Impact Unknown" };
    }
  };

  const getFootprintAccuracy = (estimate: string) => {
    const actualEstimate = parseFloat(surveyData.calculatedTotalCo2?.toString() || "0");
    const estimateRanges: Record<string, [number, number]> = {
      "Less than 500 kg CO₂": [0, 500],
      "500-1000 kg CO₂": [500, 1000],
      "1000-2000 kg CO₂": [1000, 2000],
      "2000-3000 kg CO₂": [2000, 3000],
      "More than 3000 kg CO₂": [3000, 10000],
      "Not sure": [0, 10000],
    };

    const range = estimateRanges[estimate] || [0, 10000];
    const isAccurate = actualEstimate >= range[0] && actualEstimate <= range[1];

    return {
      isAccurate,
      message: isAccurate
        ? "Your estimate aligns well with the calculated footprint!"
        : "There's a difference between your estimate and the actual calculation.",
    };
  };

  const accessInfo = getAccessLevel(surveyData.renewableElectricityAccess);
  const accuracyInfo = getFootprintAccuracy(surveyData.estimatedAnnualFootprint);

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Your Sustainability Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Renewable Energy Access</span>
            </div>
            <Badge className={`${accessInfo.color} text-white`}>{accessInfo.level}</Badge>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{accessInfo.impact}</p>
        </div>

        <div className="p-4 bg-background/50 rounded-lg space-y-2">
          <p className="text-sm font-medium">Footprint Awareness</p>
          <p className="text-xs text-muted-foreground">{accuracyInfo.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={accuracyInfo.isAccurate ? "default" : "secondary"}>
              {accuracyInfo.isAccurate ? "Accurate Estimate" : "Learning Opportunity"}
            </Badge>
          </div>
        </div>

        {surveyData.renewableElectricityAccess === "No, only grid electricity" && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              💡 Consider exploring renewable energy options to reduce your carbon footprint!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SustainabilityResultsDisplay;
