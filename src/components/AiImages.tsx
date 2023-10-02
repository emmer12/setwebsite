"use client";
import React, { useState } from "react";
import { Download, EditIcon, Save } from "./icons";
import { downloadImage, downloadPdf, saveImage } from "@/lib/api/ai.api";
import { parseError, parseSuccess } from "@/lib/utils";

const AiImages = ({
  uri,
  setEdit,
  collection,
  saved = false,
}: {
  uri: string;
  setEdit: (uri: string) => void;
  collection?: string;
  saved?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="relative">
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
      <img src={uri} alt="Generated Image" />
      {!saved && (
        <div
          onClick={() => setEdit(uri)}
          className="bg-white p-2 rounded cursor-pointer absolute bottom-1 flex gap-2 right-1"
        >
          <EditIcon />
        </div>
      )}
    </div>
  );
};

export default AiImages;
