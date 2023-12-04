"use client";
import Button from "@/components/Button";
import VendorCategory from "@/components/vendor/Category";
import Image from "next/image";
import { useState } from "react";
import QuoteRequest from "@/components/QuoteRequest";
import { useSession } from "next-auth/react";
import Modal from "@/components/modal";
import LoginComponent from "@/components/LoginComponent";

const Backdrops = () => {
  const [state, setState] = useState<string>("United Arab Emirates");
  const { status, data } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [openQ, setOpenQ] = useState<boolean>(false);

  const [categories] = useState<any>([
    {
      title: "Event Planners",
      imageUrl: "/assets/images/categories/event-planners.png",
      link: "vendor/category/event-planners",
    },
    {
      title: "Wedding Planners",
      imageUrl: "/assets/images/categories/wedding-planners.png",
      link: "vendor/category/wedding planners",
    },
    {
      title: "Cake Artists",
      imageUrl: "/assets/images/categories/cake.png",
      link: "vendor/category/cake-artists",
    },
    {
      title: "Production Companies",
      imageUrl: "/assets/images/categories/production-company.png",
      link: "vendor/category/production-company",
    },
    {
      title: "Venues",
      imageUrl: "/assets/images/categories/venues.png",
      link: "vendor/category/cake-bakers",
    },
    {
      title: "Photographers",
      imageUrl: "/assets/images/categories/photographer.png",
      link: "vendor/category/photographers",
    },
  ]);

  const [countries] = useState([{ name: "United Arab Emirates", code: "AE" }]);
  const [category, setCategory] = useState("");

  const handleQuote = () => {
    if (status == "authenticated") {
      setOpenQ(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Discover
            <span> the Ultimate Event Connections Worldwide </span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white vendor">
        <div className="container">
          <div className="em__body__wrapper mb-[50px]">
            <div className="w-full sm:w-1/2 m-auto">
              <div className="quote">
                <h2 className="font-bold p-3 text-xl">
                  Complete the form for instance quotes and seamless payments{" "}
                </h2>
              </div>

              <div>
                {/* <Button onClick={handleQuote} text="Request Quote" /> */}
              </div>
              <QuoteRequest
                redirectUrl="/account/my-requests"
                close={() => null}
              />
            </div>

            {/* <div className="about__service my-5">
              <div className="mt-5">
                <p>
                  Easily find top-notch vendors in the event industry on our
                  Event Connections page. Select your country, explore
                  categories, and access a comprehensive list of suppliers. Each
                  listing leads to detailed profiles with services, portfolios,
                  testimonials, and contact information. Connect with the
                  perfect partners to bring your event vision to life. Unlock
                  exceptional event connections at your fingertips.
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  height={300}
                  width={300}
                  src="/assets/images/world.png"
                  alt="World Image"
                />
              </div>

              <div className="field">
                <select
                  onChange={(e) => setState(e.target.value)}
                  name="country"
                >
                  <option value="">Select country</option>

                  {countries.map((country, i) => (
                    <option key={i} selected value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="my-4 block">
                Before exploring the categories below, choose the country you
                would like to search for suppliers.
              </p>

              <div className="my-4 flex items-center justify-center">
                <Button text="Search" />
              </div>
            </div> */}
          </div>
        </div>
        <div className="pa-2 registered__vendors">
          <div className="container">
            <div className="em__body__wrapper">
              <div className="em__header center">
                <h1>Registered</h1>
                <span className="em__fancy__text ">Vendors</span>
              </div>
              <div className="m-auto max-w-full w-[900px] p-[10px]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {categories.map((category: any, i: number) => (
                    <VendorCategory
                      key={i + "cat"}
                      title={category.title}
                      imageUrl={category.imageUrl}
                      link={category.link}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size="small" open={open} close={() => setOpen(false)}>
        <LoginComponent
          callback={() => {
            setOpen(false);
            setOpenQ(true);
          }}
          desc="kindly login to your account to send a quote request or Register"
        />
      </Modal>
    </div>
  );
};

export default Backdrops;
