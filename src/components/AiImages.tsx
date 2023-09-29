"use client";
import React, { useState } from "react";
import { Download, EditIcon, Save } from "./icons";
import { downloadImage, downloadPdf } from "@/lib/api/ai.api";

const AiImages = ({
  uri,
  setEdit,
}: {
  uri: string;
  setEdit: (uri: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className="actions absolute top-1 flex gap-2 right-1">
        <div className="bg-white p-2 rounded cursor-pointer">
          <Save />
        </div>
        <div className="relative">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="bg-white p-2 rounded cursor-pointer"
          >
            <Download />
          </div>
          {open && (
            <ul className="absolute bg-white rounded p-2 right-0 mt-2">
              <li
                onClick={() => downloadImage(uri)}
                className="block whitespace-nowrap p-1 cursor-pointer hover:bg-gray-100"
              >
                Download Image
              </li>
              <li
                onClick={() => downloadPdf(uri)}
                className="block whitespace-nowrap p-1 cursor-pointer  hover:bg-gray-100"
              >
                Download Pdf
              </li>
            </ul>
          )}
        </div>
      </div>
      <img src={uri} alt="Generated Image" />
      <div
        onClick={() => setEdit(uri)}
        className="bg-white p-2 rounded cursor-pointer absolute bottom-1 flex gap-2 right-1"
      >
        <EditIcon />
      </div>
    </div>
  );
};

export default AiImages;
