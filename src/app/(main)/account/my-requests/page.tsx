"use client";
import { useState } from "react";
import DesignCard from "@/components/designs/DesignCard";
import RequestCard from "@/components/designs/RequestsCard";
import Button from "@/components/Button";
import Empty from "@/components/Empty";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [requests] = useState([]);

  return (
    <div>
      <div className="header">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-black">My Quotes</h4>
          <Button text="Make a Request" />
        </div>
      </div>

      {loading ? (
        <>Loading</>
      ) : requests.length < 1 ? (
        <Empty
          actionText="Make Request"
          title="Empty Requires"
          link="/account/my-requests/create"
          msg="You have't make a request"
        />
      ) : (
        requests.map((_, i) => (
          <RequestCard
            key={i}
            deadline={"June,3,2023 12:20"}
            desc="Quote Requests"
            isOwner={true}
          />
        ))
      )}
    </div>
  );
};

export default Page;
