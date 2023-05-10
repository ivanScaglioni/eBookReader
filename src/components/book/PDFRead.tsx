import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs,  } from "react-pdf";
import useBookStore from "@/store/bookStore";



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface Props {
  url: string;
}


const PDFRead = ({url}:Props) => {

 
  const { zoom, totalPages ,setTotalPages, setPage } = useBookStore();

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages)
  };

  const handleScroll = () => {
    const pageElement = document.getElementById('1');
    if (pdfRef.current && pageElement) {
      const { scrollTop } = pdfRef.current;
    
      const currentPage = Math.ceil((scrollTop / pageElement.clientHeight) ) || 1;
      console.log(currentPage)
      setPage(currentPage);
    }
  };

  return (
    <div className="pdfViewer flex justify-center max-h-[100vh] overflow-auto" onScroll={handleScroll} ref={pdfRef}>
      <Document file={url} onLoadSuccess={handleDocumentLoadSuccess} >
        {Array.from(new Array(totalPages), (_, index) => (

          <React.Fragment key={`page_${index + 1}`} >
 
            <div   id={`${index + 1}`}>
              <Page  pageNumber={index + 1} scale={zoom} />
            </div>
          </ React.Fragment>

        ))}
      </Document>
    </div>
  );
};




export default PDFRead;

