import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Location } from "../icons";

interface IVendor {
  vendor: {
    name: string;
    imageUrl: string;
    link: string;
    location: string;
    services: string;
  };
}

const VendorCard = ({
  vendor: { name, imageUrl, link, location, services },
}: IVendor) => {
  const color = [
    { bg: "#FFE5B4", color: "#263f61" },
    { bg: "#808080", color: "#fff" },
    { bg: "#253d5f", color: "#fff" },
  ];
  var randomIndex = Math.floor(Math.random() * color.length);
  return (
    <div className="em__vendor__card">
      <div className="display">
        <Link href={link}>
          <Image
            height={100}
            width={300}
            src={imageUrl || "/assets/images/c1.png"}
            alt="Category Image"
          />
        </Link>
      </div>
      <div className="details">
        <div className="title">
          <h4>{name}</h4>
        </div>
        <div className="flex items-center gap-4">
          <Location />
          <span>{location}</span>
        </div>

        <div className="py-4 p-2">{services}</div>

        <Link
          href={link}
          className={`py-2 px-3 rounded-lg mb-5`}
          style={{
            background: color[randomIndex].bg,
            color: color[randomIndex].color,
          }}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
