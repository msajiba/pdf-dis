"use client"

import React from 'react';
import useDrivePicker from 'react-google-drive-picker';


interface IProps {
    view?: "DOCS" | "DOCS_IMAGES" | "PDFS" | "FOLDERS" | "DOCUMENTS",
    multiselect?: boolean;
    className?: string;
    setValue: any;
}


const FileUploadFromDrive = ({
    view = "DOCS",
    multiselect = false,
    className = "convert-icon self-center flex items-center gap-2.5 mt-4 cursor-pointer",
    setValue
}: IProps) => {

    const [openPicker] = useDrivePicker();
    const handleOpenPicker = async () => {
        openPicker({
            clientId: "907467641037-qb7v086c64kea224kqkckejul94sqjfr.apps.googleusercontent.com",
            developerKey: "AIzaSyAT5PrNJ1lB5hDU3Op_Fn9tRI1rR4Z8t2k",
            viewId: view,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            setIncludeFolders: true,
            setSelectFolderEnabled: true,
            multiselect: multiselect,
            callbackFunction: async (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                if (data.action === "picked") {
                    const url = data.docs[0].embedUrl;
                    console.log(url)
                    setValue(url);
                }
            },
        })
    }

    return (

        <div className={className}>
            <button
                className='border shadow-2xl p-1 rounded-lg text-white bg-blue-500'
                onClick={handleOpenPicker}>
                Pick form google
            </button>
        </div>

    );
};

export default FileUploadFromDrive;



