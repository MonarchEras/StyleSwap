'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { changeEntireOutfit } from '@/ai/flows/change-entire-outfit';
import ImageUpload from './image-upload';
import LoadingSpinner from './loading-spinner';
import Image from 'next/image';
import { Download, Wand2 } from 'lucide-react';

export default function ChangeOutfitForm() {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!personImage || !outfitImage) {
      toast({
        title: 'Error',
        description: 'Please upload both a person and an outfit image.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await changeEntireOutfit({
        photo1DataUri: personImage,
        photo2DataUri: outfitImage,
      });
      setResult(response.editedPhotoDataUri);
    } catch (error: any) {
      console.error('AI generation failed:', error);
      const errorMessage = error.message || 'Something went wrong while generating the image. Please try again.';
      
      if (errorMessage.includes('429')) {
         toast({
          title: 'Quota Exceeded',
          description: 'You have exceeded your API quota. Please check your plan and billing details in your Google AI account.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Generation Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `styleswap-outfit-${new Date().toISOString()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const isGenerateDisabled = !personImage || !outfitImage || loading;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">1. Upload Person Photo</h3>
            <ImageUpload onImageUpload={setPersonImage} />
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">2. Upload Outfit Photo</h3>
            <ImageUpload onImageUpload={setOutfitImage} />
          </div>
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-headline text-lg font-semibold">Result</h3>
            <div className="aspect-square w-full rounded-lg border border-dashed flex items-center justify-center bg-muted/50 overflow-hidden">
              {loading && <LoadingSpinner />}
              {!loading && result && (
                <Image
                  src={result}
                  alt="Generated image"
                  width={512}
                  height={512}
                  className="h-full w-full object-contain"
                />
              )}
              {!loading && !result && (
                <p className="text-muted-foreground text-center p-4">Your result will appear here</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center">
            <Button onClick={handleGenerate} disabled={isGenerateDisabled} size="lg" className="w-full max-w-xs bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <Wand2 className="mr-2 h-5 w-5" />
              {loading ? 'Swapping Style...' : 'Generate Image'}
            </Button>
            {result && !loading && (
              <Button onClick={handleDownload} size="lg" variant="outline" className="w-full max-w-xs mt-4">
                <Download className="mr-2 h-5 w-5" />
                Download Image
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
