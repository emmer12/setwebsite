"use client";
import { getBackdropCategories } from "@/lib/api/backdrop.api";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
("");
const BackdropCategoryComponent = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    "/api/backdrops/categories",
    getBackdropCategories
  );

  const [price, setPrice] = useState({
    min: 100,
    max: 800,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    debouncedHandleSliderChange(e);
  };

  const debouncedHandleSliderChange = React.useCallback(
    debounce((e: any) => {
      const { name, value } = e.target;
      // Perform the action that needs to be debounced here (e.g., send the request)
      const min = name == "min" ? value : price.min;
      const max = name == "max" ? value : price.max;

      router.push(`/backdrops?min=${min}&&max=${max}`);
    }, 1000), // 500ms delay before executing the debounced function
    [price]
  );

  return (
    <>
      <section>
        <div className="em__search">
          <input type="search" placeholder="Search here.." />
        </div>
      </section>
      <section>
        <div className="em__price">
          <h4>Price</h4>

          <div className="em__flex em__justify__between">
            <span>Your Range:</span>
            <span>
              $ {price.min}-{price.max}
            </span>
          </div>

          <div className="flex">
            <input
              id="steps-range"
              type="range"
              min={0}
              max={1000}
              onChange={handleChange}
              value={price.min}
              step={10}
              name="min"
              className="w-full h-2 bg-gray-200 rounded-lg rounded-tr-none rounded-br-none appearance-none cursor-pointer dark:bg-gray-700"
            ></input>

            <input
              id="steps-range"
              type="range"
              min={0}
              max={1000}
              value={price.max}
              onChange={handleChange}
              step={10}
              name="max"
              className="w-full h-2 bg-gray-200 rounded-lg rounded-tl-none rounded-bl-none appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
          </div>
        </div>
      </section>

      <section>
        <div className="em__categories">
          <h4>Categories</h4>
          <div
            className="em__category"
            onClick={() => router.push(`/backdrops?category=all`)}
          >
            All
          </div>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            data?.categories?.map((category: any) => (
              <div
                onClick={() =>
                  router.push(`/backdrops?category=${category.slug}`)
                }
                className="em__category"
                key={category.id}
              >
                {category.title}
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default BackdropCategoryComponent;
