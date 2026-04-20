import { Layout } from '@/components/layout/Layout';
import { Info, Satellite, Target, Users, Code, Globe } from 'lucide-react';

const AboutPage = () => {
  const team = [
    { name: 'NDVI Analysis Engine', description: 'Processes satellite imagery to calculate vegetation health indices' },
    { name: 'Alert System', description: 'Real-time monitoring with SMS/WhatsApp notifications via Twilio' },
    { name: 'Interactive Mapping', description: 'Leaflet-powered maps with precise GPS field boundaries' },
    { name: 'AI Recommendations', description: 'Machine learning models for actionable farming insights' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Info className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Astro-Farmer</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Revolutionizing agriculture through satellite technology and data-driven insights
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 md:p-12 rounded-2xl mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                Astro-Farmer aims to democratize access to satellite-based crop monitoring technology, 
                enabling farmers of all scales to detect crop stress early, optimize resource usage, 
                and maximize yields through data-driven decisions.
              </p>
              <p className="text-muted-foreground">
                By combining NDVI analysis from satellite imagery with AI-powered recommendations, 
                we help farmers respond proactively to potential issues before they become visible 
                to the naked eye, saving crops, water, and labor costs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-xl text-center">
                <Satellite className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">24h</div>
                <div className="text-sm text-muted-foreground">Update Cycle</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Globe className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">Global</div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Farmers</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Code className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Select Field', description: 'Choose your farm location on the interactive map or enter GPS coordinates' },
              { step: '02', title: 'Satellite Scan', description: 'Our system retrieves the latest satellite imagery for your field' },
              { step: '03', title: 'NDVI Analysis', description: 'Advanced algorithms calculate vegetation health indices' },
              { step: '04', title: 'Get Insights', description: 'Receive detailed reports and AI-powered recommendations' },
            ].map((item, index) => (
              <div key={item.step} className="glass-card p-6 rounded-xl relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-display font-bold text-primary/20 mb-2">{item.step}</div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((tech, index) => (
              <div
                key={tech.name}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="text-center glass-card p-8 rounded-2xl">
          <h2 className="font-display text-2xl font-bold mb-4">Data Sources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Astro-Farmer integrates data from multiple satellite sources including 
            Sentinel-2, Landsat-8, and MODIS to provide comprehensive coverage and 
            high temporal resolution for crop monitoring.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Sentinel-2', 'Landsat-8', 'MODIS', 'ISRO Bhuvan'].map((source) => (
              <span
                key={source}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
