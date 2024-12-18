import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../server/routers';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const getBaseUrl = () => {
      if (typeof window !== 'undefined') {
        
        return '';
      }
     
      return process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'; 
    };

    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
