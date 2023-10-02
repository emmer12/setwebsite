"use client";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import AiImages from "@/components/AiImages";
import { savedImages } from "@/lib/api/ai.api";
import Empty from "@/components/Empty";
import { Loading } from "@/components/icons";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading } = useSWR("/api/ai", savedImages);

  return (
    <div>
      <div className="header flex justify-between">
        <h4 className="text-xl font-black">Saved Designs</h4>

        <Button text="Generate New" classNames="sm" to="account/ai/dee" />
      </div>

      <div>
        {isLoading ? (
          <Loading />
        ) : data?.images.length < 1 ? (
          <Empty title="Empty List" msg="You have no saved images" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3">
            {data?.images.map((images: any, i: number) => (
              <AiImages
                uri={images.url}
                key={i}
                saved={true}
                setEdit={() => null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
