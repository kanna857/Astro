import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Rocket, Wheat, Bug, Cloud, MessageSquare, Smartphone, Satellite, BarChart3, CheckCircle2 } from 'lucide-react';

interface Enhancement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: 'available' | 'in-progress' | 'planned' | 'research';
  link?: string;
}

const enhancements: Enhancement[] = [
  {
    icon: Wheat,
    title: 'Crop-Specific NDVI Thresholds',
    description: 'Customized NDVI thresholds for different crop types including rice, cotton, wheat, and vegetables. Each crop has unique health indicators.',
    status: 'available',
    link: '/analyze',
  },
  {
    icon: Bug,
    title: 'Disease Prediction using ML',
    description: 'Machine learning models trained on historical data to predict disease outbreaks before visible symptoms appear.',
    status: 'in-progress',
  },
  {
    icon: Satellite,
    title: 'ISRO Bhuvan Integration',
    description: 'Access ISRO Bhuvan satellite imagery, NDVI layers, and Land Use/Land Cover maps directly on the analysis map.',
    status: 'available',
    link: '/analyze',
  },
  {
    icon: Cloud,
    title: 'Weather & Rainfall Analysis',
    description: 'Combine NDVI data with weather forecasts and historical rainfall patterns for comprehensive agricultural insights.',
    status: 'planned',
  },
  {
    icon: MessageSquare,
    title: 'Telugu SMS & Voice Alerts',
    description: 'Support for regional language alerts including Telugu, Hindi, Tamil, and Kannada with voice call option for farmers.',
    status: 'available',
    link: '/analyze',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Version',
    description: 'Native Android and iOS applications with offline support for field use in areas with limited connectivity.',
    status: 'planned',
  },
  {
    icon: BarChart3,
    title: 'Yield Prediction Models',
    description: 'Advanced analytics to predict crop yield based on historical NDVI trends, weather data, and farming practices.',
    status: 'research',
  },
  {
    icon: Rocket,
    title: 'Drone Integration',
    description: 'Support for drone-captured imagery for hyper-local field analysis with centimeter-level precision.',
    status: 'research',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <span className="px-2 py-1 rounded-full text-xs bg-ndvi-excellent/20 text-ndvi-excellent flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Available</span>;
    case 'in-progress':
      return <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">In Progress</span>;
    case 'planned':
      return <span className="px-2 py-1 rounded-full text-xs bg-accent/20 text-accent">Planned</span>;
    case 'research':
      return <span className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">Research</span>;
    default:
      return null;
  }
};

const FuturePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
            <Rocket className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Future <span className="text-gradient-accent">Enhancements</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Our roadmap for making Astro-Farmer even more powerful for farmers
          </p>
        </div>

        {/* Timeline / Roadmap */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-primary mb-2 mx-auto" />
              <span className="text-xs text-muted-foreground">Q1 2024</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-2" />
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-accent mb-2 mx-auto" />
              <span className="text-xs text-muted-foreground">Q2 2024</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-2" />
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-secondary mb-2 mx-auto" />
              <span className="text-xs text-muted-foreground">Q3 2024</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-2" />
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-muted mb-2 mx-auto" />
              <span className="text-xs text-muted-foreground">Q4 2024</span>
            </div>
          </div>
        </div>

        {/* Enhancements Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {enhancements.map((item, index) => {
            const Icon = item.icon;
            const CardContent = (
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.status === 'available' ? 'bg-ndvi-excellent/10' : 'bg-primary/10'
                }`}>
                  <Icon className={`w-6 h-6 ${item.status === 'available' ? 'text-ndvi-excellent' : 'text-primary'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  {item.status === 'available' && item.link && (
                    <span className="inline-flex items-center gap-1 mt-2 text-sm text-primary font-medium">
                      Try it now →
                    </span>
                  )}
                </div>
              </div>
            );

            if (item.status === 'available' && item.link) {
              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="glass-card p-6 rounded-xl hover:border-ndvi-excellent/50 hover:shadow-lg hover:shadow-ndvi-excellent/10 transition-all duration-300 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={item.title}
                className="glass-card p-6 rounded-xl hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Community Section */}
        <div className="glass-card p-8 md:p-12 rounded-2xl mt-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            We're building Astro-Farmer with input from farmers, agronomists, and technology experts. 
            Have a feature request or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
            >
              Request a Feature
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
            >
              Join Beta Testing
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FuturePage;
