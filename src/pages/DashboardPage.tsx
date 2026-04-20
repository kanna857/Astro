import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DEMO_FIELDS, generateNDVIData } from '@/lib/types';
import { getCropSpecificNDVICategory } from '@/lib/cropThresholds';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, TrendingUp, AlertTriangle, Leaf, MapPin, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardPage = () => {
  // Generate mock data for all demo fields
  const fieldsData = DEMO_FIELDS.map(field => ({
    ...field,
    analysis: generateNDVIData(field.ndvi),
  }));

  const averageNDVI = DEMO_FIELDS.reduce((acc, f) => acc + f.ndvi, 0) / DEMO_FIELDS.length;
  // Count alerts based on crop-specific thresholds
  const alertCount = DEMO_FIELDS.filter(f => {
    const category = getCropSpecificNDVICategory(f.ndvi, f.crop);
    return category.label === 'Stressed' || category.label === 'Moderate';
  }).length;
  const totalArea = DEMO_FIELDS.reduce((acc, f) => acc + f.area, 0);

  // Prepare chart data
  const weeklyTrend = [
    { week: 'Week 1', average: 0.48 },
    { week: 'Week 2', average: 0.51 },
    { week: 'Week 3', average: 0.49 },
    { week: 'Week 4', average: averageNDVI },
  ];

  const fieldComparison = DEMO_FIELDS.map(f => {
    const category = getCropSpecificNDVICategory(f.ndvi, f.crop);
    return {
      name: f.name.split(' ')[0],
      ndvi: f.ndvi,
      fill: category.label === 'Excellent' ? 'hsl(142 76% 36%)' : 
            category.label === 'Healthy' ? 'hsl(142 71% 45%)' : 
            category.label === 'Moderate' ? 'hsl(45 93% 47%)' : 'hsl(0 72% 51%)',
    };
  });

  const healthDistribution = [
    { name: 'Healthy', value: 45, fill: 'hsl(142 76% 36%)' },
    { name: 'Moderate', value: 35, fill: 'hsl(45 93% 47%)' },
    { name: 'Stressed', value: 20, fill: 'hsl(0 72% 51%)' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of all monitored fields with crop-specific health metrics
            </p>
          </div>
          <Link to="/compare">
            <Button variant="outline" className="gap-2">
              <GitCompare className="w-4 h-4" />
              Compare Fields
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{averageNDVI.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Average NDVI</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{DEMO_FIELDS.length}</div>
            <div className="text-sm text-muted-foreground">Active Fields</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{totalArea.toFixed(1)} ha</div>
            <div className="text-sm text-muted-foreground">Total Area</div>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{alertCount}</div>
            <div className="text-sm text-muted-foreground">Needs Attention</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Trend */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-display text-lg font-semibold mb-4">Weekly NDVI Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 47% 18%)" />
                  <XAxis dataKey="week" stroke="hsl(215 20% 65%)" fontSize={12} />
                  <YAxis domain={[0, 1]} stroke="hsl(215 20% 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222 47% 10%)',
                      border: '1px solid hsl(222 47% 18%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="hsl(160 84% 39%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(160 84% 39%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Distribution */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-display text-lg font-semibold mb-4">Health Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222 47% 10%)',
                      border: '1px solid hsl(222 47% 18%)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {healthDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Field Comparison */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <h3 className="font-display text-lg font-semibold mb-4">Field Comparison (Crop-Specific)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fieldComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 47% 18%)" />
                <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} />
                <YAxis domain={[0, 1]} stroke="hsl(215 20% 65%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222 47% 10%)',
                    border: '1px solid hsl(222 47% 18%)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="ndvi" radius={[4, 4, 0, 0]}>
                  {fieldComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fields List */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">All Fields (Crop-Specific Assessment)</h3>
            <Link to="/compare">
              <Button variant="ghost" size="sm" className="gap-2">
                <GitCompare className="w-4 h-4" />
                Compare
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {fieldsData.map((field) => {
              const category = getCropSpecificNDVICategory(field.ndvi, field.crop);
              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn('w-3 h-10 rounded-full', category.bgColor)} />
                    <div>
                      <p className="font-medium text-foreground">{field.name}</p>
                      <p className="text-sm text-muted-foreground">{field.crop} • {field.area} ha</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-xl font-bold font-mono', category.color)}>
                      {field.ndvi.toFixed(2)}
                    </p>
                    <p className={cn('text-sm', category.color)}>{category.label} for {field.crop}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
