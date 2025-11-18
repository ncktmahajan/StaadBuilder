import React from "react";
import { MonitorSmartphone } from "lucide-react";

export default function MobileWarning() {
  return (
    <div className="fixed inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center text-center px-6 z-[999999]">
      <MonitorSmartphone size={64} className="text-gray-400 mb-6" />

      <h2 className="text-white text-2xl font-semibold mb-2">
        Unsupported Screen Size
      </h2>

      <p className="text-gray-400 text-sm leading-normal max-w-xs">
        This software is designed for large screens.
        <br />
        Please use a laptop or desktop for the best experience.
      </p>

      <p className="text-gray-500 text-xs mt-6">
        Powered by Kosoku
      </p>
    </div>
  );
}
