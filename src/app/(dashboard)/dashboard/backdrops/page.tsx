import Button from "@/components/Button";
import { EditIcon, Trash } from "@/components/icons";
import Link from "next/link";
import React from "react";

const Backdrops = () => {
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
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              <tr className="">
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">Backdrop 1</td>
                <td className="px-4 py-3">200</td>
                <td className="px-4 py-3">20/2/2022</td>
                <td className="px-4 py-3">
                  <div className="flex">
                    <button className="px-4 ">
                      <Trash />
                    </button>
                    <Link className="px-4 " href="">
                      <EditIcon />
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Backdrops;
