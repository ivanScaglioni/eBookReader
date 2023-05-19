import React, { ChangeEvent, useState } from "react";

import useBookStore from "@/store/bookStore";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

interface Props {
  totalPages: number;
}

function Toolbar() {
  const { currentPage, nextPage, prevPage, totalPages, setPage } =
    useBookStore();

  const [countPage, setCountPage] = useState(1);



  const handlePage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPage(value);
  };

  const goToPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      const page = Number(event.currentTarget.value);
      if (page && page >= 1 && page <= totalPages) {
        setPage(page);
        setCountPage(page)
        document.getElementById(`${page}`)?.scrollIntoView()

      }
    }
  };
  return (
    <div className="fixed flex w-full justify-center top-0 z-50">
      <div className=" flex  justify-center gap-3 bg-black-50">
        <div className="flex gap-1 items-center">
          <div className="rounded-sm ring-1  ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600   dark:ring-gray-700 dark:focus-within:ring-sky-400">
            <input
              type="number"
              className="overflow-hidden  w-16 text-right   p-1 dark:text-white-50 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0 "
              value={currentPage}
              onChange={handlePage}
              onKeyDown={goToPage}
            />
          </div>
          <div>/</div>
          <div className="w-16">{totalPages}</div>
          <div className="flex gap-3 p-1">
            <div> + </div>
            zoom
            <div> - </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
