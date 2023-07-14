"use client";
import { useState } from "react";
import DesignCard from "@/components/designs/DesignCard";
import RequestCard from "@/components/designs/RequestsCard";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <div className="header">
        <h4 className="text-xl font-black">My Quotes</h4>
      </div>

      <RequestCard
        deadline={"June,3,2023 12:20"}
        desc="Quote Requests"
        isOwner={true}
      />
    </div>
  );
};

export default Page;
