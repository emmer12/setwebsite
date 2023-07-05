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

const Backdrops = () => {
  const router = useRouter();

  const handleSub = (upgrade: boolean) => {
    try {
      if (upgrade) {
        localStorage.setItem(
          "aiSub",
          JSON.stringify({
            creative_ai_sub: true,
            creative_ai_sub_upgrade: true,
          })
        );
      }
      router.push("/checkout/creative-ai");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

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
                  Introducing Dee Ultra: Unlock the Ultimate Design Experience!
                  Upgrade now to Dee Ultra and access an array of powerful
                  features that will take your creative journey to new heights.
                  In addition to everything offered in the basic package, Dee
                  Ultra includes an enhanced set and forget feature system,
                  allowing you to register your friends and family&apos;s
                  birthdays. Experience the magic as Dee sends timely reminders
                  of their celebrations, along with recommended design backdrops
                  to make every occasion unforgettable. But that&apos;s not all!
                  With Dee Ultra, you&apos;ll also gain access to our innovative
                  quotation system. Get instant access to all our subscribed
                  vendors, empowering you to request quotes for your preferred
                  designs, cakes, flowers, and more within a swift 24 hours.
                  Take full control as you review each vendor&apos;s profile,
                  enabling you to choose the best quality and price that aligns
                  perfectly with your vision. Here&apos;s what you&apos;ll get
                  with the Dee Ultra upgrade:
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
                Upgrade to Dee Ultra today and witness the true capabilities of
                our Creative AI Studio. Prepare to be amazed as your creativity
                soars to extraordinary heights. Don&apos;t miss out on this
                exclusive opportunity—grab Dee Ultra now and let your
                imagination run wild!
              </p>

              <div className="text-center">
                <Button
                  onClick={() => handleSub(true)}
                  text="Upgrade"
                  RightIcon={<ArrowRight />}
                />
                <Button onClick={() => handleSub(true)} text="Skip" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
