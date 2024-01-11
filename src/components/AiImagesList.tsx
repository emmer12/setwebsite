"use client";
import React, { useRef, useState } from "react";
import { Download, EditIcon, Save } from "./icons";
import { downloadImage, downloadPdf, saveImage } from "@/lib/api/ai.api";
import { parseError, parseSuccess } from "@/lib/utils";
import Button from "./Button";

const AiImagesList = ({
  uri,
  collection,
  saved = false,
  setEdit,
  setRequest,
}: {
  uri: string;
  collection?: string;
  saved?: boolean;
  setEdit: (uri: string) => void;
  setRequest: (uri: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(document.createElement("img"));

  const handleSave = async (url: string) => {
    if (loading) return;
    try {
      setLoading(true);
      let data = {
        url,
        collection_id: collection,
      };
      await saveImage(data);

      parseSuccess("Image Saved");
    } catch (err: any) {
      parseError(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[200px] border-b py-4 border-gray-200">
      <div className="actions absolute top-1 flex gap-2 right-1">
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
      <div className="sm:h-[160px] sm:w-[200px] shadow-lg">
        <img
          ref={imageRef}
          src={uri}
          alt="Generated Image"
          style={{ display: "none" }}
          className="h-full w-full object-cover"
          onLoad={() => (imageRef.current.style.display = "block")}
        />
      </div>
      <div className="absolute bottom-1 right-1 ">
        <Button
          onClick={() => setRequest(uri)}
          classNames="sm"
          text="Request Quote"
        />
      </div>
    </div>
  );
};

export default AiImagesList;
