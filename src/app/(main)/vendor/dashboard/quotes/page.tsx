"use client";
import { getLoggedInVendor } from "@/lib/api/vendor.api";
import { useEffect, useState } from "react";
import RequestCard from "@/components/designs/RequestsCard";

const Page = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [sinput, setSInput] = useState("");

  const [files, setFiles] = useState({
    image_1: null,
    image_2: null,
    image_3: null,
  });

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    setFiles((prev) => {
      return { ...prev, [e.target.name]: file };
    });
  };

  const handleRemove = (field: string) => {
    setFiles((prev) => {
      return { ...prev, [field]: null };
    });
  };

  useEffect(() => {
    getLoginVendor();
  }, []);

  const getLoginVendor = async () => {
    try {
      setLoading(true);
      const res = await getLoggedInVendor();
      setVendor(res.vendor);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h4 className="text-xl font-black">My Design Quote</h4>
      </div>

      <RequestCard deadline={"June,3,2023 12:20"} desc="Quote Requests " />
    </div>
  );
};

export default Page;
