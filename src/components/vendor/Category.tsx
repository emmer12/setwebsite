import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICategory {
  title: string;
  imageUrl: string;
  link: string;
}

const VendorCategory = ({ title, imageUrl, link }: ICategory) => {
  return (
    <div className="em__v__category__card">
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
          <h4>{title}</h4>
        </div>

        <Link href={link} className="read__more">
          View
        </Link>
      </div>
    </div>
  );
};

export default VendorCategory;
