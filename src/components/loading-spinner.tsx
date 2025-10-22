import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4" aria-live="polite" aria-busy="true">
      <div
        className={cn(
          'h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent',
          className
        )}
      ></div>
      <p className="text-muted-foreground font-medium">Processing...</p>
    </div>
  );
}
