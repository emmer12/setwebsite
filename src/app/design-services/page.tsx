import ServiceCard from "@/components/ServicePrice";
import Link from "next/link";
import React, { useMemo } from "react";

const Backdrops = () => {
  const packages = useMemo(
    () => [
      {
        title: "Silver",
        description:
          "Under the Silver category, you'll have access to an entry-level designer who will provide you with one design option for the price of ($953)",
        price: 953,
        features: ["Entry level designer", "One design option"],
      },
      {
        title: "Gold",
        description:
          "In the Gold category, our mid-level designer will offer you two design options, with one design provided for free, You'll select one final design from the options provided. all for the price of ($1,580)",
        price: 1580,
        features: [
          "Mid level designer",
          "Two design option",
          "One design option provided for free",
          "Only one final design to be selected",
        ],
      },
      {
        title: "Diamond",
        description:
          "For our top-tier Diamond category, you'll work with a top-level designer who will present you with three design options and one additional free option , includes the selection of one final approved design. The package, priced at $2,445",
        price: 2445,
        features: [
          "Top level designer",
          "Three design options",
          "One additional free option",
          "Only one final design to be selected and approved",
        ],
      },
    ],
    []
  );

  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            Our
            <span>Designs Service</span>
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

            <span>Design Service</span>
          </div>
        </div>
      </div>
      <div className="em__backdrops">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="inner__wrapper">
              {packages.map((pack: any, i: number) => (
                <ServiceCard pack={pack} key={i} />
              ))}
            </div>

            <div className="p__tab mt-8">
              <div className="p__tab__item active">Product Information</div>
            </div>

            <div className="text-center p-7 w-full sm:w-1/2 mx-auto">
              <h4 className="font-black py-4 text-xl">
                About our Design Services
              </h4>
              <p>
                Welcome to our design services, where we offer a wide range of
                options to meet your specific needs. Choose from our three main
                categories: Silver, Gold, and Diamond, which cater to different
                budgets and requirements. Whether you&apos;re looking for
                cost-effective designs, a balance between affordability and
                premium features, or luxurious craftsmanship, we have you
                covered. Our expert team specializes in creating custom designs
                for backdrops, stands, booths, and exhibition stands, ensuring
                your brand&apos;s identity shines through. With our commitment
                to quality and customer satisfaction, your next event will leave
                a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
