import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SurveyData } from "@/types/survey";
import { Leaf, Zap } from "lucide-react";

interface SustainabilityResultsDisplayProps {
  surveyData: Partial<SurveyData>;
}

const SustainabilityResultsDisplay = ({ surveyData }: SustainabilityResultsDisplayProps) => {
  if (!surveyData.estimatedAnnualFootprint) {
    return null;
  }

  const getFootprintAccuracy = (estimate: string) => {
    const dailyFootprint = parseFloat(surveyData.calculatedTotalCo2?.toString() || "0");
    const actualEstimate = dailyFootprint * 365; // Convert daily to annual
    const estimateRanges: Record<string, [number, number]> = {
      "Less than 200 kg CO₂": [0, 200],
      "200-400 kg CO₂": [200, 400],
      "400-600 kg CO₂": [400, 600],
      "600-800 kg CO₂": [600, 800],
      "More than 800 kg CO₂": [800, 10000],
      "Not sure": [0, 10000],
    };

    const range = estimateRanges[estimate] || [0, 10000];
    const isAccurate = actualEstimate >= range[0] && actualEstimate <= range[1];
    
    let detailedMessage = "";
    let impactLevel = "";
    
    if (estimate === "Not sure") {
      detailedMessage = `Your actual calculated footprint is ${actualEstimate.toFixed(2)} kg CO₂/year. This calculation is based on your device usage, streaming habits, AI interactions, and charging patterns. Understanding your digital carbon footprint is the first step toward reducing it.`;
      impactLevel = "Learning Phase";
    } else if (isAccurate) {
      detailedMessage = `Great awareness! Your estimate of ${estimate} closely matches your calculated footprint of ${actualEstimate.toFixed(2)} kg CO₂/year. This shows you have a good understanding of your digital environmental impact.`;
      impactLevel = "Accurate Understanding";
    } else if (actualEstimate < range[0]) {
      const diff = ((range[0] - actualEstimate) / range[0] * 100).toFixed(0);
      detailedMessage = `Your actual footprint (${actualEstimate.toFixed(2)} kg CO₂/year) is ${diff}% lower than your estimate of ${estimate}. You're doing better than you thought! Your digital habits are more environmentally friendly than expected.`;
      impactLevel = "Better Than Expected";
    } else {
      const diff = ((actualEstimate - range[1]) / range[1] * 100).toFixed(0);
      detailedMessage = `Your actual footprint (${actualEstimate.toFixed(2)} kg CO₂/year) is ${diff}% higher than your estimate of ${estimate}. This is an opportunity to optimize your digital habits and reduce your environmental impact.`;
      impactLevel = "Optimization Opportunity";
    }

    return {
      isAccurate,
      message: detailedMessage,
      impactLevel,
      actualValue: actualEstimate,
    };
  };

  const accuracyInfo = getFootprintAccuracy(surveyData.estimatedAnnualFootprint);

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Footprint Awareness Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
          <span className="text-sm font-medium">Awareness Level</span>
          <Badge variant={accuracyInfo.isAccurate ? "default" : "secondary"} className="text-xs">
            {accuracyInfo.impactLevel}
          </Badge>
        </div>

        <div className="p-4 bg-background/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your Estimate</span>
            <span className="text-sm text-muted-foreground">{surveyData.estimatedAnnualFootprint}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Calculated Footprint</span>
            <span className="text-sm font-semibold text-primary">{accuracyInfo.actualValue.toFixed(2)} kg CO₂/year</span>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm leading-relaxed text-foreground">{accuracyInfo.message}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityResultsDisplay;
