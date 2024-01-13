import { useEffect, useState } from "react";
const axios = require('axios').default;
import { trpc } from "@/utils/trpc";
import { useForm, Controller } from "react-hook-form";
import { number, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "react-toastify";
import { TRPCError } from "@trpc/server";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";


interface ValidBook {
  title: string;
  slug: string;
  author: string;
  description: string;
  picture: {
    secure_url: string;
    public_id: string;
  };
  pages: number;
  year: number;
  key: string;
}

type Book = {
  picture: {
    secure_url: string;
    public_id: string;
  };
  key: string;
};

const Schema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string(),
  pages: z.number().min(-1),
  year: z.number(),
});

type FormData = z.TypeOf<typeof Schema>;

const remplaceSpace = (sentence: string) => {
  return sentence.toLowerCase().trim().replace(/\s+/g, "_");
};

export default function NewBookForm() {
  const [srcImages, setSrcImages] = useState<string[]>([]);
  const [validFiles, setValidFiles] = useState<File[]>([]);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [selectBook, setSelectBook] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [namePDF, setNamePDF] = useState("");

  const addBook = trpc.bookQuerys.create.useMutation();

  const handlePDF = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    setNamePDF(event.target.files[0].name);
    setValidFiles([...validFiles, ...event.target.files]);
  };

  const handlePDFDelete = () => {
    setPreviewUrl(null);
    setNamePDF("");
  };

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
      pages: 1,
      year: new Date().getFullYear(),
      author: "C.A.Tac.Pol.",
    },
  });

  const onSubmit = async (data: FormData) => {

    const id = toast.loading("Please wait...");
    let book: Book = {
      picture: {
        secure_url: "none",
        public_id: "none",
      },
      key: "none",
    };
    if (validFiles.length > 0) {
      var formData = new FormData();
      validFiles.forEach((file) => formData.append("media", file));

      const responseUpload = await axios.post("/api/upload/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },


      });






      if (responseUpload.status === 200) {
        book = responseUpload.data;
      } else {
        toast.update(id, {
          render: "there was a problem uploading the image",
          type: "error",
          isLoading: false,
        });
      }

      console.log(responseUpload)

 

    }
    
    

    
    const bookSlug = remplaceSpace(data.title);

    const newBook: ValidBook = {
      ...data,
      ...book,
      slug: bookSlug,
    };



    addBook.mutate(newBook, {
      onSuccess: () => {
        console.log("guardado");
        toast.update(id, {
          autoClose: 5000,
          render: "product saved successfully",
          type: "success",
          isLoading: false,
        });
      },
      onError: (err) => {
        toast.update(id, {
          autoClose: 5000,
          render: "Error",
          type: "error",
          isLoading: false,
        });
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto sm:p-4 my-8 bg-white-100 dark:bg-black-100 p-0 "
      >
        <div className="space-y-12  text-gray-900 dark:text-white-50 ">
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Portada
                </label>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                  PNG, JPG
                </p>
                <div className="flex w-full justify-center  border border-dashed border-gray-900/25  dark:border-gray-500">
                  <div className="  self-center  justify-self-center overflow-hidden flex justify-center items-center min-h-[400px] rounded-sm  ">
                    {selectImage ? (
                      <>
                        <div className=" flex  justify-end overflow-hidden  group-hover:opacity-75 ">
                          <Image
                            src={selectImage}
                            width={300}
                            height={400}
                            alt=""
                            className="min-h-[400px] max-h-[400px] lg:h-full  object-cover object-center "
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
                        <div className=" aspect-w-1 aspect-h-1 h-[400px] flex self-center justify-end overflow-hidden  group-hover:opacity-75 lg:aspect-none lg:h-[350px]">
                          <div className="flex text-sm items-center  leading-6 text-gray-600 dark:text-gray-300">
                            <label
                              htmlFor="file-upload"
                              className="relative  cursor-pointer "
                            >
                              <PhotoIcon
                                className="mx-auto w-[300px] text-gray-300 dark:text-black-50 "
                                aria-hidden="true"
                              />
                              <input
                                id="file-upload"
                                name="file-upload"
                                multiple={false}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Libro en formato PDF
                </label>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                  PDF
                </p>
                <div className="flex w-full justify-center  border border-dashed border-gray-900/25  dark:border-gray-500">
                  <div className="  self-center  justify-self-center overflow-hidden flex justify-center items-center min-h-[400px] rounded-sm  ">
                    {previewUrl ? (
                      <>
                        <div className=" flex  justify-end overflow-hidden max-h-[400px]  group-hover:opacity-75 ">
                          <div className="pdf-preview">
                            <embed
                              src={previewUrl}
                              type="application/pdf"
                              width="100%"
                              height="400px"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handlePDFDelete()}
                            className="absolute z-20   bg-red-500 rounded-sm"
                          >
                            <XMarkIcon className="w-5  text-white-50 " />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" aspect-w-1 aspect-h-1 h-[300px] flex self-center justify-end overflow-hidden  group-hover:opacity-75 lg:aspect-none lg:h-[350px]">
                          <div className="flex text-sm items-center leading-6 text-gray-600 dark:text-gray-300">
                            <label
                              htmlFor="book-upload"
                              className="relative  cursor-pointer "
                            >
                              <DocumentArrowUpIcon
                                className="mx-auto w-[250px] text-gray-300 dark:text-black-50 "
                                aria-hidden="true"
                              />
                              <input
                                id="book-upload"
                                name="book-upload"
                                multiple={false}
                                type="file"
                                accept="application/pdf"
                                className="sr-only"
                                onChange={handlePDF}
                              />
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="overflow-auto">{namePDF}</div>
              </div>

              <div className="sm:col-span-4 sm:col-start-1  col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 "
                >
                  Título
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md   dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="text"
                      id="title"
                      className="block flex-1  dark:text-white-50 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("title", { required: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.title?.message}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-1 col-span-full">
                <label
                  htmlFor="year"
                  className="block text-sm  font-medium leading-6"
                >
                  Año
                </label>
                <div className="mt-2">
                  <div className="flex ro<unded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md  dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="number"
                      id="year"
                      className="block overflow-hidden  p-2 dark:text-white-50 flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="1"
                      {...register("year", { valueAsNumber: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.year?.message}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-4 sm:col-start-1  col-span-full">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium leading-6 "
                >
                  Autor
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="text"
                      id="author"
                      className="block flex-1  dark:text-white-50 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("author", { required: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.author?.message}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-1 col-span-full">
                <label
                  htmlFor="pages"
                  className="block text-sm  font-medium leading-6"
                >
                  Pagínas
                </label>
                <div className="mt-2">
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md  dark:ring-gray-700 dark:focus-within:ring-sky-400">
                    <input
                      type="number"
                      id="pages"
                      className="block overflow-hidden  p-2 dark:text-white-50 flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="1"
                      {...register("pages", { valueAsNumber: true })}
                    />
                  </div>
                  <p className="text-red-600 dark:text-red-400">
                    {errors.pages?.message}
                  </p>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6"
                >
                  Descripción
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
    </>
  );
}
