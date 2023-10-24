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
            Licensing Terms
          </div>
          <div
            onClick={() => setTab(ITab.REVIEW)}
            className={`p__tab__item  ${tab == ITab.REVIEW ? " active" : ""}`}
          >
            Personal License
          </div>
          <div
            onClick={() => setTab(ITab.O_DESCRIPTION)}
            className={`p__tab__item ${
              tab == ITab.O_DESCRIPTION ? " active" : ""
            }`}
          >
            Commercial License
          </div>
        </div>

        {tab == ITab.DESCRIPTION && (
          <div className="p__tab__body">
            <p>
              At Set Events, we have meticulously crafted two distinct licenses
              tailored to suit the unique requirements of our clients: the
              Personal License and the Commercial License. While these terms are
              applicable internationally, we recommend seeking legal advice
              specific to your jurisdiction for optimal understanding and
              compliance. For your convenience, we have thoughtfully
              incorporated detailed information regarding the licensing options
              beneath each design image and within the production files. This
              strategic placement serves to reinforce understanding and
              compliance with the licensing terms. Furthermore, the identical
              legal note present on our website accompanies each production
              file, underscoring our unwavering commitment to transparency and
              legal compliance. 
            </p>
          </div>
        )}

        {tab == ITab.REVIEW && (
          <div className="p__tab__body">
            <p>
              The Personal License extends to individuals the perpetual
              privilege of utilizing our production files to create assets,
              including backdrops and acrylic products, for personal use. Under
              this license, clients are authorized to produce sets based on the
              files twice for their events. Moreover, clients retain the option
              to collaborate with a production company or event planner to
              materialize the designs. It is imperative to highlight that
              commercial enterprises engaged in asset production are
              unequivocally barred from repurposing the files for commercial
              endeavors. Any dissemination of the files by individual users or
              the production entity responsible for creating the assets will
              invoke legal consequences.
            </p>
          </div>
        )}

        {tab == ITab.O_DESCRIPTION && (
          <div className="p__tab__body">
            <p>
              The Commercial License grants clients the perpetual authorization
              to produce designs using our files for a total of up to 20
              productions. It is of utmost importance to underscore that this
              license in no way confers the right to resell or redistribute the
              production files. Acquisition of the design&#39;s ownership is
              categorically prohibited. All intellectual property rights,
              including copyrights and ownership, continue to reside exclusively
              with Set Events. Our organization retains complete ownership and
              dominion over the designs, fortified by the protection afforded by
              pertinent intellectual property legislation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackdropDetails;
