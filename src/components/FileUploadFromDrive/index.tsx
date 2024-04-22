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
            clientId: "62769356348-lvslpcvcoqo3qfv5jseufea6ajuhgh9u.apps.googleusercontent.com",
            developerKey: "AIzaSyD_El5LerrvZ_GsH9y4mv8exwRA7b42QIY",
            viewId: view,
            showUploadView: true,
            token:"ya29.a0Ad52N3_QOsw8pPkfpEt_vEx-cPIEg_5i-3y4YOvOCDeJ3Wyddj-hyUohLfpp3QptdYN7CgViLWDvTrkfcwPc2h9zkdIVjG_JDbH8D82H8jiJYiXCMHLKlF7LmeprPeh1AA4ioAW8GA_UVrCfqLEsGAPVXypgimD89iKuaCgYKATQSARASFQHGX2MiU3rte4m3D4uB43uWEJLD1g0171",
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
                    const url = data.docs[0].url
                    console.log(data);
                    
                    setValue(url);
                }
            },
        })
    }

    return (

        <div className={className}>
            <button
                className='border shadow-2xl p-2 rounded-lg text-white bg-blue-500'
                onClick={handleOpenPicker}>
                Pick form google
            </button>
        </div>

    );
};

export default FileUploadFromDrive;



