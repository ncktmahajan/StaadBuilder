import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full h-[64px] bg-[#2C2C2C] flex items-center px-10 border-b border-[#525151] relative">
      
      {/* LEFT: Logo + Title (unchanged) */}
      <div className="flex items-center gap-3">
        <img src="/stdLogo.png" alt="logo" className="w-7 h-7 object-contain" />
        <span className="text-white text-lg font-regular tracking-wide">
          Staad Builder
        </span>
      </div>

      <div className="flex-1" />

      {/* RIGHT: Profile Section (your layout kept untouched) */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setOpen(!open)}
        ref={menuRef}
      >
        <img
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt="user"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-white font-medium text-sm">Nachiket Mahajan</span>
          <span className="text-[#84ABFF] text-[11px] font-light bg-[#353F56] px-2 py-[1px] mt-[2px] rounded-[5px] w-fit">
            Free
          </span>
        </div>

        <HiChevronDown className="text-white text-xl" />
      </div>

      {/* DROPDOWN — ADDED BELOW */}
      {open && (
        <div className="absolute right-10 top-[60px] w-[250px] bg-[#2C2C2C] border border-[#3d3d3d] rounded-xl shadow-lg py-4 z-50">

          {/* TOP USER BLOCK */}
          <div className="flex flex-col items-center relative pb-3">
            
            {/* Profile Image + Edit Icon Wrapper */}
            <div className="relative flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/men/36.jpg"
                className="w-16 h-16 rounded-full object-cover"
                alt="profile"
              />

              {/* Edit Icon: bottom-right, overlapping cleanly */}
              <div
                className="absolute bottom-0 right-0 bg-[#3C3C3C] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
              >
                <FiEdit2 className="text-white text-[10px]" />
              </div>
            </div>


            {/* NAME */}
            <p className="text-white text-sm font-medium mt-2">Nachiket Mahajan</p>

            {/* EMAIL → changes on hover */}
            <p className="text-gray-400 text-xs mt-1">
              {hoverEdit ? "Edit Profile" : "nachiketmahajan@gmail.com"}
            </p>
          </div>

          <div className="border-t border-[#3d3d3d] my-2" />

          {/* Logout Button */}
          <button className="w-full text-left px-4 py-3 text-white text-sm hover:bg-[#3a3a3a] flex items-center gap-2">
            <FiLogOut className="text-[16px]" /> Log out
          </button>
        </div>
      )}

    </header>
  );
}
