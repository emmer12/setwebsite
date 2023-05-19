"use client";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper";
import Backdrop from "./Backdrop";
import Image from "next/image";
import Link from "next/link";

const Backdrops = () => {
  const [backdrops] = useState<any[]>([1, 2, 3]);
  const [swiper, setSwiper] = useState<any>(null);

  const categories = useMemo(() => {
    return [
      {
        title: "Backdrops",
        display: "/assets/images/backdrops.jpg",
        href: "backdrops",
      },
      {
        title: "Design Service",
        display: "/assets/images/designs.jpg",
        href: "design-services",
      },
      {
        title: "Events",
        display: "/assets/images/events.jpeg",
        href: "events",
      },
    ];
  }, []);

  const getClass = (i: number) => {
    return i == 0 ? "box-bl" : i == 1 ? "box-tr" : "box-tl";
  };

  return (
    <div className="em__categories grid grid-cols-3 gap-2">
      {categories.map((category, i) => (
        <div className="em__hb_items" key={i}>
          <div className={"box " + getClass(i)}>
            <Image
              src={category.display}
              height={300}
              width={240}
              alt={category.title}
            />
          </div>
          <div className="em__content">
            <h4>{category.title}</h4>
            <h5>AED</h5>
            <Link href={category.href}>Book Now </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Backdrops;
