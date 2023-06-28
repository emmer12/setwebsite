"use client";
import Button from "@/components/Button";
import Backdrop from "@/components/backdrops/Backdrop";
import { CaretRight } from "@/components/icons";
import VendorCard from "@/components/vendor/VendorCard";
import { getBackdrops } from "@/lib/api/backdrop.api";
import { IBackdrop } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";

const Backdrops = () => {
  const { data, error, isLoading } = useSWR("/api/backdrops", getBackdrops);

  const [reviews] = useState([
    {
      content:
        "My employee consistently delivers exceptional performance, demonstrating attention to detail, problem-solving skills, and effective collaboration. Their professionalism, reliability, and positive attitude make them a valuable asset to our organization. Highly recommended.",
      name: "Joe Stone",
    },
    {
      content:
        "Outstanding employee. Exceptional work. Reliable, detail-oriented, and collaborative. Valuable asset.",
      name: "Joe Stone",
    },
    {
      content:
        "Exceptional employee. Consistently delivers high-quality work with attention to detail. Strong problem-solving skills and effective team collaboration. Reliable, professional, and a valuable asset.",
      name: "Joe Stone",
    },
  ]);
  const [vendor] = useState({
    name: "Production Companies",
    imageUrl: "/assets/images/d1.png",
    link: "vendor/category/production-companies",
    location: "United Arab Emirates",
    services: "Service1 1,Service 2",
  });

  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            <span>Company Name</span>
          </h1>
        </div>
      </div>
      <div className="em__backdrops">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="">
              <section>
                <div className="flex">
                  <div className="display flex-1 sm:w-full/2 w-full">
                    <Image
                      src="/assets/images/d1.png"
                      height={400}
                      width={400}
                      className="w-full h-full"
                      alt="display images"
                    />
                  </div>
                  <div className="details flex-1 sm:w-full/2 w-full sm:p-6 p-3">
                    <div className="title">
                      <h2 className="text-2xl font-bold">About</h2>
                    </div>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam quos sapiente nisi earum? Possimus,
                        cupiditate magnam maxime deserunt nihil ipsa fuga
                        aperiam saepe qui. Voluptatum nihil provident ratione
                        sit cupiditate?
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam quos sapiente nisi earum? Possimus,
                        cupiditate magnam maxime deserunt nihil ipsa fuga
                        aperiam saepe qui. Voluptatum nihil provident ratione
                        sit cupiditate?
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section className="py-[50px] my-[50px] bg-[#fef9f5]">
          <div className="container">
            <div className="em__body__wrapper">
              <div className="title">
                <h2 className="text-2xl font-bold">Services</h2>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                {[1, 2, 4].map((_, i) => (
                  <div className="bg-white p-4" key={i + "services"}>
                    <h1 className="text-center text-4xl font-bold">{i + 1}</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic, impedit ut aspernatur consequuntur adipisci accusamus
                      nesciunt autem dignissimos voluptate illo, facere eaque
                      laboriosam suscipit eius obcaecati aperi
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="em__body__wrapper">
            <section>
              <div className="title">
                <h2 className="text-2xl font-bold">Our Work</h2>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                {[1, 2, 4].map((_, i) => (
                  <div className=" p-4" key={i + "services"}>
                    <Image
                      height={200}
                      width={300}
                      src="/assets/images/d1.png"
                      alt="Works images"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div>
                <div className="title">
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                <div className="flex my-4 flex-wrap">
                  <div className="social__list">
                    <h4>Website</h4>
                    <a href="" target="_blank">
                      example.com
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>Instagram</h4>
                    <a href="" target="_blank">
                      example.com
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>WhatApp</h4>
                    <a href="" target="_blank">
                      example.com
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>Email</h4>
                    <a href="mailto:example@mail.com">mail@example.com</a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col-reverse sm:flex-row  gap-4">
                <div>
                  <div className="em__comment__form">
                    <div
                      style={{ lineHeight: "20px" }}
                      className="em__header_2"
                    >
                      <h1 style={{ lineHeight: "20px", fontSize: "32px" }}>
                        Post A
                      </h1>
                      <span
                        style={{ lineHeight: "20px", fontSize: "52px" }}
                        className="em__fancy__text"
                      >
                        Review
                      </span>
                    </div>

                    <form action="" className="comment__form">
                      <div className="field textarea">
                        <textarea placeholder="" rows={3}></textarea>
                      </div>
                      <div className="field">
                        <input placeholder="Email Address" type="email" />
                      </div>
                      <div className="field">
                        <input placeholder="Fullname" type="text" />
                      </div>

                      <div
                        className="em__spacer"
                        style={{ height: "10px" }}
                      ></div>

                      <Button text="Submit" />
                    </form>
                  </div>
                </div>
                <div className="feedbacks">
                  <div style={{ lineHeight: "20px" }} className="em__header_2">
                    <span
                      style={{ lineHeight: "20px", fontSize: "52px" }}
                      className="em__fancy__text"
                    >
                      Reviews
                    </span>
                  </div>
                  {reviews.map((review, i) => (
                    <div key={i} className="em__related__blog__card">
                      <div>
                        <h4 className="font-bold my-2">{review.name}</h4>
                        <p>{review.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
