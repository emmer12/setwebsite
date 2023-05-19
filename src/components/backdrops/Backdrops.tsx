"use client";
import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Grid } from "swiper";
import useSWR from "swr";
import Backdrop from "./Backdrop";
import { getBackdrops } from "@/lib/api/backdrop.api";

const Backdrops = () => {
  // const [swiper, setSwiper] = useState<any>(null);
  const { data, error, isLoading } = useSWR("/api/backdrops", getBackdrops);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {/* <Swiper
        spaceBetween={20}
        // slidesPerView={"auto"}
        slidesPerView={4}
        modules={[Navigation, Grid]}
        grid={{
          rows: 2,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {backdrops.map((_, i) => (
          <SwiperSlide key={i}>
            <Backdrop />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        onClick={() => swiper.slidePrev()}
        className="swiper-button-prev s1-btn-prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="10px"
          height="20px"
        >
          <path
            fillRule="evenodd"
            opacity="0.502"
            fill="rgb(31, 30, 28)"
            d="M0.353,10.730 L7.884,18.894 C8.363,19.413 9.139,19.413 9.618,18.894 C10.97,18.374 10.97,17.533 9.618,17.14 L2.955,9.790 L9.618,2.567 C10.97,2.48 10.97,1.206 9.618,0.686 C9.139,0.168 8.362,0.168 7.883,0.686 L0.353,8.850 C0.113,9.110 0.5,9.450 0.5,9.790 C0.5,10.130 0.114,10.471 0.353,10.730 Z"
          />
        </svg>
      </div>
      <div
        onClick={() => swiper.slideNext()}
        className="swiper-button-next s1-btn-next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="10px"
          height="20px"
        >
          <path
            fillRule="evenodd"
            opacity="0.502"
            fill="rgb(31, 30, 28)"
            d="M9.646,10.465 L2.115,18.634 C1.636,19.153 0.859,19.153 0.380,18.634 C0.98,18.114 0.98,17.271 0.380,16.752 L7.44,9.525 L0.381,2.297 C0.97,1.778 0.97,0.936 0.381,0.416 C0.859,0.102 1.636,0.102 2.115,0.416 L9.646,8.584 C9.885,8.845 10.5,9.184 10.5,9.525 C10.5,9.865 9.885,10.206 9.646,10.465 Z"
          />
        </svg>
      </div> */}

      {isLoading ? (
        <span>Loading..</span>
      ) : (
        data?.backdrops
          .slice(0, 8)
          .map((backdrop: any, i: any) => (
            <Backdrop key={i} backdrop={backdrop} />
          ))
      )}
    </div>
  );
};

export default Backdrops;
