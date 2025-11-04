import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SurveyData } from "@/types/survey";
import { calculateCarbonFootprint } from "@/utils/carbonCalculations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Lock, UserX, Server, Download, Globe } from "lucide-react";

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

    // Validate required fields
    const requiredFields = {
      age: "Age",
      gender: "Gender",
      occupation: "Occupation",
      primaryInternetConnection: "Primary Internet Connection",
      avgDailyInternetHours: "Average Daily Internet Hours",
      totalDevicesOwned: "Total Devices Owned",
      primaryChargingHabits: "Primary Charging Habits",
      primaryPowerSource: "Primary Power Source",
      aiInteractionsPerDay: "AI Interactions Per Day",
      cloudServicesUsageHours: "Cloud Services Usage",
      streamingAcademicHours: "Streaming (Academic)",
      streamingEntertainmentHours: "Streaming (Entertainment)",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !surveyData[key as keyof typeof surveyData] || surveyData[key as keyof typeof surveyData] === 0)
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
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
        calculated_charging_co2: footprint.charging,
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
    <Card className="transition-all duration-300 hover:shadow-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardContent className="pt-6">
        <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy-info" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                📋 Data Privacy & Research Information (Click to expand)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-muted-foreground pt-2">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Your Privacy Matters:</strong> All data collected is completely anonymized and encrypted. We use industry-standard security protocols to protect your information.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Research Purpose:</strong> This data is used exclusively for academic research on digital sustainability and carbon footprint awareness. It helps researchers understand technology usage patterns and promote eco-friendly digital habits.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <UserX className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">No Personal Identity:</strong> We do not collect names, email addresses, IP addresses, or any personally identifiable information. Your responses are completely anonymous.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Server className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Secure Storage:</strong> Your data is stored on secure, encrypted servers with restricted access. Only authorized researchers can access the anonymized dataset for analysis.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Download className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Voluntary Participation:</strong> Your participation is completely voluntary. You can download a copy of your responses before submitting using the "Download JSON" button.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Making an Impact:</strong> Your contribution helps promote sustainable technology practices and raises awareness about digital carbon footprints. Thank you for participating in this important research!
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="consent"
            checked={surveyData.researchConsent || false}
            onCheckedChange={(checked) => updateData("researchConsent", checked)}
          />
          <Label htmlFor="consent" className="cursor-pointer">
            I have read the privacy information above and consent to participating in this research.
          </Label>
        </div>

        <div className="flex flex-wrap gap-4 justify-end">
          <Button
            variant="outline"
            onClick={downloadJSON}
          >
            Download JSON
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !surveyData.researchConsent}
            style={{ 
              background: 'var(--gradient-success)',
              color: 'white',
              fontWeight: '600'
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmitSection;
