import { z } from "zod";
import { procedure, router } from "../trpc";
import Book from "@/models/Book";
import superjson from 'superjson';
import connectDB from "@/db/db";
connectDB();

const get = procedure.query(async () => {
  const products = await Book.find();
  return products;
});

const getBookBySlug = procedure.input(
  z.object({
    slug:z.string()
  })
).query(async({input})=>{
  const book = await Book.findOne({slug:input.slug})
  return (JSON.stringify(book));
})

const create = procedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      author:z.string(),
      pages:z.number(),
      year:z.number(),
      slug:z.string(),
      picture: z.object({
        secure_url: z.string(),
        public_id: z.string()
      }),
      key: z.string()
    })
  )
  .mutation(async ({ input }) => {
    const newBook = new Book(input);
    const book = await newBook.save();
    console.log(book);
    return book;
});


const deleteById = procedure.input(
  z.string()
  
).mutation(async({input})=>{

  const deleteProduct = await Book.findByIdAndDelete(input)

})



export const bookRouter = router({
  getBookBySlug,
  get,
  create,
});


