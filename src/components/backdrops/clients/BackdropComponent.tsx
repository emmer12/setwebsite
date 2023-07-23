"use client";
import { getBackdrops } from "@/lib/api/backdrop.api";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Backdrop from "../Backdrop";
import { IBackdrop } from "@/types";
import { useSearchParams } from "next/navigation";

const BackdropComponent = () => {
  const [queryParams, setQueryParams] = useState("");
  const { data, error, isLoading } = useSWR(
    `/api/backdrops${queryParams}`,
    getBackdrops
  );

  const searchParams: any = useSearchParams();
  const cat = searchParams.get("category");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  useEffect(() => {
    cat && cat !== "all"
      ? setQueryParams(`?category=${cat}`)
      : setQueryParams(``);

    min && max && setQueryParams(`${`?min=${min}&&max=${max}`}`);
  }, [cat, min, max]);

  return (
    <div>
      <div className="em__header__filter">
        {/* {search} */}
        <span>
          Showing {data?.backdrops.length} of {data?.backdrops.length} Results{" "}
          {cat && cat !== "all" && <strong>({cat})</strong>}
        </span>
        <div>{/* <span>Default Sorting</span> */}</div>
      </div>
      <div className="em__main__body em_backdrop__grid">
        {isLoading ? (
          <span>Loading..</span>
        ) : data?.backdrops.length > 0 ? (
          data?.backdrops.map((backdrop: IBackdrop, i: number) => (
            <Backdrop backdrop={backdrop} key={i} />
          ))
        ) : (
          <div className="p-4 ">List of backdrops is empty</div>
        )}
      </div>
    </div>
  );
};

export default BackdropComponent;
