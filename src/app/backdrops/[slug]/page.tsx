import { Backdrops, DetailsSlide } from "@/components/backdrops";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="em__backdrops__details">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__d__top">
              <div className="em__display">
                <div className="contain">
                  <DetailsSlide />
                </div>
              </div>
              <div className="em__content">
                <div className="inner">
                  <h2>Butterfly Wings Backdrops</h2>
                  <div className="reviews">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="73px"
                      height="15px"
                    >
                      <image
                        x="0px"
                        y="0px"
                        width="73px"
                        height="15px"
                        xlinkHref="data:img/png;base64,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"
                      />
                    </svg>
                    <span>55 reviews</span>
                  </div>

                  <div className="price">
                    <span className="c-price">AED 500</span>
                    <span className="o-price">AED 700</span>
                  </div>

                  <div className="date">
                    <h4>Date:</h4>
                    <input type="date" name="date" />
                  </div>
                  <div className="em__spacer" style={{ height: "30px" }}></div>

                  <hr className="details" />

                  <div className="em__spacer" style={{ height: "30px" }}></div>

                  <h4>Add-ons that go well this Backdrop</h4>
                  <div className="em__spacer" style={{ height: "4px" }}></div>

                  <button className="em__tab__button active">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="17"
                      height="19"
                      viewBox="0 0 17 19"
                    >
                      <image
                        id="flower"
                        width="17"
                        height="19"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAYAAAB2pebxAAADYklEQVQ4jWWUXWgcVRTHfzP3zs7szn42m26y6brbNgkB27Q++FHwQayIeZGKz2JBEH206LtW1Acf+qI0D1KxgiA+iYqiVImtSqAkL21q0DaVpjVpddck+zk7M1fuHaqC52E4DOee8z//c/7HUifexphtQRjBZhMsC/qDh2ltv45lHSZWTTLeBxSzJwlCGClAIQdhaJ5K7poChADbhk5vL82t80QxKAUWRVrBa1jWEN97C1vwX7P/TaJACsj70O7MGVQZF25sQLcPngt/7byIkJBLQxT+8/RukmeAZcLoCqXcc2T9G4RRZJBURiDtwTDUKBcoF+7Ftr9FsQqc1vh1O08BZxPYFmQz71GrnGPzz9uE0bgpYQGDIKRRLVPMLdIPfBOr1DSwTyM5ZQIdqQPh/BKU8kfZv2eEwRA2WtBqQy4DtcoTpD2fIEhidSJ4XCepmySag3wWXBcu/wK7yykYg40OrG9DvSGpjcI3P8GF5aSoMGz09HcNKZOeFy6CY8NWB768Asc24IsqvD8HMobTn0O7Cw8eTIjWhSEtUeppUGcp5iaZnUpxc9OmnYb7V+AlBe6zQAnkEvxWg8cOQ9BXdPshabcFzEu81DLD6AHWN98BnmRivExb030J3H1wJw+FWzDXgK/WYPFn8O2QYLiEsN9Aqc8kO70DrFw7Q7s7gxS+GeulNlQCOLYOo7rYGHx6ET5cgIwDJd+hkLsP29IjnhWvFicv0Nw+SM53iWPLcKPasDYKkQe5Jqz68MoibPXgnpGEi0JWkHLyCPGopDuYMlrY+AO22lAfh8mJRBGrh+CjH6F+HfZPQbMFlg1TdS0NDGpLTyfjrtMbQCYNjSo4Dmx3YU85YjIFcQBZCw7VQg5MY2Iv/wpxnIw4itM2tnjZbGvGS7Sz09EqXWRi923jz9TAd5O1bVS/Zlc+MDLoB1rpWl/fS4LgY3yvRH94AhWnEfYp9k5cRdifmK00SyW0CCXl0u/MNI5w8867DMMqnvMdo7tekGZ1hZhHRPN0Bja1Sky5+Dy9gUM6BSvXYLqR3JBB8Ajl4nGkPMIgsJBCaV6Se6Lb0T26TsxYWfvnzD8N+aFZSDmJr9QZc29024GlzCT/d080qRp+GF8FjhLFP1DKt3Cd68Txm8BJo2iNXhfVBvwNI6tKf4nhWrMAAAAASUVORK5CYII="
                      />
                    </svg>
                    Flowers
                  </button>

                  <button className="em__tab__button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                    >
                      <image
                        id="paint"
                        width="16"
                        height="18"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABxUlEQVQ4jZ1Tu44TQRCs6endtffWd+gI4IQAIQIkIj7hfoA/AIkI8RH8CIQkIAQBF/IHZEiIkACQhUGAz3jvZh+z3WgWn2zvGoRcyUhTXTXVMz3mzrN7RxzbQ1VFFzYiTD/PcTotYGPb4wF8ZY7t7aZRGNMjETw3+C5IAAYjnuUyAduLKgrT4akhVLVCfYOme4Jpi2q+dfnn/WsH1ZH3unZaqE8T4DUTPk4yXBgNISprBir6ig9vXHl3/XzS7smKQzDIYuAkT+B0jijKwRRD10O856v8ID0wN1uBYD0BAbh7yWM4f4Gn4+c4F+2BDK02wmSJSzWLnjbCYEBJV3gGx87PikYrCWaizUo8AwKjlhKV1D3lmQGRsQVUyx71f3BEsIVCq7+38E84UtVaVcvt9CjCzdQK2b4FheifO9gqg+OYdsEmKym8u4mW1MIv5RQpD6HY+CkKzv0EJ35QDilDI36pNwYRMaalwxf3rX3WsNczeDt7jB8GksYKL8uCdpQTxcsPMd6MBfs7u61JB55/la4dlMwK6mZZElavilM/gOgOCLSpje+cuxTjY3k4SppHMWFfFjUhgTWKgU3CwHfFYTSfAPj0G44xwn/7xKvEAAAAAElFTkSuQmCC"
                      />
                    </svg>
                    Acrylics
                  </button>

                  <button className="em__tab__button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                    >
                      <image
                        id="wedding-invitation"
                        width="18"
                        height="20"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAADj0lEQVQ4jYWUTYgcVRDHf++ju3dmemZnJ2vMGnFXEdGDNxFEUdiDYtCLRLypB8HLKl4U41EFPSnowYNBEAQVbzGCoB4UEdGsxkskbozmY8fsxt2d7Hz09Md7JT0zWRM0Woemu+vVv/5V71+l2msbTOxFEXlGAMX/m1KKwWCAiDwZBMH79mKEF5kLrK1XK1Pl+38CqTKVgiRJcM7tEhF2gESka4whDEO8c+OAaMeNKc8ALi1QWo/9asQ9KR/60kwlsvd+xEgiS3Fqleyr7yhW1+gc/ozh+iZEFu/86NylZscdubwUFQX4384wXDoAWxcw89cyWD5K59abmXv7dWxzGp+7y2K0m5pBai2UreSIv9gE/KlVZOUk7J5FpRnV6+cZLh8l/7OD0pPrkAJsnLnKHLq+8hL21Ef4tKMxwcTvMXfehn30EdSZVQRh6/gvzDz7NJWbFnD5OKGYGiTtonbmIOSHF2gfbCyd+OadjY1MJEkL6Q9SGYhIIiJbL7wix6vXyenX3pJMRAaFl0GSySB1cnJd5NgnB37dfLfxoC3C+TeHyi75sqxJuwRF6MAaiF5+HnvX7cT3L45ZeKEYCwClHM5xQ2KuOWTDRryEKAoXiRr7MUZxbm2djc0tqrMt7H2LtE+3SbZ77Nmzm+Z0HS9jURQ+KjNnVsdxZ26h0TxfLSQVqGijLI6zf5zjyPJPVKuVCVEhS3PuufsOZpsNUqUZetjV8sxWK0Mly/s3CfIZCvG91mMw/5DCoWIDZ9vrfPHl10RRNCpr372LNOIKvbJ8h/iVN2S6+FwzdF0lP+zfRNkZ3BZk5ylaD/h04Tmloppy/YxeqiAM0OmAuDYFUxrdOy3R76+K7n+rqSyQ931X7+jBTEO0gN04pKvHHsdsfS+6FsrV8cDPdd8rWq2qlCDB2se+8vMT6O4RTXgjEFGW8PcwjW5NQ3wLKm0r8+NTInsfRrmTio1Pre6dEJOFYtY+0DT3MgLx+c5UjEuDmdGXtfgsI+8laF0QmG0IG2CvgnwV8iFZ0RwlDOIayphRWNHvd8eMSskrTdHr44ZDbLWCqU6Da5aTDJKNwUJNqBRFr0fWuYCtVTFxXAoKW4pGnCPvdkYkw2YDZSwUxT8X0WTibb2ODlPyXh8p/5X7yKVps2RipiJsrTZmMNlHV7SiQIch0UxA3h/gkqRu3SD5MKjH+3SplX9jcSUrkyk16pUJ7PZfRtC/fIbEoxwAAAAASUVORK5CYII="
                      />
                    </svg>
                    Invitation
                  </button>

                  <button className="em__tab__button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                    >
                      <image
                        id="cake-slice"
                        width="19"
                        height="19"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAC6UlEQVQ4jZWUzYtcRRTFf7deva953W33DJp2hpFRXISowSSgLgKCGxHElS7ciP4NgoJZRVzoxn8gbhXJwoVudaNGQsCFJmIkkQSNds8sbGfoft9VJe91J86HGeJdVRXvnHvOPZcnOx+d439V0qP7649c++ErzpOfdEp9mIj62HOc0/fKIyII0rGiCqf9yjj7+lAH7647/+VbprqUK8c9kTU0VV2dCYPozQAp6snmVubJ8RPeEiez4NlNikuFdagDyH1qPOW9pJT6SUTeu/DzN4OtP68NzWR0/OEgYaPy2Mq234qdYcVyqLJHtNLv51X+ilYenajL6mAVSbqY/ir11avY2uE9+YyWx08NTZaOD5A550ji7jueDs9evPylrk3N6dOv8u2FT4n9iMfWniMLumAVcRiRPPF0P/PU57Ysn9qTpiAvBkH0wfe/fHes31lhsLLGeHSdzFQ82B+y3Luf679fAR1w4tTzTCZjLl/5mqNrR+klgxcUaQlpuUFanicrv6h3psdUVhNWMAwGbNy3jt3e4Ui4TI8IM83oGR872iT97QZRCR1iXFq8JtufffI2cBYIFzZtd6lHWZXkxYwgiIiCmFk2xdiaXtKnsT5N/5bAjyQOYjfNp+KcuyWT8UW3e2Rzu4vDHfvzu4jCCdRFhqlLEaUQ46CyzUeFVuPsL2B5F27v4fZdKbAWl6eIqfFFIRbskoeN2nOu5Y/c3yPjQDlQHlgD6QzPGJpVaRuUFtPTlI8mbXdNJ3J3J5PGG1RNSBmEGrywXZ+2mik3y9VY9QTNjZut/Ba0vxbWKIqFQrV3mKWBbggPrbV4TRg2Ee4TJHNgloGpIQw4OMXmyYD/795rjgx35diokTkwT2kb/Zfi21w1SNOnwbrmr1GXd4jaxIzDpTOoKvDmg75rNLXDJhq0gHU9bdfjZO5MYZ2lzmdgfPCiQ4nmAhzOX8zVyUgTqpuIPGCtaZfRNbKVfzjRbqvWgZGR0vqNfwBLBTofGL8NSgAAAABJRU5ErkJggg=="
                      />
                    </svg>
                    Cake
                  </button>

                  <div className="em__spacer" style={{ height: "10px" }}></div>

                  <div className="d_items">
                    <h1>Available Status:</h1>
                    <span>In Stock</span>
                  </div>
                  <div className="em__spacer" style={{ height: "10px" }}></div>

                  <div className="d_items">
                    <h1>Category:</h1>
                    <span>Baby Shower</span>
                  </div>

                  <div className="em__spacer" style={{ height: "10px" }}></div>

                  <div className="d_items">
                    <h1>Share:</h1>
                    <span>
                      <a href="">
                        <img
                          src="/assets/icons/facebook.png"
                          alt="Facebook icon"
                        />
                      </a>
                      <a href="">
                        <img
                          src="/assets/icons/twitter.png"
                          alt="Twiter Icon"
                        />
                      </a>
                    </span>
                  </div>

                  <div className="cart__wish">
                    <div className="cart__add">
                      <button className="minus">&#8722;</button>
                      <div className="input_con">
                        <input type="number" value="2" />
                      </div>
                      <button className="plus">&#43;</button>
                    </div>
                    <div className="wish"></div>
                  </div>

                  <div className="em__spacer" style={{ height: "20px" }}></div>

                  <hr className="details" />
                  <div className="em__spacer" style={{ height: "20px" }}></div>

                  <button className="em__button primary block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                    >
                      <image
                        id="shopping-cart-empty-side-view_1_copy_2"
                        data-name="shopping-cart-empty-side-view (1) copy 2"
                        width="24"
                        height="22"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAABtklEQVRIibXVO2tVQRDA8Z/xqvEJomlSqeAXEBEt1MJOCFqb2ipiLQqCIlhYGHxgJX4AwSLaKIKBEIgIGhRtggqKT7Tx+kLQhJWJHM+ee3JyQ/4w3Ls7s7M7szN74Bs+YAhrLQJn8QPTIRewdDE2GsCz2GRnpu2SVmHZTUziFXZgArtxOiL8gq8h7RjPSjtSXZZP5WO1IoIbMT5QSN185SeeLKkI/DN6sL4wl+yWYwVWYnVBVmFNFMi6kHTQM5nn4FacdKH8wXBPhZOJ+N2aaZpzPKK+UrViX0QwmGma8wa/RK7LPIrxrkzTjI3ox7U66xTBw2y2GUOxfnud9dO4pG54WSySqhQl7sYl9WaaetITswnXZ61aHczHcRQHcTs2m4t06sNhc3EO278l2m0H/y466hTBFI7gEh5jrCadRb7jTjbbgW0LuOh/1OX2BTbjZLwzabMtpajb0VStSM0G3MfVzFsFJ/C2lN/neB/yDh9L+vSCnspdVbMsHB2Lakqtv6dkORwR7Me9qL7G7I1T9cWK9P9yaXW61FQQifPzfYVTXkfxACN4HU1U5FB84VJjpXSd+0+LGX4Fg0q9zPoTAAAAAElFTkSuQmCC"
                      />
                    </svg>
                    Add to Cart
                  </button>
                  <div style={{ textAlign: "center" }}>
                    <strong>100% secure online checkout</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="em__pro__details">
              <div className="p__tab">
                <div className="p__tab__item active">product Infomation</div>
                <div className="p__tab__item">Reviews</div>
                <div className="p__tab__item">Another Details</div>
              </div>

              <div className="p__tab__body">
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classNameical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classNameical literature, discovered the
                  undoubtable source. Lorem Ipsum comes from sections 1.10.32
                  and 1.10.33 of de Finibus Bonorum et This book is a treatise
                  on the theory of ethics, very popular during the Renaissance.
                  The first line of Lorem Ipsum, Lorem ipsum dolor sit am comes
                  from a line in section 1.10.32.
                </p>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from de Finibus Bonorum by Cicero are also reproduced
                  in their exact original form, accompanied by English versions
                  from the 1914 translation by H. Rackham.
                </p>
              </div>
            </div>

            <div className="em__related_con">
              <div className="container">
                <div className="em__body_wrapper">
                  <div className="h__wrapper">
                    <div className="em__header">
                      <h1>Related</h1>
                      <span className="em__fancy__text">Products</span>
                    </div>
                  </div>

                  <div className="em__inner">
                    <Backdrops />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
