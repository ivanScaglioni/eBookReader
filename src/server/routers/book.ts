import { string, z } from "zod";
import { procedure, router } from "../trpc";
import Book from "@/models/Book";
import superjson from "superjson";
import connectDB from "@/db/db";
connectDB();
import { BookType } from "@/types/bookTypes";


import { getUrlS3 } from "@/utils/s3";

const get = procedure.query(async () => {
  const books = (await Book.find()) as BookType[];
  return books;
});


const getTotal = procedure.query(async () => {
  const books = (await Book.estimatedDocumentCount()) as number;
  return books;
});


const getCompleteBook = procedure
  .input(
    z.object({
      slug: z.string(),
    })
  )
  .query(async ({ input }) => {
    const book = await Book.findOne({ slug: input.slug }) as BookType ;
    if (!book) return JSON.stringify({ error: "algo salio mal" });
    const key = book.key;
    const url = await getUrlS3(key) as string;
    if (!url) return JSON.stringify({ error: "algo salio mal" });
    return { mybook:book, myurl:url};
  });

const getBookUrl = procedure
  .input(
    z.object({
      slug: z.string(),
    })
  )
  .query(async ({ input }) => {
    const book = await Book.findOne({ slug: input.slug });
    if (!book) return JSON.stringify({ error: "algo salio mal" });
    const key = book.key as string;
    const url = await getUrlS3(key);
    return url;
  });

const getBookBySlug = procedure
  .input(
    z.object({
      slug: z.string(),
    })
  )
  .query(async ({ input }) => {
    const book = await Book.findOne({ slug: input.slug }) as BookType;
    return book;
  });





const create = procedure
.input(
  z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pages: z.number(),
    year: z.number(),
    slug: z.string(),
    picture: z.object({
      secure_url: z.string(),
      public_id: z.string(),
    }),
    key: z.string(),
  })
)
.mutation(async ({ input, ctx }) => {

  if(ctx.auth){
    const newBook = new Book(input);
    const book = await newBook.save();

    return book;

  }
  return 'error'

 
});

const deleteBySlug = procedure.input(z.string()).mutation(async ({ input, ctx }) => {
  if(ctx.auth){
    const deleteProduct = await Book.findOneAndDelete({slug:input});
    console.log(deleteProduct)
    return deleteProduct
  }
  return 'error'
});


const update = procedure
.input(
  z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pages: z.number(),
    year: z.number(),
    slug: z.string(),
    picture: z.object({
      secure_url: z.string(),
      public_id: z.string(),
    }),
    key: z.string(),
    currentSlug:z.string(),
  })
)
.mutation(async ({ input, ctx }) => {

  if(ctx.auth){

    var upBook = {}

    upBook = {
      title:input.title,
      description: input.description,
      author:input.author,
      pages:input.pages,
      slug:input.slug,
      year:input.year,
    
    }

    if(input.key !== "none" ){
      upBook = {
        ...upBook,
        key:input.key
      }
    }

    if (input.picture.public_id !== "none"){
      upBook = {
        ...upBook,
        key:input.key,
        picture:{
          secure_url:input.picture.secure_url,
          public_id:input.picture.public_id
        }
      }
    }



    const updateBook = await Book.findOneAndUpdate({slug: input.currentSlug}, upBook);
    

    return updateBook;
  }
  return 'error'

 
});


export const bookRouter = router({
  getBookBySlug,
  getBookUrl,
  getCompleteBook,
  get,
  create,
  deleteBySlug,
  getTotal,
  update,
});
