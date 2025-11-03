import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SurveyData } from "@/types/survey";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface QuizResultsDisplayProps {
  surveyData: Partial<SurveyData>;
}

const QuizResultsDisplay = ({ surveyData }: QuizResultsDisplayProps) => {
  const quizFields = [
    { key: "quizDataUsageImpact", label: "Data Usage Impact", actualKey: "calculatedStreamingCo2" },
    { key: "quizDeviceLifespanImpact", label: "Device Lifespan Impact", actualKey: "calculatedDevicesCo2" },
    { key: "quizChargingHabitsImpact", label: "Charging Habits Impact", actualKey: "calculatedDevicesCo2" },
    { key: "quizStreamingGamingImpact", label: "Streaming/Gaming Impact", actualKey: "calculatedStreamingCo2" },
    { key: "quizRenewableEnergyImpact", label: "Renewable Energy Impact", actualKey: "calculatedTotalCo2" },
    { key: "quizAiUsageImpact", label: "AI Usage Impact", actualKey: "calculatedAiCo2" },
  ];

  const normalizeActualImpact = (value: number, maxValue: number) => {
    // Normalize actual CO2 values to a 1-10 scale
    if (maxValue === 0) return 0;
    return Math.min(10, Math.max(1, Math.round((value / maxValue) * 10)));
  };

  const getComparisonIcon = (predicted: number, actual: number) => {
    const diff = predicted - actual;
    if (Math.abs(diff) <= 1) return <Minus className="w-4 h-4 text-yellow-600" />;
    if (diff > 1) return <TrendingUp className="w-4 h-4 text-red-600" />;
    return <TrendingDown className="w-4 h-4 text-green-600" />;
  };

  const getComparisonText = (predicted: number, actual: number) => {
    const diff = predicted - actual;
    if (Math.abs(diff) <= 1) return "Accurate";
    if (diff > 1) return "Overestimated";
    return "Underestimated";
  };

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

        <div className="space-y-3">
          {quizFields.map((field) => {
            const predictedValue = Number(surveyData[field.key as keyof SurveyData]) || 0;
            const actualCo2 = Number(surveyData[field.actualKey as keyof SurveyData]) || 0;
            const totalCo2 = Number(surveyData.calculatedTotalCo2) || 1;
            const actualNormalized = normalizeActualImpact(actualCo2, totalCo2 / 3);
            const comparisonText = getComparisonText(predictedValue, actualNormalized);
            const comparisonIcon = getComparisonIcon(predictedValue, actualNormalized);
            
            return (
              <div key={field.key} className="p-3 bg-background/50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{field.label}</p>
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    {comparisonIcon}
                    {comparisonText}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Your Prediction</span>
                    <span className="font-semibold">{predictedValue}/10</span>
                  </div>
                  <Progress value={predictedValue * 10} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Actual Impact</span>
                    <span className="font-semibold">{actualNormalized}/10</span>
                  </div>
                  <Progress value={actualNormalized * 10} className="h-2 [&>div]:bg-primary/60" />
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
