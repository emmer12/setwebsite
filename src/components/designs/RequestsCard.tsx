import Image from "next/image";
import React from "react";

interface IRCard {
  desc: string;
  deadline: string;
  display?: string;
  isOwner?: boolean;
}

const RequestCard = ({ desc, deadline, display, isOwner }: IRCard) => {
  return (
    <div className="my-3 shadow design-card">
      <div className="flex gap-3">
        <div className="display flex-shrink-0">
          <Image
            height={200}
            width={140}
            src={display || "/assets/images/designs.jpg"}
            alt="Designs"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl">{desc}</h4>
          <div className="bg-red-200 text-red-800 inline-block rounded-full px-3 py-1">
            <strong>Deadline: </strong>
            {deadline}
          </div>
        </div>
        <div className="self-center">
          {isOwner ? (
            <button className="em__button"> View Quotes</button>
          ) : (
            <button className="em__button"> Quote</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
