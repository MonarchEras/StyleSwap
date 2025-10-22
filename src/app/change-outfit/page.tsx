import ChangeOutfitForm from '@/components/change-outfit-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChangeOutfitPage() {
  return (
    <div className="container mx-auto max-w-5xl p-4 py-8 md:p-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold md:text-4xl">
          Change Entire Outfit
        </h1>
        <p className="mt-2 text-muted-foreground">
          Upload a photo of a person and another of an outfit. Let our AI swap the styles.
        </p>
      </div>
      <ChangeOutfitForm />
    </div>
  );
}
