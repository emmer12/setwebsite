"use client";
import { formattedMoney } from "@/lib/utils";
import React from "react";

interface IPackage {
  title: string;
  description: string;
  price: number;
  features: string[];
}

const ServiceCard = ({ pack }: { pack: IPackage }) => {
  return (
    <div className="em__pricing__card">
      <div className="inner">
        <h1 className="package mb-4">{pack.title}</h1>
        <p>{pack.description}</p>
        <div className="em__flex ">
          <div className="price mt-6">
            <h2>{formattedMoney(pack.price)}</h2>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="58px"
              height="45px"
            >
              <path
                fillRule="evenodd"
                fill="rgb(251, 223, 199)"
                d="M33.2,45.0 L33.2,19.799 L46.930,19.799 C46.930,19.799 49.786,16.199 48.356,11.879 C46.930,6.121 39.788,5.39 39.788,5.39 L41.929,0.0 C41.929,0.0 57.999,2.157 57.999,19.441 L57.999,45.0 L33.2,45.0 ZM0.862,19.799 L14.789,19.799 C14.789,19.799 17.647,16.199 16.217,11.879 C14.789,6.121 7.646,5.39 7.646,5.39 L9.789,0.0 C9.789,0.0 25.859,2.157 25.859,19.441 L25.859,45.0 L0.862,45.0 L0.862,19.799 Z"
              />
            </svg>
          </div>
        </div>

        <button className="em__button">Select {pack.title}</button>
      </div>
      <hr />

      <div className="inner2">
        <ul>
          {pack.features.map((feature, i) => (
            <li key={i} className="flex gap-4 align-center text-base py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
              </svg>

              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
