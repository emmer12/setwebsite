import Button from "@/components/Button";
import { EditIcon, Trash } from "@/components/icons";
import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div className="bg-white p-3">
      {/*Page Header */}
      {/* Page Actions */}
      <div className="flex justify-between items-center py-5">
        <div>
          <h4 className="text-[24px]">All Users </h4>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">S/N</td>
                <td className="px-4 py-3">Full name</td>
                <td className="px-4 py-3">Email Address</td>
                <td className="px-4 py-3">User Type</td>
                <td className="px-4 py-3">Actions</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              <tr className="">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Joe Frank</td>
                <td className="px-4 py-3">joe@gmail.com</td>
                <td className="px-4 py-3">User</td>
                <td className="px-4 py-3">
                  <div className="flex">
                    <button className="px-4 ">
                      <Trash />
                    </button>
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

export default Users;
