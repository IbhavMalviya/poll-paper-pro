import { useState } from "react";
import { Cloud, Leaf, Sun } from "lucide-react";
import SurveyForm from "@/components/survey/SurveyForm";
import CarbonFootprintDisplay from "@/components/survey/CarbonFootprintDisplay";
import DigitalCarbonFacts from "@/components/survey/DigitalCarbonFacts";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden mb-8">
        <div 
          className="w-full py-12 px-6"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className="container mx-auto relative">
            <div className="absolute top-4 left-4 opacity-20">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div className="absolute top-8 right-8 opacity-20">
              <Sun className="w-16 h-16 text-white" />
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <Cloud className="w-12 h-12 text-white flex-shrink-0" />
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-2">
                  Electronic Use & Carbon Footprint Survey
                  <Leaf className="w-8 h-8" />
                </h1>
                <p className="text-white/90 text-lg">
                  Contribute to a greener future — understand your digital impact on the environment.
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-white/80 text-sm font-medium mb-1">Estimated cost preview</p>
                <p className="text-4xl font-bold text-white">₹{carbonFootprint.total.toFixed(0)}</p>
                <p className="text-white/70 text-sm">(at ₹3000/tCO₂)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Survey Form */}
          <div className="lg:col-span-2">
            <SurveyForm 
              surveyData={surveyData}
              setSurveyData={setSurveyData}
              setCarbonFootprint={setCarbonFootprint}
            />
          </div>

          {/* Carbon Footprint Display */}
          <div className="lg:col-span-1">
            <CarbonFootprintDisplay carbonFootprint={carbonFootprint} />
          </div>
        </div>

        {/* Digital Carbon Facts */}
        <div className="mt-12">
          <DigitalCarbonFacts />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card py-6 mt-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            Made with care — this tool provides estimates; please validate emission factors before using results in research.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
