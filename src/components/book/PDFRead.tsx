import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useBookStore from "@/store/bookStore";
import { trpc } from "@/utils/trpc";
import Loading from "../ux/Loading";
import Error from "../ux/Error";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  url: string;
}

const PDFRead = () => {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const asPath = window.location.href;
    const params = asPath.split("/");
    const lastParam = params[params.length - 1];
    setSlug(lastParam);
  }, []);

  const { zoom, totalPages, setTotalPages, setPage, currentPage } =
    useBookStore();
  const pdfRef = useRef<HTMLDivElement>(null);


  const { data, isLoading, isError } = trpc.bookQuerys.getBookUrl.useQuery({
    slug: slug,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />
  if (!data) return <></>;

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };

  const handleScroll = () => {
    const pageElement = document.getElementById("1");
    if (!pdfRef.current || !pageElement) return;
    const { scrollTop } = pdfRef.current;
    const num = Math.ceil(scrollTop / pageElement.clientHeight) || 1;
    const pageX = document.getElementById(`${num + 1}`);
    if (!pageX) return;
    const rect = pageX.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      setPage(num + 1);
    } else {
      setPage(num);
    }
  };

  return (
    <div
      className="pdfViewer  flex justify-center max-h-[100vh] overflow-auto"
      onScroll={handleScroll}
      ref={pdfRef}
    >
      <Document file={data} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(totalPages), (_, index) => (
          <React.Fragment key={`page_${index + 1}`}>
            <div id={`${index + 1}`} className="pb-5">
              <Page pageNumber={index + 1} scale={zoom} />
            </div>
          </React.Fragment>
        ))}
      </Document>
    </div>
  );
};

export default PDFRead;
