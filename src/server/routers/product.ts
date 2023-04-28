import { z } from "zod";
import { procedure, router } from "../trpc";
import Product from "@/models/Product";
import superjson from 'superjson';
import connectDB from "@/db/db";
connectDB();

const get = procedure.query(async () => {
  const products = await Product.find();
  return products;
});

const getProductBySlug = procedure.input(
  z.object({
    slug:z.string()
  })
).query(async({input})=>{

  const product = await Product.findOne({slug:input.slug})
  return (JSON.stringify(product));
})

const create = procedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      mark:z.string(),
      stock:z.number(),
      slug:z.string(),
      images: z.array(z.object({
        secure_url: z.string(),
        public_id: z.string()
      }))
    })
  )
  .mutation(async ({ input }) => {
    const newProduct = new Product({
      name:input.name,
      slug:input.slug,
      stock:input.stock,
      mark:input.mark,
      description:input.description,
      price:input.price,
      images:input.images
    });
    const product = await newProduct.save();
    console.log(product);
    return product;
});


const deleteById = procedure.input(
  z.string()
).mutation(async({input})=>{

  const deleteProduct = await Product.findByIdAndDelete(input)

})



export const productRouter = router({
  getProductBySlug,
  get,
  create,
});


