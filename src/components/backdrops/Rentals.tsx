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
        title: "Design Downloads",
        display: "/assets/images/hero/designs-n.png",
        href: "backdrops/overview",
      },
      {
        title: "Creative AI Studio",
        display: "/assets/images/hero/ai-create.png",
        href: "creative-ai-studio",
      },
      {
        title: "Event Connections",
        display: "/assets/images/hero/vendor.png",
        href: "vendor",
      },
    ];
  }, []);

  const getClass = (i: number) => {
    return i == 0 ? "box-bl" : i == 1 ? "box-tr" : "box-tl";
  };

  return (
    <div className="em__categories grid grid-cols-3 gap-4">
      {categories.map((category, i) => (
        <Link href={category.href} className="em__hb_items" key={i}>
          <div className={"box " + getClass(i)}>
            <Image
              src={category.display}
              height={712}
              width={850}
              alt={category.title}
            />
          </div>
          <div className="em__content">
            <h4>{category.title}</h4>
            {/* <h5>AED</h5> */}
            {/* <Link href={category.href}>Book Now </Link> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Backdrops;
