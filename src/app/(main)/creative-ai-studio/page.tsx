"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { AngleLeft, AngleRight, ArrowRight } from "@/components/icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Grid, Autoplay } from "swiper";
import { useRouter } from "next/navigation";

const Backdrops = () => {
  const router = useRouter();
  const [categories] = useState<string[]>([
    "Cake Design",
    "Backdrop Design",
    "Exhibition Stand Design",
    "Wedding Stage Design",
  ]);

  const handleSub = () => {
    try {
      localStorage.setItem("aiSub", JSON.stringify({ creative_ai_sub: true }));
      router.push("/creative-ai-studio/upgrade");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

  const [category, setCategory] = useState("");
  const [swiper, setSwiper] = useState<any>(null);

  const designs = useMemo(() => {
    return [
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
      "/assets/images/ai-designs.png",
    ];
  }, []);

  const features = useMemo(() => {
    return [
      "A year-long subscription to Dee's Creative AI Studio.",
      "Enjoy 20 stunning backdrop designs per month. Download them as high-quality PDF and JPG images",
      "Delight in 20 exquisite cake designs every month. Downloadable in PDF and JPG formats.",
      "Explore 20 cutting-edge exhibition stand designs monthly. Download them as PDF and JPG images.",
      "Experience a new wedding stage design each month. Download the captivating designs in PDF and JPG formats.",
      "Receive a free guide on prompt writing, ensuring you always get the right designs tailored to your needs.",
      "Additionally, enjoy a complimentary guide on opening a home-based event business.",
      "Our AI system analyzes uploaded pictures and generates diverse variations and themes based on your written request.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Experience
            <span>Dee</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="relative">
              <Swiper
                spaceBetween={10}
                //   slidesPerView={"auto"}
                slidesPerView={4}
                slidesPerGroup={1}
                modules={[Autoplay, Navigation]}
                onSwiper={(swiper) => {
                  setSwiper(swiper);
                }}
                autoplay={{ delay: 2500 }}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
              >
                {designs.map((url, i) => (
                  <SwiperSlide key={i}>
                    <div key={i} className="ai__images__grid">
                      <Image
                        height={200}
                        width={360}
                        alt="Ai Designs"
                        src={url}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                onClick={() => swiper.slidePrev()}
                className="swiper-button-prev ai-btn-prev"
              >
                <AngleLeft />
              </div>
              <div
                onClick={() => swiper.slideNext()}
                className="swiper-button-next ai-btn-next"
              >
                <AngleRight />
              </div>
            </div>

            <div className="about__service my-5">
              <h4 className="text-center">
                <strong>Our Creative AI Studio</strong>
              </h4>

              <div className="mt-5">
                <p>
                  is where innovation meets imagination. Meet Dee, your Digital
                  Designer, the AI-powered genius behind stunning event
                  backdrops, exhibition stand concepts, and captivating wedding
                  stage designs. Say goodbye to the hassle of calling multiple
                  suppliers and the hours spent designing – let Dee work its
                  magic, offering you a wide variety of design options at a
                  fraction of the cost. Whether you&#39;re planning a birthday
                  celebration, engagement party, baby shower, or any special
                  event, Dee is here to create unique and personalized designs
                  that will leave a lasting impression. Are you tired of
                  compromising on quality or having limited options? Look no
                  further. Whether you&#39;re an event planner seeking
                  inspiration or an individual with a discerning taste for
                  excellence, our Creative AI Studio is your go-to destination
                  for remarkable designs that will exceed your expectations.
                  Subscribe now to unlock a world of endless possibilities and
                  let Dee transform your vision into breathtaking reality. Ready
                  to unleash your creativity? Give our AI designer a try below
                </p>
              </div>
            </div>

            <div className="ai__box"></div>

            <div className="ai__prompt">
              <div className="em__header text-center">
                <h4>
                  Select your design category and fill in your theme details
                </h4>
              </div>

              <div className="flex">
                {categories.map((cat) => (
                  <div
                    className={classNames("em__badge", {
                      active: cat === category,
                    })}
                    onClick={() => setCategory(cat)}
                    key={cat}
                  >
                    {cat}
                  </div>
                ))}
              </div>
              <div className="field textarea h-[100px]">
                <textarea
                  onChange={() => null}
                  value={""}
                  name="overview"
                  placeholder="Ai Prompt "
                  rows={2}
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <Button text="Generate" />
              </div>
            </div>
            <div className="text-center p-3 sm:p-7 w-full sm:w-1/2 mx-auto">
              <div>
                {" "}
                <p className="mb-2">
                  Subscribe now to Dee and unlock a world of endless
                  possibilities! Don&apos;t miss out on the best designs for
                  only $100 a year, Here&apos;s what you&apos;ll get with your
                  subscription:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 ">
              {features.map((feature, i) => (
                <FeatureList key={feature} text={feature} />
              ))}
            </div>

            <div className="about__service">
              <p>
                Subscribe now and let Dee transform your vision into
                breathtaking reality. Take the first step towards creating
                unforgettable events today!
              </p>

              <div className="text-center">
                <Button
                  onClick={handleSub}
                  text="Subscribe"
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

export default Backdrops;
