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
    <div className="my-3 shadow-sm  p-2">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="h-[100px] sm:h-[120px] w-[100px] sm:w-[120px] display flex-shrink-0">
          <Image
            height={120}
            width={120}
            src={request.imageUrl || "/assets/images/designs.jpg"}
            alt="Designs"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl my-1">{request.title}</h4>
          <div className="text-red-800 inline-block py-1 text-base">
            <strong>Deadline: </strong>
            {format(new Date(request.deadline), "yyyy-MM-dd HH:mm:ss")}
          </div>
        </div>
        <div className="self-end">
          {isVendor ? (
            <Button
              text="Submit Quote"
              to={`vendor/dashboard/quotes/create/${request.id}`}
            />
          ) : (
            <Button
              classNames="em__button sm"
              to={`account/my-requests/${request.id}/quotes`}
              text="View Quotes"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
