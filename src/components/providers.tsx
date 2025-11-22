import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import { ConvexProvider } from '@/lib/convex/components/convex-provider';
import { QueryClientProvider } from '@/lib/react-query/query-client-provider';

export function Providers({ children, token }: { children: React.ReactNode, token: string | undefined }) {
  

  return (
    <ConvexProvider token={token}>
      <QueryClientProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
    </ConvexProvider>
  );
}
