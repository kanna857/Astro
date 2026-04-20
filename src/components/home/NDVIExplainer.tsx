const ndviScale = [
  { range: '0.7 - 1.0', label: 'Very Healthy', color: 'bg-ndvi-excellent', description: 'Optimal growth conditions' },
  { range: '0.5 - 0.7', label: 'Healthy', color: 'bg-ndvi-healthy', description: 'Good vegetation health' },
  { range: '0.3 - 0.5', label: 'Moderate', color: 'bg-ndvi-moderate', description: 'Some stress detected' },
  { range: '0.0 - 0.3', label: 'Stressed', color: 'bg-ndvi-critical', description: 'Immediate attention needed' },
];

export function NDVIExplainer() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Understanding <span className="text-gradient">NDVI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Normalized Difference Vegetation Index (NDVI) is a key indicator of plant health, 
                calculated from satellite imagery by measuring how plants reflect light.
              </p>
            </div>

            {/* NDVI Scale */}
            <div className="space-y-4">
              {ndviScale.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className={`w-4 h-12 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">{item.label}</span>
                      <span className="text-sm font-mono text-muted-foreground">{item.range}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Gradient */}
            <div className="mt-8 h-4 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-ndvi-critical" />
              <div className="flex-1 bg-ndvi-stressed" />
              <div className="flex-1 bg-ndvi-moderate" />
              <div className="flex-1 bg-ndvi-healthy" />
              <div className="flex-1 bg-ndvi-excellent" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>0.0</span>
              <span>0.25</span>
              <span>0.5</span>
              <span>0.75</span>
              <span>1.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
