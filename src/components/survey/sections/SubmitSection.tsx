import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SurveyData } from "@/types/survey";
import { calculateCarbonFootprint } from "@/utils/carbonCalculations";

interface SubmitSectionProps {
  surveyData: Partial<SurveyData>;
  updateData: (field: string, value: any) => void;
}

const SubmitSection = ({ surveyData, updateData }: SubmitSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(surveyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carbon-footprint-survey-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Survey data downloaded as JSON");
  };

  const handleSubmit = async () => {
    if (!surveyData.researchConsent) {
      toast.error("Please consent to participating in this research");
      return;
    }

    setIsSubmitting(true);

    try {
      const footprint = calculateCarbonFootprint(surveyData);

      const { error } = await supabase.from("survey_responses").insert([{
        age: surveyData.age,
        gender: surveyData.gender,
        occupation: surveyData.occupation,
        home_schooling: surveyData.homeSchooling,
        home_city: surveyData.homeCity,
        home_state: surveyData.homeState,
        city_tier: surveyData.cityTier,
        current_accommodation: surveyData.currentAccommodation,
        family_income_range: surveyData.familyIncomeRange,
        primary_internet_connection: surveyData.primaryInternetConnection,
        avg_daily_internet_hours: surveyData.avgDailyInternetHours,
        total_devices_owned: surveyData.totalDevicesOwned,
        devices: (surveyData.devices || []) as any,
        primary_charging_habits: surveyData.primaryChargingHabits,
        primary_power_source: surveyData.primaryPowerSource,
        renewable_energy_usage: surveyData.renewableEnergyUsage,
        has_solar_panels: surveyData.hasSolarPanels,
        energy_efficient_appliances: surveyData.energyEfficientAppliances,
        ai_interactions_per_day: surveyData.aiInteractionsPerDay,
        type_of_ai_usage: surveyData.typeOfAiUsage,
        typical_ai_session_length: surveyData.typicalAiSessionLength,
        cloud_services_usage_hours: surveyData.cloudServicesUsageHours,
        uploads_per_month_gb: surveyData.uploadsPerMonthGb,
        streaming_academic_hours: surveyData.streamingAcademicHours,
        streaming_entertainment_hours: surveyData.streamingEntertainmentHours,
        quiz_data_usage_impact: surveyData.quizDataUsageImpact,
        quiz_device_lifespan_impact: surveyData.quizDeviceLifespanImpact,
        quiz_charging_habits_impact: surveyData.quizChargingHabitsImpact,
        quiz_streaming_gaming_impact: surveyData.quizStreamingGamingImpact,
        quiz_renewable_energy_impact: surveyData.quizRenewableEnergyImpact,
        quiz_ai_usage_impact: surveyData.quizAiUsageImpact,
        renewable_electricity_access: surveyData.renewableElectricityAccess,
        estimated_annual_footprint: surveyData.estimatedAnnualFootprint,
        research_consent: surveyData.researchConsent,
        calculated_total_co2: footprint.total,
        calculated_devices_co2: footprint.devices,
        calculated_streaming_co2: footprint.streaming,
        calculated_ai_co2: footprint.ai,
        raw_data: surveyData as any,
      }]);

      if (error) throw error;

      toast.success("Survey submitted successfully! Thank you for your contribution.");
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="consent"
            checked={surveyData.researchConsent || false}
            onCheckedChange={(checked) => updateData("researchConsent", checked)}
          />
          <Label htmlFor="consent" className="cursor-pointer">
            I consent to participating in this research.
          </Label>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={downloadJSON}
            className="flex-1 sm:flex-none"
          >
            Download JSON
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !surveyData.researchConsent}
            className="flex-1 sm:flex-none"
            style={{ 
              background: 'var(--gradient-hero)',
              color: 'white'
            }}
          >
            {isSubmitting ? "Submitting..." : "Calculate & Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmitSection;
