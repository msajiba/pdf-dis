"use client"
import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';


const PageCanvas = ({ url }: { url: string }) => {

    const canvasRef = useRef<any>(null);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        console.log(loadingTask)

        loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded');
        },
            (error) => {
                console.error(error);
            });

    }, [url]);



    return (
        <div className='border shadow-xl canva-page '>
            <h4 className='text-center'> PDF View </h4>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default PageCanvas; 