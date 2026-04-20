import { Satellite, BarChart3, Bell, MapPin, Shield, Zap, CloudOff } from 'lucide-react';

const features = [
  {
    icon: Satellite,
    title: 'Satellite Imagery',
    description: 'Access real-time satellite data to monitor your fields from space with unprecedented accuracy.',
  },
  {
    icon: BarChart3,
    title: 'NDVI Analysis',
    description: 'Normalized Difference Vegetation Index calculations to assess crop health at a glance.',
  },
  {
    icon: CloudOff,
    title: 'Automatic Cloud Removal',
    description: 'Advanced cloud masking improves NDVI reliability by automatically detecting and removing cloudy pixels before calculation, increasing scientific quality.',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Receive instant notifications when crop stress is detected, enabling quick intervention.',
  },
  {
    icon: MapPin,
    title: 'Field Mapping',
    description: 'Precise GPS-based field boundaries with detailed zone-by-zone health analysis.',
  },
  {
    icon: Shield,
    title: 'Early Detection',
    description: 'Identify pest infestations, water stress, and nutrient deficiencies before visible symptoms appear.',
  },
  {
    icon: Zap,
    title: 'AI Recommendations',
    description: 'Get intelligent suggestions for irrigation, fertilization, and pest management based on data.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Powerful </span>
            <span className="text-gradient">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to monitor and optimize your crop health using cutting-edge satellite technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
