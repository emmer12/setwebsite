import React from "react";
import { DoubleCheck } from "./icons";

const FeatureList = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-4 align-center text-base py-3 f__items">
      <DoubleCheck />
      <span>{text}</span>
    </div>
  );
};

export default FeatureList;
