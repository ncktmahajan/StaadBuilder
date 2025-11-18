import React from "react";

export default function UpgradeBanner() {
  return (
    <div className="w-full bg-[#3C3C3C] px-6 py-4 rounded-2xl flex items-center justify-between">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* PNG ICON FROM /public/icons/zap.png */}
        <div className="flex items-center justify-center w-8 h-8 rounded-md">
          <img
            src="/icons/zap.png"
            alt="zap"
            className="w-6 h-6 object-contain"
          />
        </div>

        <div className="leading-tight">
          <div className="text-white text-[16px] font-light">
            Upgrade your workspace
          </div>

          <div className="text-[#B3B3B3] text-[13px] mt-[5px]">
            Unlock all the features on Staad Builder
          </div>
        </div>
      </div>

      {/* RIGHT BUTTON */}
      <button className="bg-[#1A82FF] hover:bg-[#0F6ADF] text-white px-6 py-2 rounded-lg text-sm font-regular transition">
        Upgrade
      </button>
    </div>
  );
}
