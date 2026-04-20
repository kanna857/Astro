import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Satellite, Home, Map, LayoutDashboard, Info, Rocket, Menu, X, LogIn, LogOut, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/analyze', label: 'Analyze Field', icon: Map },
  { href: '/diagnose', label: 'Diagnose', icon: Map },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/compare', label: 'Compare', icon: LayoutDashboard },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot },
  { href: '/about', label: 'About', icon: Info },
  { href: '/future', label: 'Future', icon: Rocket },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Satellite className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Astro<span className="text-primary">Farmer</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'gap-2 transition-all duration-300',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}

            {/* Auth Button */}
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/30">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium max-w-[120px] truncate">
                      {user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="ml-2 pl-2 border-l border-border/30">
                  <Button variant="default" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3',
                        isActive && 'bg-primary/10 text-primary'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}

              {/* Mobile Auth */}
              {!loading && (
                <div className="pt-2 mt-2 border-t border-border/30">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 mb-2">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full justify-start gap-3">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
