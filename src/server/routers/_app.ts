import { z } from 'zod';
import { procedure, router } from '../trpc';

import { bookRouter } from './book';


export const appRouter = router({
  bookQuerys: bookRouter
}) ;




// export type definition of API



export type AppRouter = typeof appRouter;