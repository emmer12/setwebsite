"use client";
import { useState } from "react";
import DesignCard from "@/components/designs/DesignCard";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <div className="header">
        <h4 className="text-xl font-black">Create Quote</h4>
      </div>
    </div>
  );
};

export default Page;
