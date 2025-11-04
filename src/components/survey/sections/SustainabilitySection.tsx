import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData } from "@/types/survey";
import SustainabilityResultsDisplay from "./SustainabilityResultsDisplay";

interface SustainabilitySectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const SustainabilitySection = ({ surveyData, updateData }: SustainabilitySectionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Sustainability & Awareness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="estimatedAnnualFootprint">
            Your estimate of annual electronic footprint *
          </Label>
          <Select
            value={surveyData.estimatedAnnualFootprint || ""}
            onValueChange={(value) => updateData("estimatedAnnualFootprint", value)}
          >
            <SelectTrigger id="estimatedAnnualFootprint">
              <SelectValue placeholder="Estimate your annual electronic CO₂ footprint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 200 kg CO₂">Less than 200 kg CO₂</SelectItem>
              <SelectItem value="200-400 kg CO₂">200-400 kg CO₂</SelectItem>
              <SelectItem value="400-600 kg CO₂">400-600 kg CO₂</SelectItem>
              <SelectItem value="600-800 kg CO₂">600-800 kg CO₂</SelectItem>
              <SelectItem value="More than 800 kg CO₂">More than 800 kg CO₂</SelectItem>
              <SelectItem value="Not sure">Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SustainabilityResultsDisplay surveyData={surveyData} />
      </CardContent>
    </>
  );
};

export default SustainabilitySection;
