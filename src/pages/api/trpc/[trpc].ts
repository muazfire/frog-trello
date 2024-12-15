import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers";
import { createContext } from "../../../server/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
        }
      : undefined,
});