"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import "@uploadthing/react"

interface FileUploadProps {
    endpoint: "serverImage" | "messageFiles";
    value?: string;
    onChange?: (url: string) => void;
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    if (value) {
        return (
            <div className="w-full">
                <div className="relative mx-auto flex w-28 h-28 justify-center overflow-hidden">
                    <Image fill alt="Uploaded Image" src={value || ""} className="rounded-full" />
                <button className="absolute h-6 w-6 bg-rose-600 rounded-full cursor-pointer top-0 right-0" onClick={() => onChange && onChange("")}>
                    <X className="h-4 w-4 mx-auto" />
                </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    if (onChange) {
                        onChange(res?.[0].ufsUrl || "");
                    }
                }}
                onUploadError={(error: Error) => {
                    if (error.message ===  "Invalid config: FileSizeMismatch") {
                        toast.error("File size should be less than 4MB.");
                    } else if (error.message === "Invalid config: FileTypeNotAllowed") {
                        toast.error("File type not allowed. Please upload an image.");
                    } else {
                        toast.error("Upload failed. Please try again.");
                    }
                }}
            />
        </>
    )
}

export default FileUpload