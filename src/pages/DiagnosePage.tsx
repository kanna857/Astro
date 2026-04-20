import { Layout } from '@/components/layout/Layout';
import { CameraUpload } from '@/components/analyze/CameraUpload';
import { Camera } from 'lucide-react';

const DiagnosePage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 max-w-2xl mx-auto text-center">
                    <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Camera className="w-8 h-8 text-primary" />
                        Crop Photo Diagnosis
                    </h1>
                    <p className="text-muted-foreground">
                        Upload or take a photo of your crop to get an AI-powered diagnosis of its health, detect diseases, pests, and nutrient issues.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <CameraUpload />
                </div>
            </div>
        </Layout>
    );
};

export default DiagnosePage;
