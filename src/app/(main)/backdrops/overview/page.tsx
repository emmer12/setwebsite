import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

const Backdrops = () => {
  // const { data, error, isLoading } = useSWR("/api/backdrops", getBackdrops);

  return (
    <div>
      {" "}
      <div className="em__banner">
        <div className="inner">
          <h1>
            {/* Unleash Your Event&#39;s <br /> */}
            <p className="mt-3 text-center leading-10">
              Design
              <span>Downloads</span>
            </p>{" "}
          </h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className="em__main__body em_backdrop__grid">
              {/* {isLoading ? (
                <span>Loading..</span>
              ) : (
                data?.backdrops
                  .slice(0, 3)
                  .map((backdrop: IBackdrop, i: number) => (
                    <div className="backdrop__image" key={i}>
                      <Image
                        src={backdrop.imageUrl || "/assets/images/b1.png"}
                        height={240}
                        width={300}
                        alt="Backdrop Image"
                      />
                    </div>
                  ))
              )} */}

              <div className="backdrop__image">
                <Image
                  src={"/assets/images/Picture1.png"}
                  height={240}
                  width={300}
                  alt="Backdrop Image"
                />
              </div>
              <div className="backdrop__image">
                <Image
                  src={"/assets/images/Picture2.png"}
                  height={240}
                  width={300}
                  alt="Backdrop Image"
                />
              </div>

              <div className="backdrop__image">
                <Image
                  src={"/assets/images/Picture3.png"}
                  height={240}
                  width={300}
                  alt="Backdrop Image"
                />
              </div>
            </div>
            <div className="text-center my-6">
              <Link href="/backdrops">
                <Button text="View all" RightIcon={<ArrowRight />} />
              </Link>
            </div>
            {/* <div className="p__tab mt-8">
              <div className="p__tab__item active">
                About our Downloadable Designs
              </div>
            </div> */}

            <div className="text-center p-3 sm:p-7 w-full sm:w-1/2 mx-auto">
              <h4 className="font-black py-4 text-xl">
                About our Downloadable Designs
              </h4>
              <div>
                {" "}
                <p>
                  Step into the world of design and creativity with our
                  downloadable designs. As a passionate lover of design, I have
                  witnessed firsthand the joy that well-crafted backdrops and
                  event designs bring to clients. Along my journey, I have had
                  the pleasure of meeting incredibly talented designers, event
                  planners, and production companies, each with their own unique
                  touch. Inspired by their creativity, we wanted to share our
                  designs with the world and see how the creative minds out
                  there can incorporate our designs into their events. Whether
                  you&#39;re a client looking to add that special touch to your
                  celebration or an event planner seeking inspiration, our
                  designs are here to ignite your imagination. Join us in
                  spreading the joy of exceptional event setups and share your
                  incredible work with our clients. Our downloadable design
                  files are provided in PDF format, complete with production
                  artwork to assist you in bringing these designs to life.
                  Let&#39;s embark on a creative journey together and create
                  unforgettable moments for all to cherish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
