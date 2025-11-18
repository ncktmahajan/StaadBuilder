import React from "react";
import { HiChevronDown } from "react-icons/hi";

export default function Header() {
  return (
    <header className="w-full h-[64px] bg-[#2C2C2C] flex items-center px-10 border-b border-[#525151]">
      
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="/stdLogo.png"
          alt="logo"
          className="w-7 h-7 object-contain"
        />
        <span className="text-white text-lg font-regular tracking-wide">
          Staad Builder
        </span>
      </div>

      <div className="flex-1" />

      {/* RIGHT: Profile */}
      <div className="flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt="user"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-white font-medium text-sm">
            Nachiket Mahajan
          </span>

          <span className="text-[#84ABFF] text-[11px] font-light bg-[#353F56] px-2 py-[1px] mt-[2px] rounded-[5px] inline-block w-fit">
            Free
          </span>
        </div>

        {/* Chevron icon */}
        <HiChevronDown className="text-white text-xl" />
      </div>
    </header>
  );
}
