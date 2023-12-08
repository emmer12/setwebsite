"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const OnboardPage = () => {
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSub = () => {
    try {
      typeof window !== "undefined" &&
        localStorage.setItem("vSub", JSON.stringify({ vendor_sub: true }));
      router.push("/vendor/onboard/upgrade");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

  const features = useMemo(() => {
    return [
      "Bank Certificate: This should bear the company's name & Bank account Details.Personal bank accounts will not be accepted.",
      "PDF copy of Business License.",
      "Company Bio Text: A brief company bio that will be displayed on your profile. ( Showcase the companies offerings venue spaces indoor and outdoor information and price per person.",
      "email of the person who will receive & Respond to leads.",
      "Photos and Videos: Showcase your work or venue. High-quality visuals can significantly enhance your profile.",
      "Once you have gathered all these necessary documents, click the 'Register' button and complete the form. Our team will promptly review your submission and, upon approval, send you an agreement document.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1 style={{ lineHeight: "40px" }}>
            Join Our Vendor Network & Expand Your <span> Business</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className=" my-5">
              <h4 className="text-xl font-bold mb-5">
                Vendors Applicable to Register:
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/2">
                  <ul>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded mb-2">
                      Cake Bakery Artist
                    </li>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded mb-2">
                      Event Planners
                    </li>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded mb-2">
                      Wedding Planners
                    </li>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded mb-2">
                      5 Star Hotels & Venues with Event Halls{" "}
                    </li>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded my-2">
                      Production Companies{" "}
                    </li>
                    <li className="text-white bg-[#263f61] text-center p-3 rounded my-2">
                      Event Photographers
                    </li>
                  </ul>
                </div>
                <div className="w-full sm:w-1/2">
                  <video
                    autoPlay={true}
                    loop
                    controls
                    src="https://static.vecteezy.com/system/resources/previews/023/607/690/mp4/vdo-mp4-helix-human-dna-3-d-rendering-video.mp4"
                  ></video>

                  <div className="f__items">
                    Watch this informative video to learn how joining our Vendor
                    Network can transform your business. Discover the benefits
                    of registration, explore the six categories applicable for
                    vendors, and see how our platform can help you connect with
                    more clients, receive leads, send quotes, and get payments –
                    all in one convenient system. Don&lsquo;t miss out on this
                    opportunity to expand your business and boost your success!
                  </div>
                </div>
                {/* <Image
                  height={350}
                  width={350}
                  src="/assets/images/vendor.png"
                  alt="World Image"
                /> */}
              </div>

              <div className="text-center my-5">
                <h4 className="font-bold text-2xl">
                  <strong>Registration Requirements</strong>
                </h4>
                <p>
                  Before you proceed to fill out the registration form, please
                  ensure you have the following documents ready:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 ">
              {features.map((feature, i) => (
                <FeatureList key={feature} text={feature} />
              ))}
            </div>

            <p className="my-3">
              We look forward to welcoming you to our Vendor Network!
            </p>

            <div className="about__service text-center ">
              <p className="py-5  font-bold">More Clients, Leads, and Orders</p>

              <div className="text-center">
                <Button
                  to="/vendor/register"
                  text="Register"
                  RightIcon={<ArrowRight />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardPage;
