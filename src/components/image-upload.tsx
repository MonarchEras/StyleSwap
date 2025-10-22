'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ImageUploadProps {
  onImageUpload: (dataUrl: string) => void;
  className?: string;
}

export default function ImageUpload({ onImageUpload, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        toast({
          title: 'Upload Error',
          description: 'Please upload a valid image file (PNG, JPG, WEBP).',
          variant: 'destructive',
        });
        return;
      }
      
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          setPreview(dataUrl);
          onImageUpload(dataUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative aspect-square w-full cursor-pointer rounded-lg border-2 border-dashed transition-colors',
        'flex items-center justify-center p-4 text-center',
        isDragActive ? 'border-primary bg-primary/10' : 'border-border bg-muted/50 hover:border-primary/50',
        className
      )}
    >
      <input {...getInputProps()} />

      {preview ? (
        <>
          <Image
            src={preview}
            alt="Image preview"
            fill
            className="object-contain rounded-md"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <UploadCloud className="h-10 w-10" />
          <p className="font-semibold">
            {isDragActive ? 'Drop the image here' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
}
