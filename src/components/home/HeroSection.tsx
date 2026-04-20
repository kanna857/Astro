import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Satellite, Play, ArrowRight, Leaf, Radio } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-[15%] animate-float" style={{ animationDelay: '0s' }}>
        <div className="glass-card p-4 rounded-xl">
          <Satellite className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[10%] animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass-card p-4 rounded-xl">
          <Leaf className="w-8 h-8 text-success" />
        </div>
      </div>
      <div className="absolute top-1/3 left-[8%] animate-float" style={{ animationDelay: '4s' }}>
        <div className="glass-card p-3 rounded-lg">
          <Radio className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Satellite-Powered Agriculture</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Astro-Farmer</span>
            <br />
            <span className="text-gradient">Crop Health Monitoring</span>
            <br />
            <span className="text-foreground">from Space</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Using satellite imagery and NDVI analysis to help farmers detect crop stress early and maximize yields
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/analyze">
              <Button variant="hero" size="xl" className="group">
                Analyze Field
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/analyze?demo=true">
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                View Demo Farms
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Fields Analyzed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-success mb-1">24h</div>
              <div className="text-sm text-muted-foreground">Update Cycle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
