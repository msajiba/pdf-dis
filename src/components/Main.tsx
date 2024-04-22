"use client"

import React, { useRef, useState } from 'react';
import FileUploadFromDrive from './FileUploadFromDrive';
import PageCanvas from './PageCanvas';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Main = () => {

    const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
    const dummyURL = "https://firebasestorage.googleapis.com/v0/b/share-with-sajib.appspot.com/o/check%2Fexample.pdf?alt=media&token=0c5899b4-0ccd-43d6-b52b-3a69bcb277bf"
    // const test = "https://drive.google.com/uc?export=download&id=1XBJeB3Wu-rwxx3UU2zcgLT_CaFvG2ply.pdf"
    const test = "https://drive.google.com/file/d/1XBJeB3Wu-rwxx3UU2zcgLT_CaFvG2ply/view"

    const [url, setUrl] = useState<string>(pdfUrl);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendering = useRef(false);


    // handle file from upload local computer
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

            {/* <PageCanvas url={url} /> */}
            {
                url.trim() !== ""
                    ?
                    <PageCanvas url={url} />
                    :
                    <FileUploadFromDrive
                        setValue={setUrl}
                        multiselect={false}
                    />
            }

            {/* <div>
                <input onChange={handleFileChange} type="file" name='file' />
                <div className='border shadow-xl canva-page '>
                    <h4 className='text-center'> PDF View </h4>
                    <canvas ref={canvasRef} className='canva-page'></canvas>
                </div>
            </div> */}
        </div>
    );
};

export default Main;