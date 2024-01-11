"use client";
import Button from "@/components/Button";
import AiImagesList from "@/components/AiImagesList";
import { savedImages } from "@/lib/api/ai.api";
import Empty from "@/components/Empty";
import { Loading } from "@/components/icons";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading } = useSWR("/api/ai", savedImages);

  return (
    <div>
      <div className="header flex justify-between mb-4 items-center">
        <h4 className="text-xl font-black">Dee Saved Images</h4>

        <Button text="Generate New" classNames="sm" to="account/ai/dee" />
      </div>

      <div>
        {isLoading ? (
          <Loading />
        ) : data?.images.length < 1 ? (
          <Empty title="Empty List" msg="You have no saved images" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 my-3">
            {data?.images.map((images: any, i: number) => (
              <AiImagesList
                uri={images.url}
                key={i}
                saved={true}
                setEdit={() => null}
                setRequest={() => null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
