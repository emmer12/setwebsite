"use client";

import Button from "@/components/Button";
import { ArrowRight, TimesCircle } from "@/components/icons";
import { getLoggedInVendor } from "@/lib/api/vendor.api";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { citiesUAE, countries, vendorCategories } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [sinput, setSInput] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    getLoginVendor();
  }, []);

  const getLoginVendor = async () => {
    try {
      setLoading(true);
      const res = await getLoggedInVendor();
      let vendor = { ...res.vendor };
      setVendor(vendor);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const removeService = (i: number) => {
    setServices((prev) => prev.filter((s, idx) => idx !== i));
  };

  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className=" bg-gray-50 p-4 rounded-[18px] rounded-br-[8px] relative">
            <div className="absolute top-4 right-4 cursor-pointer">
              <Link href="/vendor/dashboard/profile">Edit</Link>
            </div>
            <h1 className="text-xl font-bold">My Profile</h1>

            <div className="py-4 w-full max-w-full">
              <div className="flex items-center justify-between my-5 pointer">
                <strong>Company Name</strong>
                <span>{vendor?.company_name}</span>
              </div>
              <div className="flex items-center justify-between my-5 pointer">
                <strong>Approval Status</strong>
                <span>{vendor?.approval_status}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 rounded-[18px] rounded-br-[8px] bg-blue-200">
              <h1 className="text-xl font-bold">My Quote Requests</h1>

              <div>You have no request</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
