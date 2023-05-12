"use client";
import React, { useState } from "react";
import { A11y, FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const DetailsDisplay = () => {
  const [items] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8]);
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
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
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

        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
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
