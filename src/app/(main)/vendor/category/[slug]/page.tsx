"use client";
import Backdrop from "@/components/backdrops/Backdrop";
import { CaretRight } from "@/components/icons";
import VendorCard from "@/components/vendor/VendorCard";
import { getBackdrops } from "@/lib/api/backdrop.api";
import { IBackdrop } from "@/types";
import React, { useState } from "react";
import useSWR from "swr";

const Backdrops = () => {
  const { data, error, isLoading } = useSWR("/api/backdrops", getBackdrops);
  const [vendors] = useState([
    {
      name: "Production Companies",
      imageUrl: "/assets/images/d1.png",
      link: "/vendor/production-companies",
      location: "United Arab Emirates",
      services: "Service1 1,Service 2",
    },
    {
      name: "Event Planners",
      imageUrl: "/assets/images/d1.png",
      link: "/vendor/event-planners",
      location: "United Arab Emirates",
      services: "Service1 1,Service 2",
    },
    {
      name: "Florists",
      imageUrl: "/assets/images/d1.png",
      link: "/vendor/florists",
      location: "United Arab Emirates",
      services: "Service1 1,Service 2,Service 3",
    },
  ]);

  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            <span>Category Name</span>
          </h1>

          <div className="em__breadcrome">
            <a href="/">Home</a>
            <CaretRight />
            <span>Category</span>
          </div>
        </div>
      </div>
      <div className="em__backdrops">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {vendors.map((vendor: any, i: number) => (
                  <VendorCard vendor={vendor} key={i + "vendors"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
