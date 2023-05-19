import ServiceCard from "@/components/ServicePrice";
import Link from "next/link";
import React, { useMemo } from "react";

const Backdrops = () => {
  const packages = useMemo(
    () => [
      {
        title: "Silver",
        description:
          "Quis ipsum suspendisse ultrice s gravida. Risus commodo vive rra maecenas accumsan lacus vel facilisis.",
        price: 1000,
        features: ["Feature 1", "Feature 2", "Feature 3"],
      },
      {
        title: "Gold",
        description:
          "Quis ipsum suspendisse ultrice s gravida. Risus commodo vive rra maecenas accumsan lacus vel facilisis.",
        price: 3000,
        features: ["Feature 1", "Feature 2", "Feature 3"],
      },
      {
        title: "Diamond",
        description:
          "Quis ipsum suspendisse ultrice s gravida. Risus commodo vive rra maecenas accumsan lacus vel facilisis.",
        price: 5000,
        features: ["Feature 1", "Feature 2", "Feature 3"],
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
