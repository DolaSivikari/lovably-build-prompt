import IndustryPulse from "./IndustryPulse";
import MarketChallenge from "./MarketChallenge";
import CompanyResponse from "./CompanyResponse";

const MarketIntelligenceHub = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven insights on Ontario's construction landscape and our strategic response
          </p>
          <div className="h-1 w-16 bg-primary mx-auto mt-6"></div>
        </div>

        {/* Industry Pulse Dashboard */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Industry Pulse
            </h3>
            <p className="text-muted-foreground">
              Current market indicators tracking Ontario's construction sector
            </p>
          </div>
          <IndustryPulse />
        </div>

        {/* Challenge + Response Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: Market Challenge */}
          <MarketChallenge />

          {/* Right: Company Response */}
          <CompanyResponse />
        </div>

      </div>
    </section>
  );
};

export default MarketIntelligenceHub;
