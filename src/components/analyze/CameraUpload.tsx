import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, AlertTriangle, CheckCircle, Bug, Leaf, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getCropDiseaseInfo } from '@/lib/cropDiseaseData';

interface DiagnosisResult {
  plantName?: string;
  healthStatus?: string;
  diseases?: { name: string; confidence: string; description: string }[];
  pests?: { name: string; confidence: string; description: string }[];
  nutrientIssues?: { nutrient: string; severity: string }[];
  environmentalStress?: string[];
  severityScore?: number;
  overallDiagnosis?: string;
  recommendations?: string[];
  preventiveMeasures?: string[];
}

interface CameraUploadProps {
  cropType?: string;
  fieldName?: string;
}

export function CameraUpload({ cropType, fieldName }: CameraUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file.', variant: 'destructive' });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Max 20MB allowed.', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setSelectedFile(file);
      setDiagnosis(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedFile(null);
    setDiagnosis(null);
    setDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDiagnose = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Call our local FastAPI Python backend
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("BACKEND RESPONSE:", data);

      // Look up our matching 38-class dataset entry
      const classKey = data.raw_class || data.disease; // Prefer explicit raw class key
      console.log("LOOKUP KEY:", classKey);
      
      const diseaseInfo = getCropDiseaseInfo(classKey);
      console.log("FOUND INFO:", diseaseInfo);

      let result: DiagnosisResult;

      if (diseaseInfo) {
        // We found it in our dataset knowledge base!
        result = {
          plantName: diseaseInfo.plantName,
          healthStatus: diseaseInfo.isHealthy ? "Healthy" : "Diseased",
          overallDiagnosis: diseaseInfo.isHealthy 
            ? "The plant appears healthy." 
            : `High likelihood of ${diseaseInfo.diseaseName}.`,
          severityScore: diseaseInfo.severity === 'High' ? 8 : (diseaseInfo.severity === 'Medium' ? 5 : 2),
          recommendations: diseaseInfo.recommendations,
          preventiveMeasures: diseaseInfo.preventiveMeasures,
          diseases: !diseaseInfo.isHealthy ? [{
            name: diseaseInfo.diseaseName,
            confidence: `${(data.confidence * 100).toFixed(1)}%`,
            description: "Detected using custom PyTorch model."
          }] : [],
        };
      } else {
        // Fallback generic parsing for unknown classes
        let plantName = "Unknown Plant";
        let diseasePart = "Unknown Disease";
        const isHealthy = data.disease.toLowerCase().includes('healthy') || data.issue.toLowerCase().includes('none detected');

        if (data.disease.includes(' - ')) {
          const parts = data.disease.split(' - ');
          plantName = parts[0];
          diseasePart = parts[1];
        } else {
          plantName = data.disease.replace(/_+/g, ' ').trim();
          diseasePart = isHealthy ? "Healthy" : data.issue || data.disease;
        }

        result = {
          plantName: plantName,
          healthStatus: isHealthy ? "Healthy" : "Diseased",
          overallDiagnosis: isHealthy ? "The plant appears healthy." : `High likelihood of ${diseasePart}.`,
          severityScore: data.severity === "High" ? 8 : (data.severity === "Medium" ? 5 : 2),
          recommendations: [data.recommendation || "Consult local agricultural extension.", "Monitor crop daily for changes."],
          preventiveMeasures: ["Ensure proper spacing for air circulation.", "Avoid overhead watering."],
          diseases: !isHealthy ? [{
            name: diseasePart,
            confidence: `${(data.confidence * 100).toFixed(1)}%`,
            description: "Detected using custom PyTorch model."
          }] : [],
        };
      }

      setDiagnosis(result);
      toast({ title: 'Diagnosis Complete', description: 'AI has analyzed your crop image.' });
    } catch (err: unknown) {
      console.error('Diagnosis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please make sure the Python server is running.';
      toast({ title: 'Diagnosis Failed', description: errorMessage, variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const severityColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score <= 3) return 'text-success';
    if (score <= 6) return 'text-warning';
    return 'text-destructive';
  };

  const healthBadgeVariant = (status?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (!status) return 'secondary';
    if (status === 'Healthy') return 'default';
    if (status.includes('Mild')) return 'secondary';
    if (status.includes('Moderate')) return 'outline';
    return 'destructive';
  };

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Crop Photo Diagnosis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload area */}
        {!preview ? (
          <div
            className="border-2 border-dashed border-border/60 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Tap to upload or take a photo</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 20MB</p>
          </div>
        ) : (
          <div className="relative">
            <img src={preview} alt="Crop" className="w-full h-48 object-cover rounded-lg" />
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80" onClick={handleClear}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />



        {/* Description */}
        <div className="space-y-1">
          <Label className="text-sm">What happened? (optional)</Label>
          <Textarea
            placeholder="Describe what you noticed... e.g. yellow spots on leaves, wilting, pest damage"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>

        {/* Diagnose button */}
        <Button onClick={handleDiagnose} disabled={!selectedFile || isAnalyzing} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Diagnose Crop
            </>
          )}
        </Button>

        {/* Diagnosis results */}
        {diagnosis && (
          <div className="space-y-3 pt-2 border-t border-border/50">
            <div className="space-y-4 pt-2 border-t border-border/50">

              {/* Plant Name section */}
              {diagnosis.plantName && (
                <div>
                  <p className="text-xs font-semibold flex items-center gap-1 mb-1 uppercase tracking-wider text-muted-foreground">
                    <Leaf className="w-3 h-3 text-primary" /> Plant Name
                  </p>
                  <p className="font-semibold text-lg">{diagnosis.plantName}</p>
                </div>
              )}

              {/* Disease Name section */}
              <div>
                <p className="text-xs font-semibold flex items-center gap-1 mb-1 uppercase tracking-wider text-muted-foreground">
                  <AlertTriangle className={`w-3 h-3 ${diagnosis.healthStatus === 'Healthy' ? 'text-success' : 'text-destructive'}`} /> Disease Name
                </p>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-base ${diagnosis.healthStatus === 'Healthy' ? 'text-success' : 'text-destructive'}`}>
                    {diagnosis.diseases && diagnosis.diseases.length > 0 ? diagnosis.diseases[0].name : "Healthy / None Detected"}
                  </p>
                  {diagnosis.healthStatus && (
                    <Badge variant={healthBadgeVariant(diagnosis.healthStatus)}>{diagnosis.healthStatus}</Badge>
                  )}
                </div>
              </div>

              {/* How to Cure It section */}
              {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
                <div>
                  <p className="text-xs font-semibold flex items-center gap-1 mb-1 uppercase tracking-wider text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-success" /> How to Cure It
                  </p>
                  <div className="bg-primary/5 p-3 rounded-lg text-sm border border-primary/10">
                    <ul className="space-y-1.5 list-disc list-inside">
                      {diagnosis.recommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Preventive */}
              {diagnosis.preventiveMeasures && diagnosis.preventiveMeasures.length > 0 && (
                <div>
                  <p className="text-xs font-semibold flex items-center gap-1 mb-1">
                    <Droplets className="w-3 h-3 text-blue-400" /> Prevention
                  </p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {diagnosis.preventiveMeasures.map((m, i) => (
                      <li key={i} className="flex gap-1">
                        <span className="text-blue-400">•</span> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
