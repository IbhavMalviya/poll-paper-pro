import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyData } from "@/types/survey";

interface ChargingHabitsSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const ChargingHabitsSection = ({ surveyData, updateData }: ChargingHabitsSectionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Charging Habits & Power Sources</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryChargingHabits">Primary charging habits <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.primaryChargingHabits} 
            onValueChange={(value) => updateData("primaryChargingHabits", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Charge overnight">Charge overnight</SelectItem>
              <SelectItem value="Charge when needed (20-80%)">Charge when needed (20-80%)</SelectItem>
              <SelectItem value="Keep plugged in while working">Keep plugged in while working</SelectItem>
              <SelectItem value="Use power-saving mode">Use power-saving mode & optimize charging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryPowerSource">Primary power source at home <span className="text-destructive">*</span></Label>
          <Select 
            value={surveyData.primaryPowerSource} 
            onValueChange={(value) => updateData("primaryPowerSource", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grid electricity">Grid electricity</SelectItem>
              <SelectItem value="Solar power">Solar power</SelectItem>
              <SelectItem value="Mixed (Grid + Solar)">Mixed (Grid + Solar)</SelectItem>
              <SelectItem value="Generator">Generator</SelectItem>
              <SelectItem value="Inverter/UPS (Battery backup)">Inverter/UPS (Battery backup)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="renewableEnergyUsage">Renewable energy usage</Label>
          <Select 
            value={surveyData.renewableEnergyUsage} 
            onValueChange={(value) => updateData("renewableEnergyUsage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Less than 25%">Less than 25%</SelectItem>
              <SelectItem value="25-50%">25-50%</SelectItem>
              <SelectItem value="50-75%">50-75%</SelectItem>
              <SelectItem value="More than 75%">More than 75%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hasSolarPanels">Do you have solar panels?</Label>
          <Select 
            value={surveyData.hasSolarPanels} 
            onValueChange={(value) => updateData("hasSolarPanels", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Planning to install">Planning to install</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="energyEfficientAppliances">Energy-efficient appliances</Label>
          <Select 
            value={surveyData.energyEfficientAppliances} 
            onValueChange={(value) => updateData("energyEfficientAppliances", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Some appliances">Some appliances</SelectItem>
              <SelectItem value="Most appliances">Most appliances</SelectItem>
              <SelectItem value="All appliances">All appliances</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </>
  );
};

export default ChargingHabitsSection;
