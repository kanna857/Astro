import { Link } from 'react-router-dom';
import { SavedField } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bookmark, X, MapPin, LogIn, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNDVICategory } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';

interface SavedFieldsSidebarProps {
  onSelectField: (field: SavedField) => void;
  selectedFieldId?: string;
  savedFields: SavedField[];
  removeField: (fieldId: string) => void;
}

export function SavedFieldsSidebar({ onSelectField, selectedFieldId, savedFields, removeField }: SavedFieldsSidebarProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" />
          My Fields
        </h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" />
          My Fields
        </h3>
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            Sign in to save fields and access them from any device.
          </p>
          <Link to="/auth">
            <Button size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (savedFields.length === 0) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" />
          My Fields
        </h3>
        <p className="text-sm text-muted-foreground text-center py-8">
          No saved fields yet. Analyze a field and click "Save Field" to add it here.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-primary" />
        My Fields ({savedFields.length})
      </h3>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
        {savedFields.map((field) => {
          const category = getNDVICategory(field.ndvi);
          const isSelected = selectedFieldId === field.id;
          
          return (
            <div
              key={field.id}
              className={cn(
                'group relative p-3 rounded-lg cursor-pointer transition-all duration-300',
                'bg-secondary/30 hover:bg-secondary/50',
                isSelected && 'border border-primary bg-primary/10'
              )}
              onClick={() => onSelectField(field)}
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-2 h-8 rounded-full', category.bgColor)} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate text-sm">{field.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className={category.color}>{field.ndvi.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(field.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
