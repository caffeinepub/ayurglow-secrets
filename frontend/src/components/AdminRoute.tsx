import { Loader2 } from 'lucide-react';
import { useCanAccessAdminSection } from '../hooks/useQueries';
import AccessDeniedScreen from './AccessDeniedScreen';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { data: canAccess, isLoading, isFetched } = useCanAccessAdminSection();

  if (isLoading || !isFetched) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Checking permissions...</span>
        </div>
      </div>
    );
  }

  if (!canAccess) {
    return <AccessDeniedScreen />;
  }

  return <>{children}</>;
}
