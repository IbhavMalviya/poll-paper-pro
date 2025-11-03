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
    { 
      key: "quizDataUsageImpact", 
      label: "Data Usage Impact", 
      actualKey: "calculatedStreamingCo2",
      // Average streaming: 0.1-0.5 kg CO2/day, scale: <0.15=low, 0.15-0.35=medium, >0.35=high
      scaleFunc: (val: number) => val < 0.15 ? 3 : val < 0.35 ? 6 : 9
    },
    { 
      key: "quizDeviceLifespanImpact", 
      label: "Device Lifespan Impact", 
      actualKey: "calculatedDevicesCo2",
      // Device manufacturing/usage: 0.5-2 kg CO2/day, scale: <0.8=low, 0.8-1.5=medium, >1.5=high
      scaleFunc: (val: number) => val < 0.8 ? 3 : val < 1.5 ? 6 : 9
    },
    { 
      key: "quizChargingHabitsImpact", 
      label: "Charging Habits Impact", 
      actualKey: "calculatedChargingCo2",
      // Charging: 0.1-0.5 kg CO2/day, scale: <0.15=low, 0.15-0.3=medium, >0.3=high
      scaleFunc: (val: number) => val < 0.15 ? 3 : val < 0.3 ? 6 : 9
    },
    { 
      key: "quizStreamingGamingImpact", 
      label: "Streaming/Gaming Impact", 
      actualKey: "calculatedStreamingCo2",
      // Same as data usage
      scaleFunc: (val: number) => val < 0.15 ? 3 : val < 0.35 ? 6 : 9
    },
    { 
      key: "quizRenewableEnergyImpact", 
      label: "Renewable Energy Impact", 
      actualKey: "calculatedTotalCo2",
      // Total daily: 1-5 kg CO2/day, scale: <2=low, 2-3.5=medium, >3.5=high
      scaleFunc: (val: number) => val < 2 ? 3 : val < 3.5 ? 6 : 9
    },
    { 
      key: "quizAiUsageImpact", 
      label: "AI Usage Impact", 
      actualKey: "calculatedAiCo2",
      // AI usage: 0.05-0.3 kg CO2/day, scale: <0.1=low, 0.1-0.2=medium, >0.2=high
      scaleFunc: (val: number) => val < 0.1 ? 3 : val < 0.2 ? 6 : 9
    },
  ];

  const normalizeActualImpact = (value: number, scaleFunc: (val: number) => number) => {
    // Convert daily kg CO2 to impact score using real-world thresholds
    if (value === 0) return 1;
    return scaleFunc(value);
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
            const actualNormalized = normalizeActualImpact(actualCo2, field.scaleFunc);
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
                    <span>Actual Impact ({actualCo2.toFixed(2)} kg/day)</span>
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
