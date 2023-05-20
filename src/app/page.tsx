import { BackdropRentals, Backdrops } from "@/components/backdrops";
import { Testimonies } from "@/components/testimonies";
import Image from "next/image";
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
                  in both captivating backdrop rentals and purchases, offering a
                  seamless blend of elegance and convenience. With our expertise
                  in event designs and revolutionary AI design technologies...
                </p>
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
              </div>
              <div className="em__hero__right">
                <img src="/assets/images/hero1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="em__hero__bottom">
        <div className="container">
          <BackdropRentals />
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
              We intricately craft experiences that transform dreams into
              reality. From stunning backdrop rentals to thoughtfully curated
              event designs, we create captivating atmospheres that leave a
              lasting impression. With the seamless fusion of artistry and
              innovation, we redefine what&apos;s possible, ensuring that
              extraordinary moments are born.
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
                <span className="em__fancy__text">Backdrop</span>
              </div>

              <Backdrops />
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
                  <img src="/assets/images/fast-delivery.png" alt="" />
                </div>
                <div className="step__details">
                  <h2>Free Shipping</h2>
                  <p>
                    Fast Service Experience our swift and efficient design
                    solutions, ensuring quick turnaround times and timely
                    delivery of your projects.
                  </p>
                </div>
              </div>
              <div className="step__item">
                <div className="step__icon">
                  <img src="/assets/images/refund.png" alt="" />
                </div>
                <div className="step__details">
                  <h2>100% Refund</h2>
                  <p>
                    100% Quality Rest assured knowing that our designs are
                    crafted with meticulous attention to detail and adhere to
                    the highest standards of quality, guaranteeing exceptional
                    results.
                  </p>
                </div>
              </div>
              <div className="step__item">
                <div className="step__icon">
                  <img src="/assets/images/technical-support.png" alt="" />
                </div>
                <div className="step__details">
                  <h2>Support 2/47</h2>
                  <p>
                    24/7 Support We provide round-the-clock assistance and
                    support, ensuring that you have access to our team whenever
                    you need guidance, answers, or help with your design
                    projects.
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
                    stroke-width="1px"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    fill="none"
                    d="M69.549,0.992 C69.549,0.992 -62.455,153.959 39.888,308.337 C74.290,354.514 53.477,258.924 38.90,328.108 C22.704,397.291 71.299,478.198 149.544,469.198 C227.789,460.197 294.936,459.685 304.140,459.313 C313.345,458.938 353.575,459.313 353.575,459.313 C353.575,459.313 462.268,571.300 278.974,595.12 "
                  />
                </svg>
                <div className="art_box"></div>
              </div>
              <div className="details">
                <div className="em__header left">
                  <h1>Our</h1>
                  <span className="em__fancy__text">Design</span>
                </div>

                <div>
                  <p>
                    Explore our design services with three main categories:
                    Silver, Gold, and Diamond. From cost-effective designs to
                    premium craftsmanship, we offer custom options for
                    backdrops, stands, booths, and exhibition stands. Make a
                    lasting impact at your next event with our quality-focused
                    approach and customer satisfaction guarantee.
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
              subscribe to Dee and input your friends and family&apos;s details
              to receive personalized event reminders and backdrop designs that
              match their preferences. With Dee, enjoy efficient and affordable
              solutions and create unforgettable events effortlessly. Subscribe
              today and start designing your perfect event hassle-free.
            </p>

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
