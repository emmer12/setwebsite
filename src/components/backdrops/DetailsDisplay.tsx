"use client";
import Image from "next/image";
import React, { useState } from "react";
import { A11y, FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const DetailsDisplay = ({ images }: { images: string[] }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {/* {items.map((_, i) => (
          <SwiperSlide key={i}>
            <Item />
          </SwiperSlide>
        ))} */}

        {images.map((image: string) => (
          <SwiperSlide key={image}>
            <Image alt="Backdrop image" src={image} height={400} width={400} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {/* {items.map((_, i) => (
          <SwiperSlide key={i + "thumb"}>
            <Item />
          </SwiperSlide>
        ))} */}

        {images.map((image: string) => (
          <SwiperSlide key={image + "slide"}>
            <Image alt="Backdrop image" src={image} height={400} width={400} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Item = () => (
  <div className="swiper-slide">
    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
  </div>
);
export default DetailsDisplay;
