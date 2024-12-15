import { router } from '../trpc';
import { boardRouter } from './board';

export const appRouter = router({
  board: boardRouter,
});

// Add this line to export the type
export type AppRouter = typeof appRouter;