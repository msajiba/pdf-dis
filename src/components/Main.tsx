"use client"

import React, { useState } from 'react';
import FileUploadFromDrive from './FileUploadFromDrive';
import PageCanvas from './PageCanvas';

const Main = () => {

    const dummyURL = "https://drive.google.com/file/d/17mM8E6JZwEBAvS8ZUKQk3Ns9Z1x8UF8Y/view?usp=drive_web"

    const test = "https://drive.google.com/uc?id=1XBJeB3Wu-rwxx3UU2zcgLT_CaFvG2ply&export=download"

    const [url, setUrl] = useState<string>(test);

    return (
        <div>
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
        </div>
    );
};

export default Main;