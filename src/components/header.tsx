import Link from 'next/link';
import AuthButton from './auth-button';
import { Icons } from './icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block font-headline">
            StyleSwap
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
