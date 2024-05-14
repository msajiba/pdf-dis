"use client"
import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import Link from 'next/link';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PageCanvas = ({ url = "" }: { url: any }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendering = useRef(false);
    
    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const response = await fetch(url);
                const pdfBlob = await response.blob();
                const arrayBuffer = await pdfBlob.arrayBuffer();
                const pdfData = new Uint8Array(arrayBuffer);

                if (rendering.current) return;
                rendering.current = true;

                const canvas = canvasRef.current;

                if (canvas) {
                    const canvasContext = canvas.getContext('2d');
                    if (canvasContext) {
                        const pdfDoc = await pdfjsLib.getDocument({
                            data: pdfData,
                        }).promise;

                        if (pdfDoc) {
                            const pageNumber = 1;
                            let scale = 1.5;
                            const pdfPage = await pdfDoc.getPage(pageNumber);

                            const viewport = pdfPage.getViewport({ scale });
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            await pdfPage.render({
                                canvasContext,
                                viewport
                            }).promise;
                        }
                        rendering.current = false;
                    }
                }

            } catch (error) {
                console.error('Error loading PDF: ', error);
            }
        };

        fetchPDF();
    }, [url]);



    return (
        <div className='border shadow-xl canva-page '>
            <h4 className='text-center'> PDF View  </h4>
            <Link className='text-center text-blue-500' target='_blank' href={url}> {url && url}</Link>
            <canvas ref={canvasRef} className='canva-page'></canvas>
        </div>
    );
};

export default PageCanvas; 