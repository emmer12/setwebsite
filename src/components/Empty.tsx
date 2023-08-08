import { formattedMoney } from "@/lib/utils";
import React from "react";
import Button from "./Button";
import { Plus } from "./icons";

interface IEmpty {
  msg: string;
  title?: string;
  type?: "requests" | "backdrops" | "any" | "quotes";
  link?: string;
  actionText?: string;
}

const Empty = ({ msg, title, link, actionText }: IEmpty) => {
  return (
    <div className="text-center h-[300px] flex items-center justify-center">
      <div>
        {title && <h4 className="text-lg font-bold">{title}</h4>}
        <p>{msg}</p>
        {link && (
          <Button to={link} text={actionText || "Create"} LeftIcon={<Plus />} />
        )}
      </div>
    </div>
  );
};

export default Empty;
