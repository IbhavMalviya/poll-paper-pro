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
              <SelectItem value="Less than 500 kg CO₂">Less than 500 kg CO₂</SelectItem>
              <SelectItem value="500-1000 kg CO₂">500-1000 kg CO₂</SelectItem>
              <SelectItem value="1000-2000 kg CO₂">1000-2000 kg CO₂</SelectItem>
              <SelectItem value="2000-3000 kg CO₂">2000-3000 kg CO₂</SelectItem>
              <SelectItem value="More than 3000 kg CO₂">More than 3000 kg CO₂</SelectItem>
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
