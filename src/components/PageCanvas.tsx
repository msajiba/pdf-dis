"use client"
import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;


const PageCanvas = ({ url }: { url: string }) => {

    const canvasRef = useRef<any>(null);

    console.log(url);


    useEffect(() => {

        var loadingTask = pdfjsLib.getDocument(url);
        console.log(loadingTask)

        // This promise not resolve
        loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded');

            // Fetch the first page
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');

                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                var canvas: any = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    console.log('Page rendered');
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
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