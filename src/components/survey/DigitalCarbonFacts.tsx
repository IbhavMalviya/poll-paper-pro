import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Video, Brain, Factory, Zap, Cable, Lightbulb, Leaf } from "lucide-react";

const facts = [
  {
    icon: Database,
    title: "📊 Global Data Infrastructure Cost",
    description: "Transferring 1GB globally costs ₹0.80-2.50 including undersea cables, data centers, bandwidth, cooling systems, and maintenance workforce.",
    highlight: "💰 Daily Cost:",
    value: "₹2,300 crores spent daily on global internet infrastructure!"
  },
  {
    icon: Video,
    title: "📺 Streaming Infrastructure",
    description: "Netflix spends ₹15,000 crores annually on content delivery networks (CDNs) and bandwidth to stream videos worldwide smoothly.",
    highlight: "🔥 Daily Reality:",
    value: "₹41 crores daily just for Netflix's streaming infrastructure"
  },
  {
    icon: Brain,
    title: "🤖 AI Infrastructure Cost",
    description: "OpenAI spends ₹2,100 crores monthly on computing infrastructure. Google's AI data centers cost ₹50,000 crores to build.",
    highlight: "🔥 Daily Scale:",
    value: "₹70 crores daily spent by OpenAI alone on computing power"
  },
  {
    icon: Factory,
    title: "🏭 Manufacturing Infrastructure",
    description: "Foxconn's iPhone factories cost ₹40,000 crores to setup. Semiconductor fabs cost ₹80,000+ crores each to build.",
    highlight: "💰 Daily Production:",
    value: "₹550 crores worth of global electronics manufactured daily"
  },
  {
    icon: Zap,
    title: "⚡ Power Grid Infrastructure",
    description: "India's power grid infrastructure is worth ₹25 lakh crores. Each power plant costs ₹15,000-50,000 crores to build and maintain.",
    highlight: "🔥 Daily Maintenance:",
    value: "₹137 crores daily maintenance for India's electricity grid"
  },
  {
    icon: Cable,
    title: "🌊 Undersea Cable Reality",
    description: "Undersea internet cables cost ₹2,500-4,000 crores per cable. 400+ cables carry 99% of international data worldwide.",
    highlight: "🔥 Daily Operations:",
    value: "₹85 crores daily to operate and maintain undersea cables"
  }
];

const DigitalCarbonFacts = () => {
  return (
    <Card style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">💡 Digital Carbon Facts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map((fact, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <fact.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-sm leading-tight">{fact.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
                <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    {fact.highlight}
                  </p>
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
                    {fact.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border-2 border-primary/20 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground/80">
            💚 Your responses help researchers understand digital behavior patterns and promote sustainable technology use!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalCarbonFacts;
