import { router, publicProcedure } from '../trpc';
import { z } from 'zod'; 
import { prisma } from '../prisma';  

export const boardRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.board.findMany({
      include: {
        lists: {
          include: {
            cards: true
          }
        }
      }
    });
  }),

  getById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    return await prisma.board.findUnique({
      where: { id: input.id },
      include: {
        lists: {
          include: {
            cards: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }),
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.board.create({
        data: { title: input.title }
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.board.delete({
        where: { id: input.id }
      });
    }),
    createList: publicProcedure
    .input(z.object({ title: z.string(), boardId: z.string() }))
    .mutation(async ({ input }) => {
      const { title, boardId } = input;
      const listCount = await prisma.list.count({ where: { boardId } }); // Determine order
      return await prisma.list.create({
        data: {
          title,
          order: listCount, 
          boardId,
        },
      });
    }),
  

    deleteList: publicProcedure
    .input(z.object({ id: z.string() })) // Accepts the list ID
    .mutation(async ({ input }) => {
      await prisma.list.delete({
        where: { id: input.id }, // Deletes the list by ID
      });
      return { success: true };
    }),

    createCard: publicProcedure
    .input(
      z.object({
        title: z.string(), // Card title
        description: z.string().optional(), // Optional description
        listId: z.string(), // ID of the parent list
      })
    )
    .mutation(async ({ input }) => {
      const cardCount = await prisma.card.count({ where: { listId: input.listId } }); // Count cards in the list
      return await prisma.card.create({
        data: {
          title: input.title,
          description: input.description,
          listId: input.listId,
          order: cardCount,
        },
      });
    }),
    deleteCard: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.card.delete({
        where: { id: input.id },
      });
      return { success: true, deletedId: input.id };
    }),
    updateListOrder: publicProcedure
  .input(
    z.array(
      z.object({
        id: z.string(),
        order: z.number(),
      })
    )
  )
  .mutation(async ({ input }) => {
    const updates = input.map(({ id, order }) =>
      prisma.list.update({
        where: { id },
        data: { order },
      })
    );
    await Promise.all(updates);
    return { success: true };
  }),

 updateCardOrder: publicProcedure
  .input(
    z.array(
      z.object({
        id: z.string(),
        order: z.number(),
        listId: z.string(),
      })
    )
  )
  .mutation(async ({ input }) => {
    const updates = input.map(({ id, order, listId }) =>
      prisma.card.update({
        where: { id },
        data: { order, listId },
      })
    );
    await Promise.all(updates);
    return { success: true };
  }),

  updateListName: publicProcedure
  .input(z.object({ id: z.string(), title: z.string() }))
  .mutation(async ({ input }) => {
    return await prisma.list.update({
      where: { id: input.id },
      data: { title: input.title },
    });
  }),

  updateCard: publicProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })
  )
  .mutation(async ({ input }) => {
    return await prisma.card.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
      },
    });
  }),
});
