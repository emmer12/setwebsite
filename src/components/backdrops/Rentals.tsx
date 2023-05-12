"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper";
import Backdrop from "./Backdrop";

const Backdrops = () => {
  const [backdrops] = useState<any[]>([1, 2, 3]);
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={50}
        modules={[Navigation, A11y]}
        className="rental-swiper"
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        <SwiperSlide>
          <div className="em__hb_items">
            <div className="box box-bl">
              <img src="/assets/images/b1.png" alt="" />
            </div>
            <div className="em__content">
              <h4>BACKDROP RENTALS</h4>
              <h5>AED</h5>
              <a>Book Now </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="em__hb_items">
            <div className="box box-tr">
              <img src="/assets/images/b1.png" alt="" />
            </div>
            <div className="em__content">
              <h4>BACKDROP RENTALS</h4>
              <h5>AED</h5>
              <a>Book Now </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="em__hb_items box-tl">
            <div className="box box-tl">
              <img src="/assets/images/b1.png" alt="" />
            </div>
            <div className="em__content">
              <h4>BACKDROP RENTALS</h4>
              <h5>AED</h5>
              <a>Book Now </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="em__hb_items box-br">
            <div className="box box-tl">
              <img src="/assets/images/b1.png" alt="" />
            </div>
            <div className="em__content">
              <h4>BACKDROP RENTALS</h4>
              <h5>AED</h5>
              <a>Book Now </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Backdrops;
