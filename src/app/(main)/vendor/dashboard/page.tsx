"use client";

import { getLoggedInVendor } from "@/lib/api/vendor.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      My Profile Page
      {JSON.stringify(vendor)}
      <Image src={vendor?.image_1_path} alt="Image" height={200} width={200} />
    </div>
  );
};

export default Page;
