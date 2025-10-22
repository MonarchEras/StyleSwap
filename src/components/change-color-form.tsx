'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { changeOutfitColor } from '@/ai/flows/change-outfit-color';
import ImageUpload from './image-upload';
import LoadingSpinner from './loading-spinner';
import Image from 'next/image';
import { Download, Wand2 } from 'lucide-react';

export default function ChangeColorForm() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState('#A0D2EB');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!image) {
      toast({
        title: 'Error',
        description: 'Please upload an image first.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await changeOutfitColor({
        photoDataUri: image,
        color: color,
      });
      setResult(response.modifiedPhotoDataUri);
    } catch (error) {
      console.error('AI generation failed:', error);
      toast({
        title: 'Generation Failed',
        description:
          'Something went wrong while generating the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `styleswap-color-${new Date().toISOString()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const isGenerateDisabled = !image || loading;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">1. Upload Your Photo</h3>
            <ImageUpload onImageUpload={setImage} />

            <h3 className="font-headline text-lg font-semibold pt-4">2. Pick a Color</h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-12 cursor-pointer rounded-md border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
              />
              <span className="text-lg font-medium font-mono uppercase">{color}</span>
            </div>
            
            <Button onClick={handleGenerate} disabled={isGenerateDisabled} size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <Wand2 className="mr-2 h-5 w-5" />
              {loading ? 'Generating...' : 'Generate Image'}
            </Button>
          </div>

          <div className="space-y-4">
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
                <p className="text-muted-foreground">Your result will appear here</p>
              )}
            </div>
             {result && !loading && (
              <Button onClick={handleDownload} size="lg" className="w-full">
                <Download className="mr-2 h-5 w-5" />
                Download Image
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
