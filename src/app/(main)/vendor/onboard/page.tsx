"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const OnboardPage = () => {
  const [category, setCategory] = useState("");

  const features = useMemo(() => {
    return [
      "Showcase your company's information on a dedicated profile page, featuring images of your work and comprehensive contact information.",
      "Benefit from free broad marketing on our social media channels, where potential clients will be directed to view vendors under our Event Connections section on our homepage.",
      "Engage, elevate, and connect with other members through our online vendor chat platform, fostering networking opportunities and collaborations.",
      "Join exclusive network gathering events to expand your connections and explore new business prospects.",
      "Receive a free guide on effective social media marketing strategies to enhance your online presence and reach a wider audience.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            <span>Amplify Your Reach and Boost Your Business</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="about__service my-5">
              <div className="flex justify-center">
                <Image
                  height={350}
                  width={350}
                  src="/assets/images/vendor.png"
                  alt="World Image"
                />
              </div>

              {/* <h4 className="text-center">
                <strong>
                  Introducing Dee Ultra: Unlock the Ultimate Design Experience!
                </strong>
              </h4> */}

              <div className="mt-5">
                <p>
                  Join our Vendor registration Subscription and discover a
                  revolutionary way to effortlessly connect with potential
                  clients. Bid farewell to expensive promotions and lead
                  generation struggles. With our subscription, you&#39;ll have
                  access to a range of features carefully designed to help you
                  grow your business. Showcase your company&#39;s portfolio with
                  brief photos of your work, and conveniently provide links to
                  your website, email, Instagram, and WhatsApp, making it easier
                  for clients to reach out to you. Increase your visibility and
                  unlock a world of opportunities with the power of our Vendor
                  Registration Subscription. See what the subscription includes:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 ">
              {features.map((feature, i) => (
                <FeatureList key={feature} text={feature} />
              ))}
            </div>

            <div className="about__service ">
              <p className="py-5">
                Subscribe now to our Vendor Registration Subscription and unlock
                a world of opportunities to amplify your business and connect
                with potential clients in a seamless and efficient manner.
              </p>

              <div className="text-center">
                <Button text="Subscribe" RightIcon={<ArrowRight />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardPage;
