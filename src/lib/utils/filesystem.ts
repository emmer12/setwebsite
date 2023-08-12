import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { getFileExtension } from ".";

export const allowedFiles = {
  image: ["jpeg", "jpg", "gif", "png", "bmp"],
  doc: ["ppt", "pptx", "doc", "docx", "csv"],
  video: ["mp4", "mov", "avi", "webm", "html5"],
};

type moveI = {
  type: "image" | "video" | "doc";
  dir?: string;
  filename: string;
};

export const moveToAsset = ({ type = "image", dir, filename }: moveI) => {
  const assetPath = "src/assets";
  let temp: any, main: any, pathname: any;
  switch (type) {
    case "image":
      temp = `${path.join(`public/uploads/temp/${filename}`)}`;
      main = dir
        ? `${assetPath}/images/${dir}/${filename}`
        : `${assetPath}/images/${filename}`;
      pathname = dir ? `/images/${dir}/${filename}` : `/images/${filename}`;
      break;
    case "video":
      temp = `${path.join(`public/uploads/temp/${filename}`)}`;
      main = dir
        ? `${assetPath}/videos/${dir}/${filename}`
        : `${assetPath}/videos/${dir}/${filename}`;
      pathname = dir ? `/videos/${dir}/${filename}` : `/videos/${filename}`;
      break;
    case "doc":
      temp = `${path.join(`public/uploads/temp/${filename}`)}`;
      main = dir
        ? `${assetPath}/docs/${dir}/${filename}`
        : `${assetPath}/docs/${filename}`;
      pathname = dir ? `/doc/${dir}/${filename}` : `/doc/${filename}`;
      break;
    default:
      temp = `${path.join(`public/uploads/temp/${filename}`)}`;
      main = dir
        ? `${assetPath}/${dir}/${filename}`
        : `${assetPath}/${filename}`;
      pathname = dir ? `/${dir}/${filename}` : `/${filename}`;

      break;
  }

  fs.rename(temp, main, function (err) {
    if (err) throw err;
    console.log("file moved!");
  });

  return pathname;
};

export const storeTemp = (
  req: NextApiRequest,
  saveLocally?: boolean,
  type?: "image" | "video" | "doc"
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), `"public/uploads/temp"`);
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      const file: any = files.file;

      const allowedExtensions =
        type == "image"
          ? allowedFiles["image"]
          : type == "video"
          ? allowedFiles["video"]
          : allowedFiles["doc"];
      const fileExtension = getFileExtension(file.originalFilename);

      if (!allowedExtensions.includes(fileExtension))
        reject("File type not allowed");
      if (err) {
        clearTempFile();
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export const clearTempFile = () => {
  const fs = require("fs");
  const path = require("path");

  const folderPath = path.join(process.cwd(), `"public/uploads/temp"`);

  fs.readdir(folderPath, (err: any, files: any) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file: any) => {
      const filePath = path.join(folderPath, file);

      fs.unlink(filePath, (err: any) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("Deleted file:", filePath);
        }
      });
    });
  });
};
