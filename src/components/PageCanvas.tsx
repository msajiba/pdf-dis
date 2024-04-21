"use client"
import React, { useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PageCanvas = ({ url }: { url: string }) => {

    const canvasRef = useRef<any>(null);

    // useEffect(() => {
    //     try {
    //         const loadingTask = pdfjs.getDocument("pdf.pdf");
    //         console.log(loadingTask)
    //         loadingTask.promise.then(function (pdf:any) {
    //             console.log('PDF loaded');
    //         },
    //             (error:any) => {
    //                 console.error(error);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }, [url]);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const loadingTask = pdfjs.getDocument(url);
                console.log(loadingTask)
                const pdf = await loadingTask.promise;
                console.log(pdf);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPDF();
    }, [url]);

    // useEffect(() => {
    //     const fetchPDF = async () => {
    //         const loadingTask = getDocument(url);
    //         console.log(loadingTask);

    //         try {
    //             const pdfDoc = await loadingTask.promise;
    //             console.log(pdfDoc)

    //         } catch (error) {
    //             console.error('Error loading PDF: ', error);
    //         }
    //     };

    //     fetchPDF();
    // }, [url]);



    return (
        <div className='border shadow-xl canva-page '>
            <h4 className='text-center'> PDF View </h4>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default PageCanvas; 