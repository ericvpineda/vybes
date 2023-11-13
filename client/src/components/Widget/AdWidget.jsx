import React from "react";
import WidgetWrapper from "./WidgetWrapper";

export default function AdWidget() {
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-end mb-2">
        <div className="uppercase font-bold text-md">Sponsered</div>
        <div className="font-medium cursor-pointer text-sm">Create Ad</div>
      </div>
      <div className="w-full p-1 mb-2">
        <img
          src="https://images.unsplash.com/photo-1630046656839-4bc3d976f4c7?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="ad"
          className="object-cover w-full max-h-[15rem] rounded-xl "
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm">Ticketmaster Affiliate</p>
        <p className="font-sm text-sm ">
          <a href="https://developer.ticketmaster.com/partners/distribution-partners/affiliate-sign-up/">
            developer.ticketmaster.com
          </a>
        </p>
      </div>
      <div className="text-sm p-2">
        <p className="text-sm text-lightNeutral-300 leading-relaxed">
          Unlock the power of live entertainment with the Ticketmaster Affiliate
          Program and earn commissions by promoting and selling tickets to the
          hottest concerts, sports events, and shows worldwide.
        </p>
      </div>
    </WidgetWrapper>
  );
}
