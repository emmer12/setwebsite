import ServiceCard from "@/components/ServicePrice";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const Backdrops = () => {
  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            Our
            <span>Dee Designer</span>
          </h1>

          <div className="em__breadcrome">
            <Link href="/">Home</Link>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="8"
              height="5"
              viewBox="0 0 8 5"
            >
              <image
                id="right-arrow_34_copy"
                data-name="right-arrow (34) copy"
                width="8"
                height="5"
                xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAZElEQVQImVXNwQmCAByF8V/ivS081ghSl6QtnMFLIwQ5kAQ5gN1qjVxAAuUfCvkd3/ceb5Pl5QdX1NZUuCTocMPxzx/mwTPFGQ0e2GJEi3u4KAQFXujnwhunEHGxsMOAL/a/EBP9gRHwPbUJlQAAAABJRU5ErkJggg=="
              />
            </svg>

            <span>Dee Digital Designer</span>
          </div>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="dee__s__con flex gap-3">
              <div className="dee__s__card">
                <Image
                  src="/assets/images/ai.jpg"
                  height="200"
                  width="320"
                  alt="Dee Designer"
                />
                <h4>Backdrop and Stand Design</h4>
                <Link href="/checkout/backdrop-stand">
                  <button className="em__button">Subscribe</button>
                </Link>
              </div>
              <div className="dee__s__card">
                <Image
                  src="/assets/images/ai.jpg"
                  height="200"
                  width="320"
                  alt="Dee Designer"
                />
                <h4>
                  Set and Forget <br /> Feature
                </h4>
                <Link href="/checkout/set-forget">
                  <button className="em__button">Subscribe</button>
                </Link>
              </div>
            </div>

            <div className="p__tab mt-8">
              <div className="p__tab__item active">Product Information</div>
            </div>

            <div className="text-center p-3 sm:p-7 w-full sm:w-1/2 mx-auto">
              <h4 className="font-black py-4 text-xl">
                Subscribe to Dee Your Digital Designer
              </h4>
              <div>
                {" "}
                <p className="mb-2">
                  Welcome to Dee, your ultimate digital design assistant! Our
                  advanced AI algorithms make it easy and efficient to design
                  stunning backdrops, stands, and reminders for your special
                  events. With our customized solutions, you can create an
                  unforgettable experience for your guests without breaking the
                  bank or spending endless hours designing
                </p>
                <p>
                  Our services include two main categories: Backdrop and Stand
                  Design, and Set and Forget Feature. To access these services,
                  simply subscribe to Dee and start designing your perfect event
                  today! In our Backdrop and Stand Design category, our digital
                  designer will create unique designs based on your event&apos;s
                  theme, incorporating add-on elements like balloons, cakes, and
                  acrylics that fit the design. Our AI-powered algorithms
                  generate high-quality designs quickly and efficiently, saving
                  you time and money. In our Set and Forget Feature category,
                  our unique service allows you to input all the details of your
                  friends and family, including their birthdays and likes, into
                  a digital database. Dee will then use this data to generate
                  personalized event reminders that will be sent to your email
                  prior to the event. These reminders will include backdrop
                  designs that match the theme of the event and incorporate the
                  likes and preferences of your friends and family. When you
                  subscribe to Dee, you&apos;ll have access to a range of
                  benefits, including personalized event designs, efficient and
                  affordable solutions, and peace of mind knowing that your
                  event will be unforgettable. So, what are you waiting for?
                  Subscribe to Dee today and start designing your perfect event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
