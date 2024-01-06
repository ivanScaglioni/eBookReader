import { useState } from "react";
import { trpc } from "@/utils/trpc";
import Loading from "../ux/Loading";

import Error from "../ux/Error";

import { BookType } from "@/types/bookTypes";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";


import Modal from "../ux/Modal";


const msgDelete = 'estas seguro de que que qieres eliminar este libro'

export default function BookListAdmin() {
    const [open, setOpen] = useState(false)
    const [msgDelete, setMsgDelete] = useState('')
    const [selectBook, setSelectBook] = useState<BookType>()


    const handleMsg = (book: BookType) => {
        const msgComplete = `¿Estas seguro que deseas eliminar el libro ${book.title}?`
        setMsgDelete(msgComplete)
        setSelectBook(book)
        setOpen(true)

    }



    const { data, isLoading, isError } = trpc.bookQuerys.get.useQuery();
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!data) return <></>;





    return (
        <div>
            <div>
                <Modal open={open} setOpen={setOpen} book={selectBook} msg={msgDelete} />
            </div>
            {data && (
                <>
                    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {data.map((book: BookType, index: any) => (


                                <div
                                    key={index}
                                    className="group max-sm:grid max-sm:grid-cols-2  relative rounded-sm  flex-col overflow-hidden content-between dark:bg-black-100"
                                >

                                    <div className="absolute p-1 z-20">
                                        <button onClick={() => { handleMsg(book) }} className=" flex  justify-center  self-center  w-[30px]  bg-red-500 px-2 py-1 items-center text-xs font-medium text-red-100  ring-1 ring-inset ring-red-600/10">
                                            <TrashIcon width={30} height={30} className="min-h-[30px]  min-w-[30px]" />

                                        </button >

                                    </div>
                                    <div className="overflow-hidden  group-hover:opacity-75 lg:aspect-none ">

                                        <img
                                            src={book.picture.secure_url}
                                            alt={book.title}
                                            className="w-full min-h-[400px] h-[400px] max-h-[400px] object-cover object-center"
                                        />

                                    </div>

                                    <div className="px-2 ">
                                        <div className="text-sm text-slate-400 pt-1">
                                            {book.author}
                                        </div>
                                        <div className=" max-sm:flex-col flex h-full max-h-[370px] content-between justify-between gap-2">
                                            <div>
                                                <div className="">
                                                    <a
                                                        href={`/admin/books/update/${book.slug}`}
                                                        target="_blanck"
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute inset-0"
                                                        />
                                                        {book.title}
                                                    </a>
                                                </div>
                                                <p className="text-sm  text-slate-400 pt-1 font-medium">{book.year}</p>
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}