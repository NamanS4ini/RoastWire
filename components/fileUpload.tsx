"use client";

import { UploadButton } from "@uploadthing/react";

interface FileUploadProps {
    endpoint: "serverImage" | "messageFiles";
    value?: string;
    onChange?: (url: string) => void;
}

const FileUpload = ({endpoint, value, onChange}: FileUploadProps) => {
    return (
        <>
            
        </>
  )
}

export default FileUpload