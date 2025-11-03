import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
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
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="renewableElectricityAccess">Access to renewable electricity at home</Label>
            <Select 
              value={surveyData.renewableElectricityAccess} 
              onValueChange={(value) => updateData("renewableElectricityAccess", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes, fully">Yes, fully</SelectItem>
                <SelectItem value="Partially">Partially</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Don't know">Don't know</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedAnnualFootprint">Your estimate of annual electronic footprint</Label>
            <Select 
              value={surveyData.estimatedAnnualFootprint} 
              onValueChange={(value) => updateData("estimatedAnnualFootprint", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 100 kg">Less than 100 kg</SelectItem>
                <SelectItem value="100-300 kg">100-300 kg</SelectItem>
                <SelectItem value="300-500 kg">300-500 kg</SelectItem>
                <SelectItem value="500-1000 kg">500-1000 kg</SelectItem>
                <SelectItem value="More than 1000 kg">More than 1000 kg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert className="bg-amber-50 border-amber-200">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Expectation vs Reality:</strong> Press Calculate and we'll show how your estimate compares to a computed footprint based on your inputs.
          </AlertDescription>
        </Alert>
      </CardContent>
      
      <div className="px-6 pb-6">
        <SustainabilityResultsDisplay surveyData={surveyData} />
      </div>
    </>
  );
};

export default SustainabilitySection;
