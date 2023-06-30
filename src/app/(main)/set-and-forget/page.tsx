"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const Backdrops = () => {
  const designs = useMemo(() => {
    return [
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
    ];
  }, []);

  const features = useMemo(() => {
    return [
      "Register 30 people to receive personalized design notifications from our AI-powered system.",
      "Free guide on opening a home-based event business, providing valuable insights and tips.",
      "A complimentary copy of one of our backdrop design production files, ready to be used in your next event.",
      "A free guide on opening a home-based event business",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Set and Forget
            <span>Streamline Your Event Planning with Effortless Elegance</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {designs.map((url, i) => (
                <div key={i} className="ai__images__grid">
                  <Image height={200} width={360} alt="Ai Designs" src={url} />
                </div>
              ))}
            </div>

            <div className="about__service my-5">
              <div className="mt-5">
                <p>
                  If you&#39;re anything like me, keeping track of family and
                  friends&#39; birthdays can be a challenge. The stress of
                  last-minute preparations and deciding on the perfect cake or
                  flowers can feel overwhelming. But worry no more! Introducing
                  our revolutionary &#34;Set and Forget&#34; feature, designed
                  to streamline your event planning experience with effortless
                  elegance. With this innovative tool, you can register your
                  loved ones&#39; birthdays and let our AI-powered system take
                  care of the rest. Imagine receiving timely reminders and
                  personalized recommendations for celebration ideas, including
                  stunning backdrop designs and beautiful cakes. Say goodbye to
                  the last-minute rush and embrace a hassle-free approach to
                  creating memorable moments. Subscribe now for only $100 and
                  experience the convenience of Set and Forget, making every
                  celebration a truly special one.
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
                <Button text="Subscribe" RightIcon={<ArrowRight />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
