"use client";
import Button from "@/components/Button";
import { EditIcon, Trash } from "@/components/icons";
import { deleteBackdrop, getAllBackdrops } from "@/lib/api/backdrop.api";
import { formattedMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { NotificationManager } from "react-notifications";

const Page = () => {
  const { data, error, isLoading } = useSWR(
    "/api/backdrops/admin",
    getAllBackdrops
  );

  const handleDelete = async (id: string) => {
    try {
      const conf = confirm("Are you sure?");
      if (conf) {
        await deleteBackdrop(id);
        NotificationManager.success("Post Deleted!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-3">
      {/*Page Header */}
      {/* Page Actions */}
      <div className="flex justify-between items-center py-5">
        <div>
          <h4 className="text-[24px]">Backdrops </h4>
        </div>
        <div>
          <Button text="Create New" to="/dashboard/backdrops/create" />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">Display</td>
                <td className="px-4 py-3">Title</td>
                <td className="px-4 py-3">Price</td>
                <td className="px-4 py-3">Created At</td>
                <td className="px-4 py-3">Actions</td>
              </tr>
            </thead>
            {isLoading ? (
              <div>Loading..</div>
            ) : data?.length < 0 ? (
              <div>Empty</div>
            ) : (
              <>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                  {data?.backdrops.map((backdrop: any, i: number) => (
                    <tr className="" key={i}>
                      <td className="px-4 py-3">
                        <Image
                          src={backdrop.imageUrl || ""}
                          height={100}
                          width={100}
                          alt="Backdrop Image"
                          className="rounded-[8px]"
                        />
                      </td>
                      <td className="px-4 py-3">{backdrop.title}</td>
                      <td className="px-4 py-3">
                        {formattedMoney(backdrop.price)}
                      </td>
                      <td className="px-4 py-3">{backdrop.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex">
                          <button
                            onClick={() => handleDelete(backdrop.id)}
                            className="px-4 "
                          >
                            <Trash />
                          </button>
                          <Link className="px-4 " href="">
                            <EditIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
