import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/routers/_app";
import { verifyJWT } from "@/safety/JWT";


// export API handler
// @see https://trpc.io/docs/api-handler


const myContext = async ({ req, res }: trpcNext.CreateNextContextOptions) => {
  async function isAuth() {
    if (req.headers.cookie) {
      const user = await verifyJWT(
        req.headers.cookie,
      );
      return user;
    }
    return false;
  }
  const auth = await isAuth();
  return {
    auth,
  };
}

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: myContext
});



export type Context = Awaited<ReturnType<typeof myContext>>;