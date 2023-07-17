"use client";
import React, { FC } from "react";
import { Close, UploadCloud } from "./icons";
import Image from "next/image";

interface FileUI {
  name: string;
  placeholder: string;
  handleChange: (e: any) => void;
  handleRemove: (field: any) => void;
  type?: "video" | "image" | "file";
  file: any;
}

const FileUploader: FC<FileUI> = ({
  type = "image",
  placeholder,
  handleChange,
  handleRemove,
  name,
  file,
}) => {
  return (
    <div
      className="cursor-pointer min-w-[130px] bg-[#fffffe] border-dashed p-3 rounded-[18px] border h-[100px] relative flex items-center justify-center"
      style={{ borderTopRightRadius: "8px" }}
    >
      {file ? (
        <div className="relative">
          <div
            className="absolute top-0 right-0  z-50"
            onClick={() => handleRemove(name)}
          >
            <Close />
          </div>
          {type == "image" && (
            <Image
              style={{ width: "130px", height: "100px" }}
              height="100"
              className="rounded-[18px]"
              width="130"
              src={URL.createObjectURL(file)}
              alt="port"
            />
          )}

          {type == "video" && (
            <video height={100} width={130} src={URL.createObjectURL(file)} />
          )}
        </div>
      ) : (
        <label htmlFor={name}>
          <input
            onChange={handleChange}
            className="hidden"
            type="file"
            name={name}
            id={name}
          />
          <div className="flex flex-col items-center text-gray-300">
            <UploadCloud />
            <div>{placeholder}</div>
          </div>
        </label>
      )}
    </div>
  );
};

export default FileUploader;
