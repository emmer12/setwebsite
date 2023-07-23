"use client";
import { IBackdrop } from "@/types";
import React, { useState } from "react";

enum ITab {
  "DESCRIPTION" = "description",
  "REVIEW" = "review",
  "O_DESCRIPTION" = "other_description",
}

const BackdropDetails = ({ backdrop }: { backdrop: IBackdrop }) => {
  const [tab, setTab] = useState<ITab>(ITab.DESCRIPTION);

  return (
    <div>
      <div className="em__pro__details">
        <div className="p__tab">
          <div
            onClick={() => setTab(ITab.DESCRIPTION)}
            className={`p__tab__item ${
              tab == ITab.DESCRIPTION ? " active" : ""
            }`}
          >
            product Information
          </div>
          <div
            onClick={() => setTab(ITab.REVIEW)}
            className={`p__tab__item  ${tab == ITab.REVIEW ? " active" : ""}`}
          >
            Reviews
          </div>
          <div
            onClick={() => setTab(ITab.O_DESCRIPTION)}
            className={`p__tab__item ${
              tab == ITab.O_DESCRIPTION ? " active" : ""
            }`}
          >
            Another Details
          </div>
        </div>

        {tab == ITab.DESCRIPTION && (
          <div className="p__tab__body">
            <p>{backdrop?.description}</p>
          </div>
        )}

        {tab == ITab.REVIEW && (
          <div className="p__tab__body">
            <p>No Reviews</p>
          </div>
        )}

        {tab == ITab.O_DESCRIPTION && (
          <div className="p__tab__body">
            <p>{backdrop?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackdropDetails;
