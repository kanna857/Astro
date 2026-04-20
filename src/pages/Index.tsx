import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { NDVIExplainer } from '@/components/home/NDVIExplainer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <NDVIExplainer />
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 rounded-2xl text-center glow-primary">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Monitor Your Crops?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start analyzing your fields today with satellite-powered insights
            </p>
            <Link to="/analyze">
              <Button variant="hero" size="xl" className="group">
                Get Started Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Astro-Farmer. Satellite imagery for smarter farming.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
