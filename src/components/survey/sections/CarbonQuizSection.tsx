import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData } from "@/types/survey";
import { Smartphone } from "lucide-react";
import QuizResultsDisplay from "./QuizResultsDisplay";

interface CarbonQuizSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const quizQuestions = [
  {
    id: "quizDataUsageImpact",
    label: "Data Usage Impact (1-10)",
    description: "How much does streaming 1 hour of HD video impact your carbon footprint?"
  },
  {
    id: "quizDeviceLifespanImpact",
    label: "Device Lifespan Impact (1-10)",
    description: "How much does using a smartphone for 5 years vs 2 years reduce carbon footprint?"
  },
  {
    id: "quizChargingHabitsImpact",
    label: "Charging Habits Impact (1-10)",
    description: "How much does keeping devices plugged in 24/7 increase carbon footprint?"
  },
  {
    id: "quizStreamingGamingImpact",
    label: "Streaming vs Gaming Impact (1-10)",
    description: "How much more carbon footprint does cloud gaming have vs Netflix streaming?"
  },
  {
    id: "quizRenewableEnergyImpact",
    label: "Renewable Energy Impact (1-10)",
    description: "How much can switching to renewable energy reduce your electronic footprint?"
  },
  {
    id: "quizAiUsageImpact",
    label: "AI Usage Impact (1-10)",
    description: "How much carbon footprint does generating AI images have vs text conversations?"
  }
];

const CarbonQuizSection = ({ surveyData, updateData }: CarbonQuizSectionProps) => {
  return (
    <>
      <CardHeader className="bg-gradient-to-r from-accent/10 to-secondary/10">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-accent" />
          <CardTitle>Electronic Carbon Footprint Quiz</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Test your knowledge about electronic device carbon footprints! Rate each factor's impact from 1 (lowest) to 10 (highest).
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {quizQuestions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="font-semibold">
              {question.label}
            </Label>
            <p className="text-sm text-muted-foreground mb-2">{question.description}</p>
            <Select 
              value={surveyData[question.id as keyof SurveyData]?.toString()} 
              onValueChange={(value) => updateData(question.id, parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
      
      <div className="px-6 pb-6">
        <QuizResultsDisplay surveyData={surveyData} />
      </div>
    </>
  );
};

export default CarbonQuizSection;
