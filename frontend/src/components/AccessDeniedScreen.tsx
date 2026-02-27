import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground font-serif mb-3">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You need admin privileges to access this page. Please log in with an admin account to
          continue.
        </p>
        <Button onClick={() => navigate({ to: '/' })} variant="outline">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
