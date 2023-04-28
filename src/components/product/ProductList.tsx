import ProductCard from "./ProductCard";

import Image from "next/image";
import { Product } from "@/types/productTypes";



export default function ProductList({ products }:{ products: Product[]}) {
  

  
  return (
    <>
      {
        products && (
          <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product,index) => (
            <div key={index} className="group relative rounded-sm overflow-hidden  bg-white-200 dark:bg-black-100">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden  group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.images[0].secure_url}
                  alt={product.name}
                  className="h-full w-full min-h-[300px] object-cover object-center lg:h-full lg:w-full"
                />
              </div>
             
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm">
                    <a href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium">${product.price}</p>
                <div>{product.mark}</div>
              </div>
             
            </div>
          ))}
        </div>
      </div>
          </>
        )

        // products.map((product, index)=>(
        //     <div key={index} >
        //          <ProductCard product={product} />

        //     </div>

        // ))
      }
    </>
  );
}
