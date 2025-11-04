import { useState } from "react";
import { Cloud, Leaf, Sun, Trees, Wind, Droplets, Recycle, Sprout } from "lucide-react";
import SurveyForm from "@/components/survey/SurveyForm";
import CarbonFootprintDisplay from "@/components/survey/CarbonFootprintDisplay";
import DigitalCarbonFacts from "@/components/survey/DigitalCarbonFacts";
import SubmitSection from "@/components/survey/sections/SubmitSection";
import { SurveyData } from "@/types/survey";

const Index = () => {
  const [surveyData, setSurveyData] = useState<Partial<SurveyData>>({});
  const [carbonFootprint, setCarbonFootprint] = useState({
    total: 0,
    devices: 0,
    streaming: 0,
    ai: 0,
    charging: 0,
  });

  const updateData = (field: string, value: any) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Background Elements - Hidden on mobile, visible on desktop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block">
        {/* Top section */}
        <Sun className="absolute top-20 right-[10%] w-32 h-32 text-primary/20 floating-element" />
        <Leaf className="absolute top-40 left-[15%] w-24 h-24 text-primary/15 floating-element-slow" />
        <Cloud className="absolute top-[60%] right-[20%] w-28 h-28 text-secondary/20 floating-element-fast" />
        <Trees className="absolute top-32 left-[5%] w-36 h-36 text-primary/25 floating-element-slow" />
        
        {/* Middle section */}
        <Wind className="absolute top-[45%] left-[8%] w-20 h-20 text-secondary/25 floating-element-fast" />
        <Droplets className="absolute top-[50%] right-[15%] w-18 h-18 text-primary/20 floating-element" />
        <Sprout className="absolute top-[35%] right-[5%] w-22 h-22 text-primary/30 floating-element-slow" />
        
        {/* Bottom section */}
        <Sun className="absolute bottom-32 left-[25%] w-20 h-20 text-primary/25 floating-element" />
        <Leaf className="absolute bottom-40 right-[30%] w-16 h-16 text-primary/20 floating-element-slow" />
        <Cloud className="absolute top-[30%] left-[5%] w-24 h-24 text-secondary/15 floating-element-fast" />
        <Recycle className="absolute bottom-24 right-[10%] w-28 h-28 text-primary/20 floating-element" />
        <Trees className="absolute bottom-[15%] left-[10%] w-32 h-32 text-primary/15 floating-element-slow" />
        <Wind className="absolute bottom-[45%] right-[8%] w-24 h-24 text-secondary/20 floating-element-fast" />
        <Droplets className="absolute bottom-[35%] left-[20%] w-20 h-20 text-primary/25 floating-element" />
        <Sprout className="absolute bottom-[50%] right-[25%] w-18 h-18 text-primary/18 floating-element-slow" />
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden mb-6 md:mb-8 z-10">
        <div 
          className="w-full py-8 md:py-12 px-4 md:px-6 bg-gradient-to-br from-primary via-primary/90 to-secondary"
        >
          <div className="container mx-auto relative">
            <div className="absolute top-2 left-2 md:top-4 md:left-4 opacity-20 hidden sm:block">
              <Leaf className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20 hidden sm:block">
              <Sun className="w-10 h-10 md:w-16 md:h-16 text-white" />
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <Cloud className="w-10 h-10 md:w-12 md:h-12 text-white flex-shrink-0" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 flex items-center gap-2 flex-wrap">
                  Electronic Use & Carbon Footprint Survey
                  <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white/90" />
                </h1>
                <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium">
                  Contribute to a greener future — understand your digital impact on the environment.
                </p>
              </div>
              
              <div className="w-full md:w-auto text-left md:text-right bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                <p className="text-white/90 text-xs md:text-sm font-medium mb-1">Annual Carbon Footprint Cost</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">₹{(carbonFootprint.total * 3 * 365).toFixed(0)}</p>
                <p className="text-white/80 text-xs md:text-sm">(at ₹3000/tCO₂)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 pb-8 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Survey Form */}
          <div className="lg:col-span-2">
            <SurveyForm 
              surveyData={surveyData}
              setSurveyData={setSurveyData}
              setCarbonFootprint={setCarbonFootprint}
              updateData={updateData}
            />
          </div>

          {/* Carbon Footprint Display & Submit */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-4 md:space-y-6 animate-fade-in">
              <div className="animate-slide-in-right">
                <CarbonFootprintDisplay carbonFootprint={carbonFootprint} />
              </div>
              <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <SubmitSection surveyData={surveyData} updateData={updateData} />
              </div>
            </div>
          </div>
        </div>

        {/* Digital Carbon Facts */}
        <div className="mt-8 md:mt-12">
          <DigitalCarbonFacts />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card py-4 md:py-6 mt-8 md:mt-12 border-t relative z-10">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span>Made with care by IBHAV MALVIYA — this tool provides estimates; please validate emission factors before using results in research.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
