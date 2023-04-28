import ImageGallery from "../media/ImageGallery"


type Product = {
    name:string,
    description:string,
    price:number,
    images:[
        {
            secure_url:string,
        }
    ]
}



export default function ProductCard({product}:{product:Product}) {
  return (
    <>
        {product &&

            <div>
               
                <ImageGallery images={product.images} />
                <div className="text-3xl">
                    {product.name}
                </div>
            </div>

        }
    
    </>
  )
}
