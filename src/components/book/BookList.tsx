import React from "react";
import { trpc } from "@/utils/trpc";

import { BookType } from "@/types/bookTypes";

export default function BookList() {
  const { data, isLoading, isError } = trpc.bookQuerys.get.useQuery();
  if (isLoading) if (isError) return <div></div>;
  if (!data) return <div></div>;

  console.log(data);
  return (
    <div>
      {data && (
        <>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.map((book, index) => (
                <div
                  key={index}
                  className="group relative rounded-sm overflow-hidden  bg-white-200 dark:bg-black-100"
                >
                  <div className=" w-full overflow-hidden  group-hover:opacity-75 lg:aspect-none ">
                    <img
                      src={book.picture.secure_url}
                      alt={book.title}
                      className="w-full min-h-[400px] h-[400px] max-h-[400px] object-cover object-center"
                    />
                  </div>

                  <div className="px-2" >
                    <div className="mt-4 flex justify-between gap-4">
                    <div>
                      <div className="">
                        <a href={`/book/read/${book.slug}`} target="_blanck">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {book.title}
                        </a>
                      </div>
                    </div>
                      <p className="text-sm font-medium">{book.year}</p>
                    </div>
                      <div className="text-sm text-slate-400 pt-1">{book.author}</div>
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
