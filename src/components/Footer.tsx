import Image from "next/image";
import React from "react";
import { Instagram, LinkedIn, Twitter } from "./icons";

const Footer = () => {
  return (
    <footer className="em__footer">
      <div className="container">
        <div className="em__body__wrapper flex-column">
          <div className="em__grid__2">
            <div className="em__footer__left">
              <div className="wrapper">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="69px"
                    height="77px"
                  >
                    <image
                      x="0px"
                      y="0px"
                      width="69px"
                      height="77px"
                      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABNCAQAAABa12HPAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBB4PBBmJiC0PAAAGMElEQVRo3u2aaWxUVRiGnzudaUtbuoFYQLEs2oIUxSAYIpZFJUaj0Sho6kpsGomK+sOIQQUSiRi3WEGJCzTEfWnciEqhArEqiGwiIC4UqYJQsGWplLavP5i2zL1n7kx7Z+YX7/lz5/vO993nnnvPuWfOuZYwyKLd7Od8JlLEEAaTgZuOcztf4EF+o/UkSA63cCljGBRVpp/5xgtIOJQ+TGAco7kYgGa2U4foxTnkhc3URIs3FGQvSSpTjdp1TO9qrPrIJ5+yVagSrVKzTNqq3sJLQcg6xVCoylPS71Wpkm0hWSrVZrU5UH5Sr1iiXKx1Hanb1KipYcIKtDweKFYHSoHWhySf4xI4QFU2lC3KjRVKD30Rknq/znQNzdePIfV3RqgfsfgRFgAzmRzyPC9mn+vzvosyFmPRDIgcDgTzeOjMFhZiBCU2T03E2HVMxKIVgBTE/ligwI22gewoB6KI/sfbyUPlA1rJ5Uqb/QiNsTxNtCgwKjiudqqF5sSjCMgLInUqPcLLL04oyQx02LPITzQKQiU6bninvONtlOh68QEBkg2MU7k20TeIME9FG/O5INEo2WE8hbzB6MSi+MJ6L6KC6xKJssNl1CzkVeaRmxAWITRd7qrSpYnoQRbQEIF3Eit4lVHxbhVLaKT+VWTV6ynlx69VTqL49FEUKJK0XQ8rM34oltANUaJI0lrdqNT4oaBKwyw+nJr0oS6IPUp7GabaLrSMdFCPKDs+KOj6LrRLeye/JD4oqKyLKNIuTYsPCirVvi7jzIwPCrpcP3QZZm58UNAAvaj/uggzKz4oCBXra+PcLrxK4oWCcnSb7a+ou3Z6HWnc3dmaobVRw7wWTxSEsvSANkWF0uptKhFdtd4q0+YoYCrkjzcKQmfqPu2KgHJQhYlAQWiQFumAK8wDiUJBaIq2uqAsSSQKGqqVYVGqlBIxfqDuNr3Tu3cFPbUiDMpfOjdi9FxJg2KFgtL0nRGlTZdFiMxQjeabPL5uzs6P8Si7DfYW0gzWVJIJkEoaqRRzIR+QThZZZJLUWclPd7WSKqY5rJbh4oqZxq800oM2mrmCbYyhmCQyyKCc372jwFvc7GgDGVarWtnAHo7TzCFymcl0lpNDM+mcwaGQ2G6XgKoNg/9Y15ibVK2A2dfdZwXgRGfjdqiWvS4RKdxPJSfMTi8oGFYxd1EXPDItHw2nlUXhknlDceofjgMwkS+515H9FjYG/TFHCRhaBaCIRYznflt2HxfxVvhkXlAsMm2WE1QHr34IUGnbN7udZja45PPQg/yOd9Em9RRCX+snXWmbu1yuOt3pls/LuFLkWAP/gMMAbGYYX3VYMzmP62hilWHHNYV8dpw89JPBEdsta4sSZbxtbfMQ7wWPnmYB3/MyW0lhOANpZQ3VPMYk3uyoHaA/ZzGM9E6UhTTQRnIQoI1s1vNCFCA+xtks5e1J2cNdzGAc53GYRt7lx2CbzWYAG/mPAJkM5gwOsTLoAyydMNykJ5gbEeUGXiPnlN87mMDfEWLO5mrSgMM00cCWYH9rlxqNL/vZER7ZPNug/6dGeugAwflKQ5hJ0ALluAQ+ZwO5xiuIG4pUpYnGoFTNCam3RZO8g7ijSEf0ukYrIySkSBUhNV5SXixAhKUGx5gZqibWU80GjmDRm2uZ3LEnsIPP+ITVUXX8KGSpidQuxrTSSgVL2M2eWGEA+KmnZxS1AsENz79ZxqfUsS3crMNLq8Q6Y7cV6/nKaZTTKAlBeZyPKOcOmz2NxcEPJl5mis2XRzXllDPEke1b5gN5POfYpS2mnBre5kFHzDVUsphnSUZLdZVxIF6qcqGhWuNYgJigj8MM3p9KGiy0TFkG78cab7D+oVuFMuX3Uc9dzOIcB+2TFADTWM2/Nk8t/XmcUkMbr+IhniGTnZiGq4bgty6hmkMJz9CbFh8WNbxPraPKdnZSRg/DX6hM/uI9lhnSDud5VvIZe40ntU5dN+jQEq5mI29ylY9+9CfXuEW5kFeoNyxdpDCEbAbR1+HpxwjK6cc8jhrynW3c57+HEr6nB72SZh8ln6EEOueYHdqP+NCwB72fXIoo4BfHJ0VH+Y1GPqeeVYaTHmNTyMrBSfVlMmNYytv/A8hL+X4qCn2fAAAAAElFTkSuQmCC"
                    />
                  </svg>
                </div>
                <div>
                  {/* <p>
                    Quis ipsum suspendisse ultrice s gravida. Risus commodo vive
                    rra maecenas offer accumsan.lacus vel facilisis.
                  </p> */}
                </div>
              </div>
              <div className="wrapper">
                <div className="em__footer__heading">
                  <h4>Contacts</h4>
                </div>
                <ul>
                  <li className="d-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <image
                        id="web"
                        width="16"
                        height="16"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABi0lEQVQ4jW3TTYjOURQG8J/XRxqfzZSFjxQbimZDs8FKCrFRykKzw0qJ7CxY2GIzKIUVO2VhR5ZmwUb5KEmWPsPM1Bjj1el93vr3fz11u/fce85zn3vOuQu6r55qYT/O4Si24RiuxuUmzmOyH9JpBd/AIzzGbxT7SbzEG3zAM1z6H8HDOH/H5RD1sQjXMB77Aq43Ce7hUNbFvh67WupOYzHuxD6Fi8W8FJvwJAf3sTHy5xsE5bcWE9iAhRirJK6OktnMv7CyFdzENJbFHioFD7A9G1+xJTL3DIRyN098jy6mimB35EjmS8UoRgbCexf9xXDskXKeazh8yjw7ENrDXG6eiT3VSYn6GM28YiC0hyUZQ7GXV/CRyKrxJ8kbT9bb+IJvKXn5dztpoPkkcDo5mIzdHNVgL6Luc/a7pWBVq+v25p3Vzm1sxmFcycG7uu1HStfHmUZTNVGlq3Eimz+xo9/Kb1P3aqKDWIPjLYLK1U5sxcfqwrq8/Z3X4XbW+/JHDuAWzuI1nkfFDPwDHAJhe0dprSAAAAAASUVORK5CYII="
                      />
                    </svg>
                    <span>UAE DUBAI AL Wasl</span>
                  </li>
                  <li className="d-flex">
                    <img src="/assets/icons/phone.svg" alt="Phone Icon" />
                    <a href="tel:+971558224410">+971558224410</a>
                  </li>
                  <li className="d-flex">
                    <img src="/assets/icons/envilop.svg" alt="Envelope Icon" />
                    <a href="mailto:info@setevents.co">info@setevents.co</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="em__footer__right">
              <div className="wrapper">
                <div className="em__footer__heading">
                  <h4>Get Social</h4>
                </div>

                <div className="em__footer__imgs">
                  <a href="https://www.instagram.com/setevents.co/">
                    <Instagram />
                  </a>
                  <a
                    href="https://twitter.com/seteventsco
                  "
                  >
                    <Twitter />
                  </a>
                  <a href="https://emea01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmariam-k-3aa5501b2&data=05%7C01%7C%7C130b96bf2c9d423667f608db6da41382%7C84df9e7fe9f640afb435aaaaaaaaaaaa%7C1%7C0%7C638224323681439500%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=TpFAIZSNCs8nd5F0nPrSEcglLwdQSlPoT4YUIU4OygA%3D&reserved=0">
                    <LinkedIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="em__spacer" style={{ height: "60px" }}></div>
          <div className="em__grid__2" style={{ alignItems: "center" }}>
            <div className="em__footer__left">
              <p>© 2022 Setevents. All right reserved.</p>
            </div>
            <div className="em__footer__right">
              <ul className="em__flex">
                <li>
                  <a href="">Terms of Services</a>
                </li>
                <li>
                  <a href="">private policy</a>
                </li>
                <li>
                  <a href="">Cookie policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="em__conversion" id="em__conversion">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="44"
          height="35"
          viewBox="0 0 44 35"
        >
          <image
            id="conversation"
            width="44"
            height="35"
            xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAjCAYAAADv0ujUAAAE1UlEQVRYhbWYfWjWVRTHP5v2ojk1ycotcxHTyiELyl6WYrn+yEyt8I/6owIpkEL/SWtEQRH2gv2XYARGUCijF9lEKbKwiGyUlSWoSa5MyzfKXOnc3Imz5zztdO/9PXv27NkXzsN97jn33HPPvfecc38VIkIZUQXcAywAZgKXZajuBXYDnwLvAh9FEllQg8tAY0XkBRE5KqXhOxF5qBg7yuHhhcBrwCVB/3ajr4DfgB5gFHAFcBNwAzAtGPMx8DDwUzRLHqlVDIJWB/48JCJPi8iVRepoFJE3Ah2nRWRRQraPoo5B0PpgoudEZHSJuqaJSGugb2lCrmSDW5ziUyLSlJAphZ4JjL5/qAZXi8izTuExEalLyA2FHgyMrhuswfUiskpEdojIGaeoV0SmJuTLQcvcPHuKNXiciKwrEKQeSIwpJ21ycz0+kMHz7cZ7HHPtDxJjyk3ni0inzac7O0oy4vCjwKtBPF0JrADusr7JwK9RjISLgduAyoiTjX+AVst+IXTel6zvMWBN6JV5gVdfdrwu69ua4ckLnEcGi7cT+vI6e0zXdu3znqgFNrn/S22FiiXAudZ+M/JDDhWah6LeoeFvYLNp0Mw4caRT12qTKpYDax2v0bW3ZpjQCUwB5gAjijS+0sZtiTj92OyO4s151ze5LdyW2JrPjPdLgjfc1OhsW5n38JNuRUuiNeYuEwWLkhy0mLm9hEvXAvwVcXI46NrVavBEYK51aLW0Lxigx2SMtU9G6vpRZTVuKbgXuCNjnM7ZBZyndqgnZjtmSySeQ/48VkScfpwFOqLe4lBo5yrcjol6uN4xv47Ec8bmPXthxO2Hbm1d38XIXbpUXCVY9AjT3R5J9WM8cI79O6EGT7I/vRnJADtHVwFTI87/0WPPnnKi1uk6MNLOhqLbzkoKu+2cX2QXa09CRnGjncWsS1dhYex14HjETaPB9e7SsLHGVV81GSFqsQstyxJ87F1XLFoS47MoH1I10/ZduoNu9Zcn15gL7Get/UjEzaHLokwxKFauBrjF2jqmU4/E907geuCLaFhuG9uARcB04Dp7XIYGzzV+VqartEtWKCp4+Pywru/XtjJfYLRnbIvStW67dyX45aZJbr6ded2VlmE2Og/PidaZwzfAW9a+Bnglkigvut0uHfhPs1k+063mvQKeqhKRbic7PyEzHK8OPQETfHnpq7ZC6VXP393uf5t9SBkutJlevRN3eg+vdV6bnlhpSM1B+GpOyJSDatwcG8S96Tqs88dggD7rxyQUKT0VGL3RLmZKdiDSOP+iiCwQkfGB7A7Tfzxv8Aw36fMiMkVEVthDU4P17yLyhIhMTkyqZ39fYPg7IrIwMXFItfZ1pz0Y/6eIvG88jRTLLakpZusjtBlYZWelI8jdHlonfAn8YB/3NO6etvq5PpKGE8C3wF7gKHDKStAaizINA1R/ijNW7l5tsqvV4L1WZYXotCqq3hXwA6G3QB2RhS77RrzBCqx5wCy7aCH2q8EnXYG+3z4ufwhsM8+MBe4zRQ2J9H3EvK5j1gOjgcVWZmrWU4/6RWgZ+jOwE/jEIsGhQKe+DW8Fmix7XppnqMEzjKHbrWk5q45V6Kr1m8QEa/9hk6kRKWi4rAbG2atbj4VWaYcHsQPqAK0nZgGf/wsF6qUQUb4L1gAAAABJRU5ErkJggg=="
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
