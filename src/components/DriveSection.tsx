"use client"
import React, { useState } from 'react';
import FileUploadFromDrive from './FileUploadFromDrive';
import PageCanvas from './PageCanvas';


const DriveSection = () => {

    // Url Example of pdf.js dist 
    const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

    const [url, setUrl] = useState<string>("");


    return (
        <div>
            <div>
                <div className="flex justify-center">
                    <FileUploadFromDrive
                        setValue={setUrl}
                        multiselect={false}
                    />
                </div>
                <PageCanvas url={url} />
            </div>
        </div>
    );
};

export default DriveSection;