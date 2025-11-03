import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SurveyData } from "@/types/survey";

interface QuizResultsDisplayProps {
  surveyData: Partial<SurveyData>;
}

const QuizResultsDisplay = ({ surveyData }: QuizResultsDisplayProps) => {
  const quizFields = [
    { key: "quizDataUsageImpact", label: "Data Usage Impact" },
    { key: "quizDeviceLifespanImpact", label: "Device Lifespan Impact" },
    { key: "quizChargingHabitsImpact", label: "Charging Habits Impact" },
    { key: "quizStreamingGamingImpact", label: "Streaming/Gaming Impact" },
    { key: "quizRenewableEnergyImpact", label: "Renewable Energy Impact" },
    { key: "quizAiUsageImpact", label: "AI Usage Impact" },
  ];

  const filledCount = quizFields.filter(
    (field) => surveyData[field.key as keyof SurveyData] !== undefined
  ).length;

  if (filledCount === 0) return null;

  const totalScore = quizFields.reduce(
    (sum, field) => sum + (Number(surveyData[field.key as keyof SurveyData]) || 0),
    0
  );
  const averageScore = totalScore / filledCount;
  const maxPossibleScore = filledCount * 10;

  const getAwarenessLevel = (avg: number) => {
    if (avg >= 8) return { level: "Excellent", color: "text-green-600" };
    if (avg >= 6) return { level: "Good", color: "text-blue-600" };
    if (avg >= 4) return { level: "Moderate", color: "text-yellow-600" };
    return { level: "Needs Improvement", color: "text-orange-600" };
  };

  const awareness = getAwarenessLevel(averageScore);

  if (filledCount < quizFields.length) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Your Carbon Awareness Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className={`text-3xl font-bold ${awareness.color}`}>
            {awareness.level}
          </div>
          <p className="text-sm text-muted-foreground">
            Average Score: {averageScore.toFixed(1)} / 10
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {totalScore} / {maxPossibleScore}
            </span>
          </div>
          <Progress value={(totalScore / maxPossibleScore) * 100} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quizFields.map((field) => {
            const value = Number(surveyData[field.key as keyof SurveyData]) || 0;
            return (
              <div key={field.key} className="p-3 bg-background/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
                <div className="flex items-center gap-2">
                  <Progress value={value * 10} className="h-2 flex-1" />
                  <span className="text-sm font-semibold">{value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResultsDisplay;
