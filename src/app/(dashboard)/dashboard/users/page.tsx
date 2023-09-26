"use client";
import Button from "@/components/Button";
import { EditIcon, Trash } from "@/components/icons";
import { deleteUser, getAllUsers } from "@/lib/api/user.api";
import { formattedMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { NotificationManager } from "react-notifications";

const UserPage = () => {
  const { data, error, isLoading } = useSWR("/api/users/admin", getAllUsers);

  const handleDelete = async (id: string) => {
    try {
      const conf = confirm("Are you sure?");
      if (conf) {
        await deleteUser(id);
        NotificationManager.success("User Deleted!");
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
          <h4 className="text-[24px]">Users </h4>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">S/N</td>
                <td className="px-4 py-3">Name</td>
                <td className="px-4 py-3">Email</td>
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
                  {data?.users.map((user: any, i: number) => (
                    <tr className="" key={i}>
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-4 "
                          >
                            <Trash />
                          </button>
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

export default UserPage;
