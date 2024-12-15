import { router, publicProcedure } from '../trpc';
import { z } from 'zod'; 
import { prisma } from '../prisma';  

export const boardRouter = router({
  getAll: publicProcedure.query(async () => {
    console.log("Fetching boards...");
    const boards = await prisma.board.findMany({
      include: {
        lists: {
          include: {
            cards: true
          }
        }
      }
    });
    console.log("Found boards:", boards);
    return boards;
  }),

  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      console.log("Creating board:", input.title);
      const board = await prisma.board.create({
        data: { title: input.title }
      });
      console.log("Created board:", board);
      return board;
    }),
});