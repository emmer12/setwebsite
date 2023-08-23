"use client";
import { useState } from "react";
import DesignCard from "@/components/designs/DesignCard";
import Button from "@/components/Button";
import classNames from "classnames";
import { useSession } from "next-auth/react";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [categories] = useState<string[]>([
    "Cake Design",
    "Backdrop Design",
    "Exhibition Stand Design",
    "Wedding Stage Design",
  ]);
  const [category, setCategory] = useState("");
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="header">
        <h4 className="text-xl font-black">Write and get Designs Ai</h4>
      </div>

      <div className="inline-flex bg-red-50 p-2 rounded my-4">
        <h1 className="font-bold mx-1">Points:</h1>
        <span>
          {session?.user.ai_points}
          <small>pts</small>{" "}
        </span>
      </div>

      <br />

      <div className="ai__box"></div>

      <div className="ai__prompt">
        <div className="em__header text-center">
          <h4>Select your design category and fill in your theme details</h4>
        </div>

        <div className="flex">
          {categories.map((cat) => (
            <div
              className={classNames("em__badge", {
                active: cat === category,
              })}
              onClick={() => setCategory(cat)}
              key={cat}
            >
              {cat}
            </div>
          ))}
        </div>
        <div className="field textarea h-[100px]">
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            name="overview"
            placeholder="Ai Prompt "
            rows={2}
          ></textarea>
        </div>

        <div className="flex items-center justify-center">
          <Button text="Generate" />
        </div>
      </div>
    </div>
  );
};

export default Page;
