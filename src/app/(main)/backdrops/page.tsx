import Backdrop from "@/components/backdrops/Backdrop";
import BackdropCategoryComponent from "@/components/backdrops/clients/BackdropCategoryComponent";
import BackdropComponent from "@/components/backdrops/clients/BackdropComponent";
import React from "react";

const Backdrops = () => {
  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            All
            <span>Backdrops</span>
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

            <span>Backdrops</span>
          </div>
        </div>
      </div>
      <div className="em__backdrops">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="inner__wrapper">
              <div className="em__sidebar">
                <BackdropCategoryComponent />

                {/* <section>
                  <div className="em__tags">
                    <h4>Tags</h4>
                    <span className="em__tag">All /</span>
                    <span className="em__tag">Butterfly /</span>
                    <span className="em__tag">Graduate /</span>
                    <span className="em__tag">Wavey /</span>
                    <span className="em__tag">Stroke /</span>
                    <span className="em__tag">Balet /</span>
                    <span className="em__tag">Stroke /</span>
                    <span className="em__tag">All /</span>
                    <span className="em__tag">Balet /</span>
                  </div>
                </section> */}
              </div>
              <div className="em__body flex-1">
                <BackdropComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
