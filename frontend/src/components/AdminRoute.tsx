import React from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute - passes through children directly without any auth guard.
 * Admin pages are accessible to all users; backend enforces permissions.
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  return <>{children}</>;
}
