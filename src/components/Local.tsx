"use client"
import React, { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;


const Local = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendering = useRef(false);

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event: any) => {
                const data = event.target.result;

                try {

                    if (rendering.current) return;
                    rendering.current = true;

                    const canvas = canvasRef.current;

                    if (canvas) {
                        const canvasContext = canvas.getContext('2d');
                        if (canvasContext) {
                            const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
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
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <div className="text-center">
                <input onChange={handleFileChange} type="file" name='file' accept="application/pdf" />
            </div>
            <div className='border shadow-xl canva-page '>
                <h4 className='text-center'> PDF View </h4>
                <canvas ref={canvasRef} className='canva-page'></canvas>
            </div>
        </div>
    );
};

export default Local;