import * as trpc from '@trpc/server';

export const createContext = () => ({});

export type Context = trpc.inferAsyncReturnType<typeof createContext>;