import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Shirt } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          Welcome to StyleSwap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Instantly transform your look. Your AI-powered virtual dressing room.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <Link href="/change-color">
          <Card className="flex h-full cursor-pointer transform-gpu flex-col justify-between text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Palette className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-2xl">
                Change Outfit Color
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pick a photo, choose a color, and watch the magic happen.
                Perfect for testing new looks.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/change-outfit">
          <Card className="flex h-full cursor-pointer transform-gpu flex-col justify-between text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Shirt className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-2xl">
                Change Entire Outfit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload a picture of yourself and an outfit you love. Let AI
                dress you up.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
