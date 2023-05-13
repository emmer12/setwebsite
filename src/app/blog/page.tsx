import { Courses } from "@/components/courses";
import Link from "next/link";
import React from "react";

const Blog = () => {
  return (
    <>
      <div className="em__banner blog">
        <div className="inner">
          <h1>
            <span>Our</span>
            Blog
          </h1>

          <div className="em__breadcrome">
            <a href="/">Home</a>

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

            <span>Blog</span>
          </div>
        </div>
      </div>

      <div className="em__blog__content">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__blog__body">
              <div className="em__blog_main">
                <div className="em__header_2">
                  <h1>Latest</h1>
                  <span className="em__fancy__text">Blogs</span>
                </div>

                <div className="em__latest__blog_card">
                  <div className="display">
                    <img src="/assets/images/blog.png" alt="" />
                  </div>
                  <div className="details">
                    <div className="at">
                      <h4>Joseph David</h4>
                      <span className="divide">|</span>
                      <span>24 Nov 2022</span>
                    </div>
                    <div className="title">
                      <h2>
                        Don’t waste another day endlessly scrolling social media
                        sea rc
                      </h2>
                    </div>
                    <p>
                      Don’t waste another day endlessly scrolling social media
                      searching for a location for your event. The truth is,
                      researching the vast amount of venue options in New
                      Hampshire can be daunting! Choosing the right place can be
                      the difference between simply having a ‘nice’ event.
                    </p>
                    <div className="read__more">Read more</div>
                  </div>
                </div>

                <div className="em__header_2">
                  <h1>Recent</h1>
                  <span className="em__fancy__text">Blogs</span>
                </div>

                <div className="em__grid__2">
                  <Link href="blog/this-slug" className="em__blog__card">
                    <div className="display">
                      <img src="/assets/images/blog2.png" alt="Blog Image" />
                    </div>

                    <div className="details">
                      <div className="at">
                        <h4>Joseph David</h4>
                        <span className="divide">|</span>
                        <span>24 Nov 2022</span>
                      </div>
                      <div className="title">
                        <h2>
                          Don’t waste another day endlessly scrolling social
                          media sea rc
                        </h2>
                      </div>

                      <div className="em__audio__card">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="17px"
                            height="20px"
                          >
                            <path
                              fill-rule="evenodd"
                              fill="rgb(255, 255, 255)"
                              d="M16.728,10.234 L0.288,19.749 L0.288,0.716 L16.728,10.234 Z"
                            />
                          </svg>
                        </button>
                        <div>
                          <div className="progress-con">
                            <div className="progress"></div>
                          </div>
                          <div className="time">
                            <span>0.00</span>|<span>0.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="em__blog__card">
                    <div className="display">
                      <img src="/assets/images/blog2.png" alt="Blog Image" />
                    </div>

                    <div className="details">
                      <div className="at">
                        <h4>Joseph David</h4>
                        <span className="divide">|</span>
                        <span>24 Nov 2022</span>
                      </div>
                      <div className="title">
                        <h2>
                          Don’t waste another day endlessly scrolling social
                          media sea rc
                        </h2>
                      </div>

                      <div className="em__audio__card">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="17px"
                            height="20px"
                          >
                            <path
                              fill-rule="evenodd"
                              fill="rgb(255, 255, 255)"
                              d="M16.728,10.234 L0.288,19.749 L0.288,0.716 L16.728,10.234 Z"
                            />
                          </svg>
                        </button>
                        <div>
                          <div className="progress-con">
                            <div
                              className="progress"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                          <div className="time">
                            <span>0.00</span>|<span>0.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="em__blog_side">
                <section className="about__section">
                  <h2>About Me</h2>

                  <div className="about">
                    <img src="/assets/images/owner.png" alt="About Author" />

                    <div>
                      <p>
                        Don’t waste another day endlessly scrolling social media
                        searching for a location for your event.
                      </p>
                    </div>
                  </div>
                </section>
                <div className="em__spacer" style={{ height: "10px" }}></div>
                <hr className="details" />
                <div className="em__spacer" style={{ height: "10px" }}></div>
                <section className="related__section">
                  <div className="title">
                    <h2>Related Blog</h2>
                  </div>

                  <div className="em__related__blog__card">
                    <div className="display">
                      <img src="/assets/images/blog3.png" alt="Blog Image" />
                    </div>
                    <div className="details">
                      <span className="date">21 Nov 2022</span>
                      <h4>Don’t waste another day endlessly</h4>
                      <div className="em_audio">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="10px"
                            height="11px"
                          >
                            <path
                              fill-rule="evenodd"
                              fill="rgb(255, 255, 255)"
                              d="M9.61,5.202 L0.720,10.30 L0.720,0.373 L9.61,5.202 Z"
                            />
                          </svg>
                        </button>
                        <div className="time">
                          <span>0.000</span>|<span>0.000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="em__related__blog__card">
                    <div className="display">
                      <img src="/assets/images/blog3.png" alt="Blog Image" />
                    </div>
                    <div className="details">
                      <span className="date">21 Nov 2022</span>
                      <h4>Don’t waste another day endlessly</h4>
                      <div className="em_audio">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="10px"
                            height="11px"
                          >
                            <path
                              fill-rule="evenodd"
                              fill="rgb(255, 255, 255)"
                              d="M9.61,5.202 L0.720,10.30 L0.720,0.373 L9.61,5.202 Z"
                            />
                          </svg>
                        </button>
                        <div className="time">
                          <span>0.000</span>|<span>0.000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="em__spacer" style={{ height: "10px" }}></div>
                <hr className="details" />
                <div className="em__spacer" style={{ height: "10px" }}></div>
                <section className="subscribe__section">
                  <div className="title">
                    <h2>Email Subscription</h2>
                  </div>
                  <div className="form">
                    <form action="">
                      <div className="field">
                        <input placeholder="Email Address" type="email" />
                      </div>
                      <div className="field">
                        <input placeholder="Fullname" type="text" />
                      </div>
                      <div className="field">
                        <input placeholder="Phone Number" type="number" />
                      </div>
                      <div
                        className="em__spacer"
                        style={{ height: "10px" }}
                      ></div>

                      <button className="em__button primary block">
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
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="our__course_section">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__header center">
              <h1>Our</h1>
              <span className="em__fancy__text">Courses</span>
            </div>

            <div>
              <Courses />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
