import Button from "@/components/Button";
import Image from "next/image";
import RequestClient from "./RequestClient";

const getVendor = async (slug: string): Promise<any> => {
  const data = await fetch(`${process.env.BASE_URL}/api/vendors/${slug}`, {
    next: { revalidate: 10 },
  });
  const vendor = await data.json();

  console.log(vendor.VendorImage);

  return vendor;
};

interface PageProps {
  params: { slug: string };
}

const VendorDetailsPage = async ({ params }: PageProps) => {
  const data = await getVendor(params.slug);

  const reviews = [
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
  ];

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
                <div className="flex">
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

              <div className="grid grid-cols-3 gap-3 my-4">
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

              <div className="grid grid-cols-3 gap-3 my-4">
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

export default VendorDetailsPage;
