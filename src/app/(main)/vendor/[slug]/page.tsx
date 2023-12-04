import Button from "@/components/Button";
import Image from "next/image";
import RequestClient from "./RequestClient";
import ReviewForm from "./ReviewForm";
import { Star } from "@/components/icons";
import classNames from "classnames";

const getVendor = async (slug: string): Promise<any> => {
  const data = await fetch(`${process.env.BASE_URL}/api/vendors/${slug}`, {
    next: { revalidate: 10 },
  });
  const vendor = await data.json();

  return vendor;
};

interface PageProps {
  params: { slug: string };
}

const VendorDetailsPage = async ({ params }: PageProps) => {
  const data = await getVendor(params.slug);

  return (
    <div>
      {" "}
      <div className="em__banner relative">
        <div className="inner">
          <h1>
            <span>{data?.vendor?.company_name}</span>
          </h1>
        </div>

        <div>
          <RequestClient vendor={data.vendor} />
        </div>
      </div>
      <div className="em__backdrops">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="">
              <section>
                <div className="flex sm:flex-row flex-col">
                  <div className="display flex-1 sm:w-full/2 w-full">
                    <Image
                      src={
                        (data?.vendor.VendorImage.length > 0 &&
                          data?.vendor.VendorImage[0].url) ||
                        "/assets/images/d1.png"
                      }
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
                      <p>{data?.vendor?.company_overview}</p>
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                {data?.vendor?.services.map((service: string, i: number) => (
                  <div className="bg-white p-4" key={i + "services"}>
                    <h1 className="text-center text-4xl font-bold">{i + 1}</h1>
                    <p>{service}</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {data?.vendor?.VendorImage.length > 0 &&
                  data?.vendor?.VendorImage.map((image: any, i: number) => (
                    <div key={i + "img"}>
                      <Image
                        src={`${image.url}` || "/assets/images/d1.png"}
                        height={200}
                        width={300}
                        alt="Works images 1"
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
                      {data?.vendor?.website}
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>Instagram</h4>
                    <a href="" target="_blank">
                      {data?.vendor?.instagram}
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>WhatApp</h4>
                    <a href="" target="_blank">
                      {data?.vendor?.whatsapp_number}{" "}
                    </a>
                  </div>

                  <div className="social__list">
                    <h4>Email</h4>
                    <a href={`mailto:${data?.vendor?.company_email}`}>
                      {data?.vendor?.company_email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col-reverse sm:flex-row  gap-4">
                <ReviewForm id={data?.vendor?.id} />
                <div className="feedbacks w-full">
                  <div style={{ lineHeight: "20px" }} className="em__header_2">
                    <span
                      style={{ lineHeight: "20px", fontSize: "52px" }}
                      className="em__fancy__text"
                    >
                      Reviews
                    </span>
                  </div>

                  {data?.vendor?.Reviews.length < 1 ? (
                    <div>The vendor has no reviews.</div>
                  ) : (
                    data?.vendor?.Reviews.map((review: any, i: number) => (
                      <div key={i} className="em__related__blog__card w-full">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <h4 className="font-bold my-2">
                              {review.full_name}
                            </h4>

                            <div className="star__con  flex gap-2">
                              {Array.from(Array(5)).map((_, i) => (
                                <div
                                  key={i}
                                  className={classNames(" star__item sm", {
                                    filled: i + 1 <= review.rate,
                                  })}
                                >
                                  <Star />
                                </div>
                              ))}
                            </div>
                          </div>
                          <p>{review.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsPage;
