import { BackdropRentals, Backdrops } from "@/components/backdrops";
import SBackdrops from "@/components/backdrops/BackdropSlide";
import { Testimonies } from "@/components/testimonies";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <>
      <div className="em__hero">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__flex">
              <div className="em__hero__left">
                <h2>
                  <span className="em__fancy__text">We</span> are an <br />
                  Events Company
                  <br />
                  <span className="em__fancy__text sp">Specializes</span>
                </h2>
                <p>
                  Welcome to Set Events, where imagination meets elegance.
                  Explore our Design Downloads for stunning design files,
                  unleash the creativity of our Creative AI Studio, or discover
                  a world of possibilities with our curated Event Connections
                </p>
                <a href="#about" className="em__button primary">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="19"
                    height="5"
                    viewBox="0 0 19 5"
                  >
                    <image
                      id="right-arrow_35_copy_2"
                      data-name="right-arrow (35) copy 2"
                      width="19"
                      height="5"
                      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAVElEQVQYla3QsQ1AUBhF4U+oTaFSSERjBBYxicQCljCJCaxhAQX5V3jPTW5zi5OTKzMbLhSBqVCiTmQ2aHFijmHH+0OP0BvQJZotGPFgyv1sxY0ePoJ2GONIaxKpAAAAAElFTkSuQmCC"
                    />
                  </svg>
                </a>
              </div>
              <div className="em__hero__right">
                <Image
                  height={400}
                  width={600}
                  alt="Hero Image"
                  src="/assets/images/hero/hero-bg.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="em__hero__bottom">
        <div className="container">
          <div className="em__body__wrapper">
            <BackdropRentals />
          </div>
        </div>
      </div>

      <div className="em__about__section" id="about">
        <div className="container">
          <div className="em__inner">
            <div className="em__header">
              <h1>About</h1>
              <span className="em__fancy__text">Set Events</span>
            </div>

            <p>
              We are a premier event platform, offering a seamless and
              unforgettable experience. With our diverse range of services,
              including Design Downloads for breathtaking backdrops and stands,
              a Creative AI Studio for personalized event designs, and Event
              Connections to connect you with top-notch vendors and planners, we
              have all you need to make your event exceptional. Experience the
              convenience of our &apos;Set and Forget&apos; feature, where you
              can subscribe and provide us with your family and friends&apos;
              birthdays, and let our advanced AI technology generate a variety
              of celebratory options, from captivating backdrops to delectable
              cakes. Let Set Events transform your event into a cherished memory
              that will last a lifetime.
            </p>
            <div className="bottom__about">
              <i>
                When artistry meets innovation, extraordinary moments unfold.
              </i>
            </div>
          </div>
        </div>
      </div>

      <div className="em__backdrop__section">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__inner">
              <div className="em__header h-b">
                <h1>Our</h1>
                <span className="em__fancy__text">Design Downloads</span>
              </div>

              <SBackdrops />
            </div>
          </div>
        </div>
      </div>

      <div className="em__step__container">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__step__row">
              <div className="step__item">
                <div className="step__icon">
                  <Image
                    height={60}
                    width={60}
                    src="/assets/images/fast-delivery.png"
                    alt=""
                  />
                </div>
                <div className="step__details">
                  <h2>Fast Service</h2>
                  <p>
                    Experience our swift and efficient design solutions,
                    ensuring quick turnaround times and timely delivery of your
                    projects.
                  </p>
                </div>
              </div>
              <div className="step__item">
                <div className="step__icon">
                  <Image
                    height={60}
                    width={60}
                    src="/assets/images/refund.png"
                    alt=""
                  />
                </div>
                <div className="step__details">
                  <h2>100% Quality</h2>
                  <p>
                    Rest assured knowing that our design systems are crafted
                    with meticulous attention to detail and adhere to the
                    highest standards of quality, guaranteeing exceptional
                    results.
                  </p>
                </div>
              </div>
              <div className="step__item">
                <div className="step__icon">
                  <Image
                    height={60}
                    width={60}
                    src="/assets/images/technical-support.png"
                    alt=""
                  />
                </div>
                <div className="step__details">
                  <h2>2/47 Support </h2>
                  <p>
                    We provide round-the-clock assistance and support, ensuring
                    that you have access to our team whenever you need guidance,
                    answers, or help with your design projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="em__our__design">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__flex">
              <div className="our__art">
                <img src="/assets/images/designs.png" alt="" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="387.5px"
                  height="596.5px"
                >
                  <path
                    fillRule="evenodd"
                    stroke="rgb(5, 5, 5)"
                    strokeWidth="1px"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fill="none"
                    d="M69.549,0.992 C69.549,0.992 -62.455,153.959 39.888,308.337 C74.290,354.514 53.477,258.924 38.90,328.108 C22.704,397.291 71.299,478.198 149.544,469.198 C227.789,460.197 294.936,459.685 304.140,459.313 C313.345,458.938 353.575,459.313 353.575,459.313 C353.575,459.313 462.268,571.300 278.974,595.12 "
                  />
                </svg>
                <div className="art_box"></div>
              </div>
              <div className="details">
                <div className="em__header left">
                  <h1>Our</h1>
                  <span className="em__fancy__text">Creative AI studio</span>
                </div>

                <div>
                  <p>
                    Experience the power of creativity. Meet Dee, your Digital
                    Designer, who will amaze you with stunning event backdrops,
                    exhibition stand concepts, and captivating wedding stage
                    designs. Say goodbye to the hassle of searching for the
                    perfect design and let Dee provide you with a variety of
                    options at an affordable cost. Whether you&apos;re planning
                    a birthday, engagement, baby shower, or any special event,
                    Dee will bring your vision to life. Subscribe now and unlock
                    a world of endless inspiration and remarkable design.
                  </p>
                </div>
                <div className="em__spacer" style={{ height: "20px" }}></div>
                <div className="em__our__action">
                  <button className="em__button primary">
                    Order Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="19"
                      height="5"
                      viewBox="0 0 19 5"
                    >
                      <image
                        id="right-arrow_35_copy_2"
                        data-name="right-arrow (35) copy 2"
                        width="19"
                        height="5"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAVElEQVQYla3QsQ1AUBhF4U+oTaFSSERjBBYxicQCljCJCaxhAQX5V3jPTW5zi5OTKzMbLhSBqVCiTmQ2aHFijmHH+0OP0BvQJZotGPFgyv1sxY0ePoJ2GONIaxKpAAAAAElFTkSuQmCC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="em__forget__section">
        <div className="container">
          <div className="wrapper">
            <div className="em__header h-f">
              <h1>Set &</h1>
              <span className="em__fancy__text">Forget</span>
            </div>

            <p>
              Unlock the convenience of our Set and Forget Feature! Simply
              subscribe and input your friends and family&apos;s details to
              receive personalized event reminders and backdrop designs that
              match their preferences. Enjoy efficient and affordable design
              solutions and create unforgettable events effortlessly.
            </p>
            <p>
              Subscribe today and start designing your perfect event
              hassle-free.
            </p>

            <Link href="/set-and-forget">
              <button className="em__button primary">
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="19"
                  height="5"
                  viewBox="0 0 19 5"
                >
                  <image
                    id="right-arrow_35_copy_2"
                    data-name="right-arrow (35) copy 2"
                    width="19"
                    height="5"
                    xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAVElEQVQYla3QsQ1AUBhF4U+oTaFSSERjBBYxicQCljCJCaxhAQX5V3jPTW5zi5OTKzMbLhSBqVCiTmQ2aHFijmHH+0OP0BvQJZotGPFgyv1sxY0ePoJ2GONIaxKpAAAAAElFTkSuQmCC"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="em__testimony__section">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__header center h-t">
              <h1>Our</h1>
              <span className="em__fancy__text">Testimonies</span>
            </div>

            <div className="em__inner">
              <Testimonies />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
