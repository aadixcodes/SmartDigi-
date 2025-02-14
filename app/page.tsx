import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed className="h-12 w-12" />
            <h1 className="text-4xl font-bold">SmartDini</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Welcome to SmartDini - Your smart restaurant ordering solution. Scan, order, and enjoy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/menu">
              <Button size="lg" className="min-w-[200px]">
                View Menu
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}