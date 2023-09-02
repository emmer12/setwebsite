import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import Button from "../Button";
interface IRCard {
  title: string;
  deadline: any;
  imageUrl?: string;
  id: string;
}

const RequestCard = ({
  request,
  isVendor,
}: {
  request: IRCard;
  isVendor: boolean;
}) => {
  return (
    <div className="my-3 shadow p-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] display flex-shrink-0">
          <Image
            height={150}
            width={140}
            src={request.imageUrl || "/assets/images/designs.jpg"}
            alt="Designs"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl">{request.title}</h4>
          <div className="bg-red-200 text-red-800 inline-block rounded-full px-3 py-1">
            <strong>Deadline: </strong>
            {format(new Date(request.deadline), "yyyy-MM-dd HH:mm:ss")}
          </div>
        </div>
        <div className="self-center">
          {isVendor ? (
            <Button
              text="Submit Quote"
              to={`vendor/dashboard/quotes/create/${request.id}`}
            />
          ) : (
            <button className="em__button"> View Quotes</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
