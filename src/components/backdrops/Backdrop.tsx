import { IBackdrop } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Backdrop = ({ backdrop }: { backdrop: IBackdrop }) => {
  return (
    <Link href={`/backdrops/${backdrop.slug}`}>
      <div className="em__backdrop_card">
        <div className="inner">
          <div className="display">
            <Image height={300} width={240} src={backdrop.imageUrl} alt="" />
          </div>
          <div className="details">
            <div>
              <h4>{backdrop.title}</h4>
              <h4>Backdrops</h4>
            </div>
            <div>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="99px"
                height="18px"
              >
                <path
                  fillRule="evenodd"
                  fill="rgb(248, 183, 154)"
                  d="M94.565,11.589 L95.370,17.998 L89.499,15.256 L83.629,17.998 L84.433,11.589 L80.1,6.875 L86.368,5.656 L89.499,0.0 L92.630,5.656 L98.998,6.875 L94.565,11.589 ZM75.370,17.998 L69.499,15.256 L63.629,17.998 L64.433,11.589 L60.1,6.875 L66.368,5.656 L69.499,0.0 L72.630,5.656 L78.998,6.875 L74.565,11.589 L75.370,17.998 ZM55.370,17.998 L49.499,15.256 L43.629,17.998 L44.433,11.589 L40.1,6.875 L46.368,5.656 L49.499,0.0 L52.630,5.656 L58.998,6.875 L54.565,11.589 L55.370,17.998 ZM35.370,17.998 L29.499,15.256 L23.629,17.998 L24.433,11.589 L20.1,6.875 L26.368,5.656 L29.499,0.0 L32.630,5.656 L38.998,6.875 L34.565,11.589 L35.370,17.998 ZM15.370,17.998 L9.499,15.256 L3.629,17.998 L4.433,11.589 L0.1,6.875 L6.368,5.656 L9.499,0.0 L12.630,5.656 L18.998,6.875 L14.565,11.589 L15.370,17.998 Z"
                />
              </svg>
            </div>
            {/* <div className="price">
              ADD {backdrop.price} <span>$777</span>
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Backdrop;
