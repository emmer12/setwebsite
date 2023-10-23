import Button from "@/components/Button";
import { Instagram, LinkedIn, Twitter } from "@/components/icons";
import { sendContactMail } from "@/lib/mailer";
import React from "react";
import ContactFormClient from "./ContactFormClient";

const Contact = () => {
  return (
    <div className="container">
      <div className="em__body__wrapper">
        <div className="w-full sm:w-[80%] m-auto my-4">
          <div className="flex flex-wrap gap-[20px] sm:gap-[100px]">
            <div className=" sm:block">
              <div className="sm:bg-[#ffe3cd] w-full sm:w-[350px] p-3 sm:p-6  sm:min-h-[400px]">
                <div className="pt-[80px]">
                  <h2 className="text-3xl mb-4 sm:mb-[40px]">Get In Touch</h2>
                  <span className="block">UAE Dubai Al Wasl</span>
                  <div>
                    <a className="block" href="tel:+971558224410">
                      +971558224410{" "}
                    </a>
                    <a className="block" href="mailto:info@setevents.co">
                      info@setevents.co
                    </a>
                  </div>

                  <div className="flex gap-4 mt-3">
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
            <div className="flex-1">
              <div>
                <ContactFormClient />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
