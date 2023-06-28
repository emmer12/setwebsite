"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import VendorCategory from "@/components/vendor/Category";
import { ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const Backdrops = () => {
  const [categories] = useState<any>([
    {
      title: "Production Companies",
      imageUrl: "/assets/images/c7.png",
      link: "vendor/category/production-companies",
    },
    {
      title: "Event Planners",
      imageUrl: "/assets/images/c5.png",
      link: "vendor/category/event-planners",
    },
    {
      title: "Florists",
      imageUrl: "/assets/images/c1.png",
      link: "vendor/category/florists",
    },
    {
      title: "Cake Bakers",
      imageUrl: "/assets/images/c4.png",
      link: "vendor/category/cake-bakers",
    },
    {
      title: "Venues",
      imageUrl: "/assets/images/c8.png",
      link: "vendor/category/cake-bakers",
    },
  ]);

  const [countries] = useState([{ name: "United Arab Emirates", code: "AE" }]);

  const [category, setCategory] = useState("");

  const features = useMemo(() => {
    return [
      "Register up to 30 people on our set and forget feature, ensuring no birthday goes unnoticed.",
      "Enjoy the convenience of requesting quotes from suppliers for the designs you love using the set and forget feature.",
      "Access a whopping 50 AI-developed designs for backdrops each month, available for download in both JPG and PDF formats.",
      "Indulge in 50 AI-developed designs for cakes every month, delivered in high-quality JPG and PDF formats.",
      "Explore 50 AI-developed designs for exhibition stands per month, ready for download as JPG and PDF files once designed.",
      "Immerse yourself in 50 AI-developed designs for wedding stages every month, downloadable in JPG and PDF formats.",
      "Receive a complimentary copy of one of our backdrop design production files.",
      "Seamlessly obtain quotes for any design directly through our AI-powered quotation system, ensuring a quick response within 24 hours.",
      "Upload and Quote feature, allowing you to easily upload your design preferences, choose the desired category (backdrops, stands, events, cakes, or flowers), and receive quotations from registered suppliers.",
      "Enhance your design process with our free guide on developing prompts, providing insights into the best ways to generate exceptional designs using AI.",
      "Unlock the potential for a home-based business with our free guide on opening your own venture in the event industry.",
      "Our AI system analyzes uploaded pictures and generates diverse variations and themes based on your written request.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Discover
            <span> the Ultimate Event Connections Worldwide </span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="about__service my-5">
              <div className="mt-5">
                <p>
                  Easily find top-notch vendors in the event industry on our
                  Event Connections page. Select your country, explore
                  categories, and access a comprehensive list of suppliers. Each
                  listing leads to detailed profiles with services, portfolios,
                  testimonials, and contact information. Connect with the
                  perfect partners to bring your event vision to life. Unlock
                  exceptional event connections at your fingertips.
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  height={300}
                  width={300}
                  src="/assets/images/world.png"
                  alt="World Image"
                />
              </div>

              <div className="field">
                <select onChange={() => null} value={""} name="country">
                  <option value="">Select country</option>

                  {countries.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="my-4 block">
                Before exploring the categories below, choose the country you
                would like to search for suppliers.
              </p>

              <div className="my-4 flex items-center justify-center">
                <Button text="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fef9f6] pa-2 py-[50px]">
          <div className="container">
            <div className="em__body__wrapper">
              <div className="about__service">
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category: any, i: number) => (
                    <VendorCategory
                      key={i + "cat"}
                      title={category.title}
                      imageUrl={category.imageUrl}
                      link={category.link}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
