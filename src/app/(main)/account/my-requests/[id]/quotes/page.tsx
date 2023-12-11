"use client";

import Empty from "@/components/Empty";
import { Loading } from "@/components/icons";
import { getRequestQuotes } from "@/lib/api/user.api";
import { formatDate, formattedMoney } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import useSWR from "swr";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { data, error, isLoading } = useSWR(`${params.id}`, getRequestQuotes);

  return (
    <div>
      <div className="wrapper">
        {isLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            {data.quotes.length > 0 ? (
              data.quotes.map((quote: any, i: number) => (
                <div key={i} className="shadow-sm p-2 sm:p-4 rounded relative">
                  <div className="flex justify-between">
                    <div>
                      <div className="vendor__d flex items-center gap-2">
                        <div className="avatar h-[50px] w-[50px] bg-gray-100 flex-shrink-0 rounded-full"></div>
                        <div className="avatar">
                          <h4 className="font-medium ">
                            {quote?.vendor?.company_name}
                          </h4>
                          {/* rating */}
                        </div>
                      </div>
                      <div className="my-3">
                        <p>{quote.description}</p>
                        <div className="my-2">
                          <span className="font-medium text-sm bg-[#ffe3cd] font-serif p-[4px] rounded ">
                            Deadline: {formatDate(quote.expiredAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="amount absolute top-4 right-4">
                      <h4 className="text-[#ee5200] text-xl">
                        {formattedMoney(quote.amount)}
                      </h4>
                    </div>

                    <div className="self-end">
                      <button className="em__button sm">Action</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <Empty
                  actionText="No Data"
                  msg="You have not received any quote."
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
