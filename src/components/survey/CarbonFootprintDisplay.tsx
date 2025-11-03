import { Monitor, Upload, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CarbonFootprintDisplayProps {
  carbonFootprint: {
    total: number;
    devices: number;
    streaming: number;
    ai: number;
  };
}

const CarbonFootprintDisplay = ({ carbonFootprint }: CarbonFootprintDisplayProps) => {
  return (
    <Card className="sticky top-6" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader className="bg-gradient-to-br from-muted/30 to-background">
        <CardTitle className="text-lg">Total Annual Footprint</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-5 h-5 text-primary" />
            <p className="text-3xl font-bold">
              {carbonFootprint.total.toFixed(0)} kg CO<sub>2</sub>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Approx. ₹{(carbonFootprint.total * 3).toFixed(0)} (at ₹3000/tCO₂)
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Devices</span>
            </div>
            <span className="text-sm font-bold">{carbonFootprint.devices.toFixed(0)} kg</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Data & Streaming</span>
            </div>
            <span className="text-sm font-bold">{carbonFootprint.streaming.toFixed(0)} kg</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">AI</span>
            </div>
            <span className="text-sm font-bold">{carbonFootprint.ai.toFixed(0)} kg</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonFootprintDisplay;
