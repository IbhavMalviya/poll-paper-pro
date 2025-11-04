import { Monitor, Cloud, Sparkles, Battery } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CarbonFootprintDisplayProps {
  carbonFootprint: {
    total: number;
    devices: number;
    streaming: number;
    ai: number;
    charging: number;
  };
}

const CarbonFootprintDisplay = ({ carbonFootprint }: CarbonFootprintDisplayProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 transition-all duration-300 hover:shadow-xl hover:border-primary/30" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          Your Estimated Daily Carbon Footprint
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="text-center space-y-2">
          <div className="text-4xl md:text-5xl font-bold text-primary">
            {carbonFootprint.total.toFixed(2)} kg
          </div>
          <p className="text-sm md:text-base text-muted-foreground">CO₂ per day</p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Estimated annual: {Math.round(carbonFootprint.total * 365)} kg CO₂ (₹{Math.round(carbonFootprint.total * 365 * 3)})
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 bg-background/50 rounded-lg">
            <Monitor className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <p className="text-xs text-muted-foreground text-center">Devices</p>
            <p className="text-sm md:text-base font-semibold">{carbonFootprint.devices.toFixed(2)} kg</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 bg-background/50 rounded-lg">
            <Battery className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <p className="text-xs text-muted-foreground text-center">Charging</p>
            <p className="text-sm md:text-base font-semibold">{carbonFootprint.charging.toFixed(2)} kg</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 bg-background/50 rounded-lg">
            <Cloud className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <p className="text-xs text-muted-foreground text-center">Streaming</p>
            <p className="text-sm md:text-base font-semibold">{carbonFootprint.streaming.toFixed(2)} kg</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 bg-background/50 rounded-lg">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <p className="text-xs text-muted-foreground text-center">AI Usage</p>
            <p className="text-sm md:text-base font-semibold">{carbonFootprint.ai.toFixed(2)} kg</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonFootprintDisplay;
