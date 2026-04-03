"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react"

interface FileUploadProps {
    endpoint: "serverImage" | "messageFiles";
    value?: string;
    onChange?: (url: string) => void;
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    if(value) {
        return (
            <div className="relative w-full h-48 rounded-md overflow-hidden">
                <Image fill alt="Uploaded Image" src={value || ""} className="object-cover" />
            </div>
        );
    }
    return (
        <>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    if (onChange) {
                        console.log(res?.[0].ufsUrl);
                        onChange(res?.[0].ufsUrl || "");
                    }
                }}
                onUploadError={(error:Error) => {
                    console.error("Upload error:", error);
                }}
            />
        </>
  )
}

export default FileUpload