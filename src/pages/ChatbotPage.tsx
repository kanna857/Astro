import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DemoFieldsSelector } from '@/components/analyze/DemoFieldsSelector';
import { FarmerChatbot } from '@/components/analyze/FarmerChatbot';
import { DemoField, DEMO_FIELDS } from '@/lib/types';
import { Bot, Mic, Globe, Volume2 } from 'lucide-react';

const ChatbotPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedField, setSelectedField] = useState<DemoField | null>(null);

  useEffect(() => {
    if (searchParams.get('demo') === 'true' && !selectedField) {
      setSelectedField(DEMO_FIELDS[0]);
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            AI Agronomist Chat
          </h1>
          <p className="text-muted-foreground mb-4">
            Ask any farming question — by voice or text — in your local language. The AI replies in the same language and reads the answer aloud.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 text-sm">
              <Mic className="w-4 h-4 text-primary" />
              <span>Voice Input</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 text-sm">
              <Globe className="w-4 h-4 text-primary" />
              <span>9 Indian Languages</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 text-sm">
              <Volume2 className="w-4 h-4 text-primary" />
              <span>Audio Responses</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <DemoFieldsSelector
              selectedField={selectedField}
              onSelect={setSelectedField}
            />
          </div>

          <div className="lg:col-span-8">
            <FarmerChatbot field={selectedField} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
