import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData } from "@/types/survey";

interface AICloudStreamingSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const AICloudStreamingSection = ({ surveyData, updateData }: AICloudStreamingSectionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>AI, Cloud & Streaming</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="aiInteractionsPerDay">AI interactions per day <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.aiInteractionsPerDay} 
            onValueChange={(value) => updateData("aiInteractionsPerDay", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="5-10">5-10</SelectItem>
              <SelectItem value="10-20">10-20</SelectItem>
              <SelectItem value="20-50">20-50</SelectItem>
              <SelectItem value="More than 50">More than 50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="typeOfAiUsage">Type of AI usage</Label>
          <Select 
            value={surveyData.typeOfAiUsage} 
            onValueChange={(value) => updateData("typeOfAiUsage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text conversations">Text conversations</SelectItem>
              <SelectItem value="Image generation">Image generation</SelectItem>
              <SelectItem value="Mixed (Text + Images)">Mixed (Text + Images)</SelectItem>
              <SelectItem value="Video generation">Video generation</SelectItem>
              <SelectItem value="Code generation">Code generation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="typicalAiSessionLength">Typical AI session length</Label>
          <Select 
            value={surveyData.typicalAiSessionLength} 
            onValueChange={(value) => updateData("typicalAiSessionLength", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 5 minutes">Less than 5 minutes</SelectItem>
              <SelectItem value="5-15 minutes">5-15 minutes</SelectItem>
              <SelectItem value="15-30 minutes">15-30 minutes</SelectItem>
              <SelectItem value="30-60 minutes">30-60 minutes</SelectItem>
              <SelectItem value="More than 1 hour">More than 1 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cloudServicesUsageHours">Cloud services usage (hrs/week) <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.cloudServicesUsageHours} 
            onValueChange={(value) => updateData("cloudServicesUsageHours", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Less than 5">Less than 5</SelectItem>
              <SelectItem value="5-10">5-10</SelectItem>
              <SelectItem value="10-20">10-20</SelectItem>
              <SelectItem value="20-40">20-40</SelectItem>
              <SelectItem value="More than 40">More than 40</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="uploadsPerMonthGb">Uploads / big transfers per month (GB)</Label>
          <Select 
            value={surveyData.uploadsPerMonthGb} 
            onValueChange={(value) => updateData("uploadsPerMonthGb", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 1 GB">Less than 1 GB</SelectItem>
              <SelectItem value="1-5 GB">1-5 GB</SelectItem>
              <SelectItem value="5-10 GB">5-10 GB</SelectItem>
              <SelectItem value="10-50 GB">10-50 GB</SelectItem>
              <SelectItem value="More than 50 GB">More than 50 GB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="streamingAcademicHours">Streaming (academic hrs/week) <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.streamingAcademicHours} 
            onValueChange={(value) => updateData("streamingAcademicHours", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Less than 5 hours">Less than 5 hours</SelectItem>
              <SelectItem value="5-10 hours">5-10 hours</SelectItem>
              <SelectItem value="10-20 hours">10-20 hours</SelectItem>
              <SelectItem value="20-40 hours">20-40 hours</SelectItem>
              <SelectItem value="More than 40 hours">More than 40 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="streamingEntertainmentHours">Streaming (entertainment hrs/week) <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.streamingEntertainmentHours} 
            onValueChange={(value) => updateData("streamingEntertainmentHours", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Less than 5 hours">Less than 5 hours</SelectItem>
              <SelectItem value="5-10 hours">5-10 hours</SelectItem>
              <SelectItem value="10-20 hours">10-20 hours</SelectItem>
              <SelectItem value="20-40 hours">20-40 hours</SelectItem>
              <SelectItem value="More than 40 hours">More than 40 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </>
  );
};

export default AICloudStreamingSection;
