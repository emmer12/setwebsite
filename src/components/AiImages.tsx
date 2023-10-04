"use client";
import React, { useRef, useState } from "react";
import { Download, EditIcon, Save } from "./icons";
import { downloadImage, downloadPdf, saveImage } from "@/lib/api/ai.api";
import { parseError, parseSuccess } from "@/lib/utils";
import Button from "./Button";

const AiImages = ({
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
    <div className="relative min-h-[200px]">
      <div className="actions absolute top-1 flex gap-2 right-1">
        {!saved && (
          <div
            onClick={() => handleSave(uri)}
            className="bg-white p-2 rounded cursor-pointer"
          >
            <Save />
          </div>
        )}
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
      <img
        ref={imageRef}
        src={uri}
        alt="Generated Image"
        style={{ display: "none" }}
        onLoad={() => (imageRef.current.style.display = "block")}
      />
      {!saved && (
        <div className="absolute bottom-1 flex gap-2 right-1 left-1 justify-between">
          <div
            onClick={() => setEdit(uri)}
            className="bg-white p-2 rounded cursor-pointer bottom-1 flex gap-2 right-1"
          >
            <EditIcon />
          </div>
          <div className="position">
            <Button
              onClick={() => setRequest(uri)}
              classNames="sm"
              text="Request Quote"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AiImages;
