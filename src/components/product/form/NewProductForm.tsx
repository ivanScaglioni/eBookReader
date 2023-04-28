import { useEffect, useState } from "react";
import axios from "axios";
import { trpc } from "@/utils/trpc";
import { useForm, Controller } from "react-hook-form";
import { number, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';


import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

type ValidProduct = {
  name: string;
  price: number;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
};

interface Values {
  name: string;
  description: string;
  mark: string;
  price: number;
  stock: number;
}

const Schema = z.object({
  name: z.string().min(3),
  mark: z.string().min(1),
  description: z.string().min(10),
  stock: z.number().min(-1),
  price: z.number(),
});


type FormData = z.TypeOf<typeof Schema>;

const alPedoArray = [0, 1, 2, 3, 4];

const remplaceSpace = (sentence:string)=>{
  return sentence.toLowerCase().replace(/\s+/g, '_');
}


export default function NewProductForm() {
  
  const [srcImages, setSrcImages] = useState<string[]>([]);
  const [validFiles, setValidFiles] = useState<File[]>([]);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const addProduct = trpc.product.create.useMutation();



  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (!selectedImages) return;
    const newImages: string[] = [];
    const newFiles: File[] = [];
    let total = srcImages.length;

    for (let i = 0; i < selectedImages.length; i++) {
      if (total >= 5) break;
      if (!selectedImages[i].type.startsWith("image")) {
        alert(`File with id: ${i} is invalid`);
        continue;
      }
      const url = URL.createObjectURL(selectedImages[i]);
      newImages.push(url);
      newFiles.push(selectedImages[i]);
      total++;
      setSelectImage(url);
    }

    setSrcImages([...srcImages, ...newImages]);
    setValidFiles([...validFiles, ...newFiles]);
  };

  const handleImageDelete = (imageSrc: string) => {
    const deleteIndex = srcImages.indexOf(imageSrc);
    setSrcImages(srcImages.filter((src) => src !== imageSrc));
    setValidFiles(validFiles.filter((_, index) => index !== deleteIndex));
    if (srcImages.length - 1 === 0) {
      setSelectImage(null);
    } else if (deleteIndex > 0) {
      setSelectImage(srcImages[deleteIndex - 1]);
    } else {
      if (srcImages[1]) {
        setSelectImage(srcImages[1]);
      } else {
        setSelectImage(null);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      stock: -1,
      price: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    const id = toast.loading("Please wait...")
    var images = [{ secure_url: "none", public_id: "none" }];
    if (validFiles.length > 0) {
      var formData = new FormData();
      validFiles.forEach((file) => formData.append("media", file));
      const responseUpload = await axios.post("/api/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (responseUpload.statusText === "OK") {
        images = responseUpload.data.data;
      }else{
        toast.update(id, { render: "there was a problem uploading the images", type: "error", isLoading: false });
      }
    }

    const name = remplaceSpace(data.name)
    const mark = remplaceSpace(data.mark)

    const validInput = {
      name: data.name,
      price: data.price,
      stock:data.stock,
      description: data.description,
      slug: `${name}_${mark}_${
        data.price
      }`,
      images: images,
    };

    console.log(validInput)

    addProduct.mutate(validInput, {
      onSuccess: () => {
        console.log("guardado");
        toast.update(id, { autoClose:5000, render: "product saved successfully", type: "success", isLoading: false });
      },
      onError(error, variables, context) {
        console.log(error);
        toast.update(id, { autoClose:5000, render: "please try again", type: "error", isLoading: false });
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto sm:p-4  bg-white-100 dark:bg-black-100 p-0 "
      >
        <div className="space-y-12  text-gray-900 dark:text-white-50 ">
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Photos
                </label>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                  PNG, JPG up to 1MB
                </p>
                <div className="flex w-full justify-center  border border-dashed border-gray-900/25  dark:border-gray-500">
                  <div className="  self-center  justify-self-center overflow-hidden flex justify-center items-center min-h-[350px] rounded-sm  ">
                    {selectImage ? (
                      <>
                        <div className=" flex  justify-end overflow-hidden  group-hover:opacity-75 ">
                          <Image
                            src={selectImage}
                            width={300}
                            height={300}
                            alt=""
                            className="min-h-[300px] max-h-[300px] lg:h-full  object-cover object-center "
                          />

                          <button
                            type="button"
                            onClick={() => handleImageDelete(selectImage)}
                            className="absolute z-20   bg-red-500 rounded-sm"
                          >
                            <XMarkIcon className="w-5  text-white-50 " />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" aspect-w-1 aspect-h-1 h-[350px] flex self-center justify-end overflow-hidden  group-hover:opacity-75 lg:aspect-none lg:h-[350px]">
                          <PhotoIcon
                            className="mx-auto w-[350px] text-gray-300 dark:text-black-50 "
                            aria-hidden="true"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full justify-items-center overflow-x-auto grid">
                <div className="flex overflow-visible gap-5 items-center justify-start z-30 ">
                  {alPedoArray.map((i) =>
                    srcImages[i] ? (
                      <div key={i + 5} className="">
                        <Image
                          width={100}
                          height={100}
                          onClick={() => setSelectImage(srcImages[i])}
                          src={srcImages[i]}
                          alt=""
                          className="max-w-[100px] max-h-[100px] min-h-[100px] object-cover"
                        />
                      </div>
                    ) : (
                      <div className="" key={i}>
                        <div className="flex  justify-center  rounded-sm border-gray-900/25  dark:border-gray-500">
                          <div className="flex text-sm  leading-6 text-gray-600 dark:text-gray-300">
                            <label
                              htmlFor="file-upload"
                              className="relative  cursor-pointer "
                            >
                              <PhotoIcon
                                className="mx-auto w-12  text-gray-300 dark:text-black-50"
                                aria-hidden="true"
                              />
                              <input
                                id="file-upload"
                                name="file-upload"
                                multiple={true}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm  font-medium leading-6"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md  dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <span className="flex select-none items-center pl-3 text-gray-500 dark:text-sky-300 sm:text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      id="price"
                      className="block p-2 overflow-hidden dark:text-white-50 flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      {...register("price", { valueAsNumber: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.price?.message}
                  </p>
                </div>
              </div>

              <div className="col-span-full ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md   dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="text"
                      id="name"
                      className="block flex-1  dark:text-white-50 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.name?.message}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-4 sm:col-start-1  col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 "
                >
                  Mark
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="text"
                      id="mark"
                      className="block flex-1  dark:text-white-50 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("mark", { required: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.name?.message}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-1 col-span-full">
                <label
                  htmlFor="stock"
                  className="block text-sm  font-medium leading-6"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md  dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="number"
                      id="stock"
                      className="block overflow-hidden  p-2 dark:text-white-50 flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="-1"
                      {...register("stock", { valueAsNumber: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.stock?.message}
                  </p>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    className="block p-2 dark:text-white-50 w-full rounded-sm border-0 outline-none bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:py-1.5 sm:text-sm sm:leading-6  dark:ring-gray-700 dark:focus-within:ring-sky-400"
                    {...register("description")}
                  />
                </div>
                <p className="text-red-600 dark:text-red-400">
                  {errors.description?.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        <input
          className="py-2 px-4 bg-sky-500 text-white-50 font-semibold rounded-sm shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
          type="submit"
        />
      </form>
      
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />


    </>
  );
}

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     console.log(validFiles);
//     console.log(srcImages);

//     if (validFiles.length === 0) return;
//     var formData = new FormData();
//     validFiles.forEach((file) => formData.append("media", file));
//     const responseUpload = await axios.post("/api/product/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (responseUpload.statusText == "OK") {
//       const images: { secure_url: string; public_id: string }[] =
//         responseUpload.data.data;

//       const validInput = {
//         name: myProduct.name,
//         price: Number(myProduct.price),
//         description: myProduct.description,
//         images

//       };

//       console.log(validInput)

//       addProduct.mutate(validInput,{
//         onSuccess:()=>{
//           console.log("guardado")
//         },
//         onError(error, variables, context) {
//           console.log(error)
//         },
//       })

//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedImages = event.target.files;
//     if (!selectedImages) return;
//     const newImages: string[] = [];
//     const newFiles: File[] = [];
//     let total = srcImages.length;

//     for (let i = 0; i < selectedImages.length; i++) {
//       if (total >= 5) break;
//       if (!selectedImages[i].type.startsWith("image")) {
//         alert(`File with idx: ${i} is invalid`);
//         continue;
//       }
//       const url = URL.createObjectURL(selectedImages[i]);
//       newImages.push(url);
//       newFiles.push(selectedImages[i]);
//       total++;
//     }
//     setSrcImages([...srcImages, ...newImages]);
//     setValidFiles([...validFiles, ...newFiles]);
//   };

//   const handleChange = async (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) =>
//     setMyProduct({
//       ...myProduct,
//       [e.target.name]: e.target.value,
//     });

//   const handleImageDelete = (imageSrc: string) => {
//     const deleteIndex = srcImages.indexOf(imageSrc);

//     setSrcImages(srcImages.filter((src) => src !== imageSrc));
//     setValidFiles(validFiles.filter((_, index) => index !== deleteIndex));
//   };

//   return (
//     <div className="  w-72 mx-auto">
//       <div>
//         {srcImages.length > 0 ? (
//           srcImages.map((src, index) => (
//             <div
//               className="max-w-sm"
//               key={index}
//               onClick={() => handleImageDelete(src)}
//             >
//               <img src={src} alt="" />
//             </div>
//           ))
//         ) : (
//           <div className="w-96 h-96 bg-gray-500"></div>
//         )}
//         <div id="choose-image">
//           <input
//             type="file"
//             accept="image/*"
//             name="image"
//             multiple={true}
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>

//       <form
//         className="flex flex-wrap gap-9 text-slate-900"
//         onSubmit={handleSubmit}
//       >
//         <label htmlFor="name">Name</label>
//         <input type="text" name="name" onChange={handleChange} />
//         <label htmlFor="price">Price</label>
//         <input type="number" name="price" onChange={handleChange} />
//         <label htmlFor="description">Description</label>
//         <textarea
//           name="description"
//           id=""
//           cols={30}
//           rows={10}
//           onChange={handleChange}
//         ></textarea>
//         <button>create</button>
//       </form>
//     </div>
//   );
// }

// export default NewProductForm;
