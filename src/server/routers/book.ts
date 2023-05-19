import { z } from "zod";
import { procedure, router } from "../trpc";
import Book from "@/models/Book";
import superjson from 'superjson';
import connectDB from "@/db/db";
connectDB();
import { BookType } from "@/types/bookTypes";

import { getUrlS3 } from "@/utils/s3";

const get = procedure.query(async () => {
  const books = await Book.find() as BookType[] ;
  return books;
});

const getBookUrl= procedure.input(
  z.object({
    slug:z.string()
  })
).query(async({input})=>{
  const book = await Book.findOne({slug:input.slug})
  if(!book) return(JSON.stringify({error:'algo salio mal'}))
  const key= book?.key as string
  return await getUrlS3(key)
  
})


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
    return // seguridad
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
  getBookUrl,
  get,
  create,
});


