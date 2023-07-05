"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const Backdrops = () => {
  const router = useRouter();

  const designs = useMemo(() => {
    return [
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
    ];
  }, []);

  const handleSub = (upgrade: boolean) => {
    try {
      if (upgrade) {
        typeof window !== "undefined" &&
          localStorage.setItem(
            "safSub",
            JSON.stringify({
              set_and_forget_sub: true,
              set_and_forget_sub_upgrade: true,
            })
          );
      }
      router.push("/checkout/set-and-forget");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

  const features = useMemo(() => {
    return [
      "Register up to 30 people on our set and forget feature, ensuring no birthday goes unnoticed.",
      "Enjoy the convenience of requesting quotes from suppliers for the designs you love using the set and forget feature.",
      "Access a whopping 50 AI-developed designs for backdrops each month, available for download in both JPG and PDF formats.",
      "Indulge in 50 AI-developed designs for cakes every month, delivered in high-quality JPG and PDF formats.",
      "Explore 50 AI-developed designs for exhibition stands per month, ready for download as JPG and PDF files.",
      "Immerse yourself in 50 AI-developed designs for wedding stages every month, downloadable in JPG and PDF formats.",
      "Receive a complimentary copy of one of our backdrop design production files.",
      "Seamlessly obtain quotes for any design directly through our AI-powered quotation system, ensuring a quick response within 24 hours.",
      "Enhance your design process with our free guide on developing prompts, providing insights into the best ways to generate exceptional designs using AI.",
      "'Upload and Quote' feature, allowing you to easily upload your design preferences, choose the desired category (backdrops, stands, events, cakes, or flowers), and receive quotations from registered suppliers.",
      "Unlock the potential for a home-based business with our free guide on opening your own venture in the event industry.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Upgrade to Dee Ultra
            <span>Unleash the Full Power of Creativity</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="about__service my-5">
              <h4 className="text-center">
                <strong>
                  Introducing Dee Ultra: Unlock the Ultimate Design Experience!
                </strong>
              </h4>
              <div className="mt-5">
                <p>
                  Upgrade now to Dee Ultra and access an array of powerful
                  features that will take your creative journey to new heights.
                  In addition to everything offered in the basic package, Dee
                  Ultra includes an enhanced set and forget feature system,
                  allowing you to register your friends and family&#39;s
                  birthdays. Experience the magic as Dee sends timely reminders
                  of their celebrations, along with recommended design backdrops
                  to make every occasion unforgettable. But that&#39;s not all!
                  With Dee Ultra, you&#39;ll also gain access to our innovative
                  quotation system. Get instant access to all our subscribed
                  vendors, empowering you to request quotes for your preferred
                  designs, cakes, flowers, and more within a swift 24 hours.
                  Take full control as you review each vendor&#39;s profile,
                  enabling you to choose the best quality and price that aligns
                  perfectly with your vision. Here&#39;s what you&#39;ll get
                  with the Dee Ultra upgrade:
                </p>
              </div>
            </div>
            <div className="text-center p-3 sm:p-7 w-full sm:w-1/2 mx-auto">
              <div>
                <h4 className="text-center">
                  <strong>
                    View what you&#39;ll get with your subscription:
                  </strong>
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 ">
              {features.map((feature, i) => (
                <FeatureList key={feature} text={feature} />
              ))}
            </div>

            <div className="about__service">
              <p>
                Experience the convenience and creativity of our subscription,
                empowering you to effortlessly manage your events and explore
                new business opportunities. Subscribe now and unlock a world of
                possibilities!
              </p>

              <div className="text-center">
                <Button
                  onClick={() => handleSub(true)}
                  text="Upgrade"
                  RightIcon={<ArrowRight />}
                />
                <Button onClick={() => handleSub(false)} text="Skip" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
