import { ShieldX } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-destructive/10 rounded-full p-6 mb-6">
        <ShieldX className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold font-playfair text-foreground mb-3">Access Denied</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        You don't have admin privileges to access this section. Please log in with an admin account
        to continue.
      </p>
      <Button
        onClick={() => navigate({ to: '/' })}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Go to Home
      </Button>
    </div>
  );
}
