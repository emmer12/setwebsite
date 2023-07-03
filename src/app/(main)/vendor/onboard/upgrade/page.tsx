"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import { ArrowRight } from "@/components/icons";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const Backdrops = () => {
  const [categories] = useState<string[]>([
    "Cake Design",
    "Backdrop Design",
    "Exhibition Stand Design",
    "Wedding Stage Design",
  ]);
  const router = useRouter();

  const handleSub = (upgrade: boolean) => {
    try {
      if (upgrade) {
        localStorage.setItem(
          "vSub",
          JSON.stringify([{ vendor_sub: true, quote_sub: true }])
        );
      }
      router.push("/checkout/vendor");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

  const features = useMemo(() => {
    return [
      "Access to our revolutionary Quotation System: All clients subscribed to our Dee Digital Designer Ultra package can request quotations for AI-developed designs, including backdrops, event planning, cake development, and event flower decorations. With a simple click, an email request is sent to vendors as leads. Vendors have 24 hours to share quotes, allowing clients to contact them directly and proceed with their desired services.",
      "Quotations from Set and Forget Subscribers: Our Set and Forget system enables clients to register birthdays of their loved ones. AI generates backdrop designs tailored to the event, and clients can request quotations from vendors for production, cake creation, or other event-related services.",
      "Set and Event Collaboration: Vendors receive notifications of registered birthdays and can offer their services such as customized cake designs, floral arrangements, event planning suggestions, and unique gift options.",
      "Production File Quotations: Clients who purchase our backdrop and acrylic design production files can request quotations for production, event planning services, cake additions, or flower arrangements. Vendors can collaborate by sharing ideas, quotes, and add-ons based on the provided images.",
      "Free introductory promotion on Instagram: As a registered vendor, you will receive a complimentary promotion on our Instagram platform, reaching our wide client base.",
      "Showcase your company's information: Display your company's portfolio on a dedicated profile page, featuring images of your work and comprehensive contact information, allowing potential clients to learn more about your services.",
      "Free broad marketing: Benefit from free marketing on our social media channels, where interested clients will be directed to view vendors under our Event Connections section on our homepage.",
      "Engage and connect: Utilize our online vendor chat platform to engage, elevate, and connect with other members, creating networking opportunities and fostering collaborations.",
      "Exclusive network gathering events: Join exclusive events that bring together vendors and industry professionals, expanding your connections and exploring new business prospects.",
      "Free guide on effective social media marketing: Receive a comprehensive guide on leveraging social media platforms to enhance your online presence and reach a wider audience.",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Expand Your Reach,
            <span> Skyrocket Your Business Success</span>
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="about__service my-5">
              <div className="mt-5">
                <p>
                  Introducing Vendor Plus Subscription: Empowering Vendors to
                  Excel and Elevate Business Success! With our Vendor Plus
                  Subscription, vendors like you will gain exclusive access to a
                  range of remarkable features that will revolutionize your
                  business. First and foremost, enjoy the convenience of our
                  innovative Quotation System. Easily showcase your expertise by
                  providing quotes within 24 hours to our registered clients,
                  making it effortless for them to choose your services. But
                  that&#39;s not all! As a Vendor Plus subscriber, you&#39;ll
                  also have the unique advantage of connecting with our
                  registered clients who purchase our digital artwork. They can
                  request venue quotation, production services, event planning
                  assistance, or customized cakes and flower arrangements
                  directly from you. Expand your offerings, showcase your
                  creativity, and forge lasting relationships with clients
                  seeking your specialized services. Furthermore, Vendor Plus
                  provides you with an unparalleled opportunity to reach
                  potential clients through our Set and Forget feature. When our
                  AI designs personalized creations for their friends and
                  family, you&#39;ll receive alerts and the chance to send
                  offers for gifts, event options, cakes, flowers, and more. Let
                  your imagination soar as you serve your customers in unique
                  and memorable ways. See what the subscription includes:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 ">
              {features.map((feature, i) => (
                <FeatureList key={feature} text={feature} />
              ))}
            </div>

            <div className="about__service ">
              <p className="py-5">
                Join Vendor Plus Subscription today and unlock a world of
                endless possibilities. Collaborate, innovate, and exceed
                customer expectations like never before. Your business deserves
                nothing less.
              </p>

              <div className="text-center">
                <Button
                  onClick={() => handleSub(true)}
                  text="Upgrade"
                  RightIcon={<ArrowRight />}
                />
                <Button onClick={() => handleSub(false)} text="Skip" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
