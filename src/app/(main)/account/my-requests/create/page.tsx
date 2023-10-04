import { useState } from "react";
import QuoteRequest from "@/components/QuoteRequest";

const Page = () => {
  return (
    <div>
      <div className="header">
        <h4 className="text-xl font-black">Make a New Request</h4>
      </div>

      <div className="w-full sm:w-1/2">
        <QuoteRequest close={() => null} />
      </div>
    </div>
  );
};

export default Page;
