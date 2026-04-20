import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DEMO_FIELDS, DemoField } from '@/lib/types';
import { FieldComparisonCard } from '@/components/compare/FieldComparisonCard';
import { ComparisonCharts } from '@/components/compare/ComparisonCharts';
import { calculatePriorityScore } from '@/lib/cropThresholds';
import { GitCompare, Plus, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const CompareFieldsPage = () => {
  const [selectedFields, setSelectedFields] = useState<DemoField[]>([
    DEMO_FIELDS[0],
    DEMO_FIELDS[1],
  ]);

  const handleFieldToggle = (field: DemoField) => {
    const isSelected = selectedFields.some(f => f.id === field.id);
    
    if (isSelected) {
      if (selectedFields.length > 1) {
        setSelectedFields(selectedFields.filter(f => f.id !== field.id));
      }
    } else {
      if (selectedFields.length < 4) {
        setSelectedFields([...selectedFields, field]);
      }
    }
  };

  const removeField = (fieldId: string) => {
    if (selectedFields.length > 1) {
      setSelectedFields(selectedFields.filter(f => f.id !== fieldId));
    }
  };

  // Sort selected fields by priority for ranking
  const rankedFields = [...selectedFields].sort((a, b) => {
    const priorityA = calculatePriorityScore(a.ndvi, a.crop, a.area);
    const priorityB = calculatePriorityScore(b.ndvi, b.crop, b.area);
    return priorityB - priorityA;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-primary" />
            Compare Fields
          </h1>
          <p className="text-muted-foreground">
            Compare multiple fields side-by-side to identify which areas need attention
          </p>
        </div>

        {/* Field Selector */}
        <div className="glass-card p-4 rounded-xl mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Comparing:</span>
            
            {selectedFields.map(field => (
              <div 
                key={field.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm font-medium text-foreground">{field.name}</span>
                {selectedFields.length > 1 && (
                  <button 
                    onClick={() => removeField(field.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}

            {selectedFields.length < 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Field
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
                  {DEMO_FIELDS.map(field => {
                    const isSelected = selectedFields.some(f => f.id === field.id);
                    return (
                      <DropdownMenuCheckboxItem
                        key={field.id}
                        checked={isSelected}
                        onCheckedChange={() => handleFieldToggle(field)}
                        disabled={!isSelected && selectedFields.length >= 4}
                      >
                        <div className="flex flex-col">
                          <span>{field.name}</span>
                          <span className="text-xs text-muted-foreground">{field.crop} • {field.area} ha</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <span className="text-xs text-muted-foreground ml-auto">
              {selectedFields.length}/4 fields selected
            </span>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className={cn(
          'grid gap-4 mb-8',
          selectedFields.length === 2 ? 'md:grid-cols-2' :
          selectedFields.length === 3 ? 'md:grid-cols-3' :
          'md:grid-cols-2 lg:grid-cols-4'
        )}>
          {rankedFields.map((field, index) => (
            <FieldComparisonCard 
              key={field.id} 
              field={field} 
              rank={index + 1}
            />
          ))}
        </div>

        {/* Comparison Charts */}
        {selectedFields.length >= 2 && (
          <ComparisonCharts fields={selectedFields} />
        )}
      </div>
    </Layout>
  );
};

export default CompareFieldsPage;
