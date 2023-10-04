"use client";
import { useRef, useState } from "react";
import DesignCard from "@/components/designs/DesignCard";
import Button from "@/components/Button";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { generateImage, getImage } from "@/lib/api/ai.api";
import Image from "next/image";
import AiImages from "@/components/AiImages";
import { ArrowRight, Close } from "@/components/icons";
import { NotificationManager } from "react-notifications";
import { parseError } from "@/lib/utils";
import Link from "next/link";
import Modal from "@/components/modal";
import QuoteRequest from "@/components/QuoteRequest";

enum ImgGenStatus {
  CREATING = "Creating",
  GENERATING = "Generating",
  COMPLETED = "Completed",
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [uri, setUri] = useState<string>("");
  const [images, setImages] = useState<string[] | undefined>(undefined);
  const [status, setStatus] = useState<ImgGenStatus | null>(null);
  const [collection, setCollection] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const promptRef = useRef<HTMLDivElement>(null);
  const promptBoxRef = useRef<HTMLDivElement>(null);

  type CatI = {
    label: string;
    value: string;
  };

  const [categories] = useState<CatI[]>([
    {
      label: "Cake Design",
      value: "cake",
    },
    {
      label: "Backdrop Design",
      value: "backdrop",
    },
    {
      label: "Exhibition Stand Design",
      value: "wedding",
    },
    {
      label: "Wedding Stage Design",
      value: "weddings-exhibitio",
    },
  ]);
  const [category, setCategory] = useState("");
  // const [category, setCategory] = useState("");
  const [mode, setMode] = useState("create");
  const { data: session } = useSession();

  const disabled = !!!prompt.length || !!!category.length;

  const maxRetries = 30;
  const generate = async () => {
    try {
      setLoading(true);
      if (disabled) return;
      const data: any = {
        category,
        prompt,
      };
      if (mode == "edit" && !!uri) {
        data.image = uri;
      }
      setStatus(ImgGenStatus.CREATING);
      const resG = await generateImage(data);
      setStatus(ImgGenStatus.GENERATING);
      setCollection(resG.data.id);
      const images: any = await fetchData(resG.data.id);
      if (!images) {
        NotificationManager.error(
          "Sorry, we couldn't generate the images",
          "Not Found"
        );
        return;
      }

      setStatus(ImgGenStatus.COMPLETED);
      setImages(images);

      clearData();
      if (promptBoxRef.current) {
        const offSetTop: any =
          window.innerHeight - promptBoxRef.current.offsetTop;
        window.scrollTo(0, offSetTop);
      }
      NotificationManager.success("Images generated!");
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (err: any) {
      parseError(err.response);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setPrompt("");
    setMode("create");
    setUri("");
  };

  const fetchData: any = async (id: string, retryCount = 1) => {
    try {
      const res = await getImage(id);
      const data = res.data;

      // Check if the data array has more than 1 element
      if (Array.isArray(data) && data.length > 1) {
        return data;
      }

      // If condition is not met, retry up to the maximum allowed retries
      if (retryCount < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return fetchData(id, retryCount + 1);
      } else {
        console.log("Maximum retries exceeded. No suitable data found.");
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const setEdit = (uri: string) => {
    setMode("edit");
    setUri(uri);
    if (promptRef.current) {
      const offSetTop: any = promptRef.current.offsetTop;
      window.scrollTo(0, offSetTop);
    }
  };

  return (
    <div>
      <div className="header flex justify-between">
        <h4 className="text-xl font-black">Write and get Designs Ai</h4>

        <Link href="account/ai/saved" className="flex gap-2 items-center">
          <span>Saved Images</span>
          <ArrowRight />
        </Link>
      </div>

      <div className="inline-flex bg-red-50 p-2 rounded my-4">
        <h1 className="font-bold mx-1">Points:</h1>
        <span>
          {session?.user.ai_points}
          <small>pts</small>{" "}
        </span>
      </div>

      <br />

      {images && (
        <div className="ai__box">
          <div className="grid grid-cols-2 gap-3" ref={promptBoxRef}>
            {images.map((image, i) => (
              <AiImages
                uri={image}
                setEdit={setEdit}
                collection={collection}
                key={i}
                setRequest={(uri) => {
                  setOpen(true);
                  setImageUrl(uri);
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="ai__prompt">
        <div className="em__header text-center">
          <h4>Select your design category and fill in your theme details</h4>
        </div>

        <div className="flex">
          {categories.map((cat) => (
            <div
              className={classNames("em__badge", {
                active: cat.value === category,
              })}
              onClick={() => setCategory(cat.value)}
              key={cat.value}
            >
              {cat.label}
            </div>
          ))}
        </div>
        {mode == "edit" && (
          <div
            className="h-[100px] w-[100px] my-3 relative"
            onClick={() => {
              setMode("creare");
              setUri("");
            }}
          >
            <div className="absolute top-[2px] right-[2px] cursor-pointer">
              <Close />
            </div>
            <img
              src={uri}
              alt=""
              className="rounded object-cover h-full w-full"
            />
          </div>
        )}
        <div ref={promptRef} className="field textarea h-[100px]">
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            name="overview"
            placeholder="Ai Prompt "
            rows={2}
          ></textarea>
        </div>

        <div className="flex items-center justify-center">
          <Button
            disabled={disabled || loading}
            loading={loading}
            text={status || "Generate"}
            onClick={generate}
          />
        </div>
      </div>

      <Modal size="small" open={open} close={() => setOpen(false)}>
        <QuoteRequest
          imageUrl={imageUrl}
          isPopup={true}
          close={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Page;
