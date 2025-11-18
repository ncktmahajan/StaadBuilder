import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-[120px] select-none">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-[#383838] px-3 py-2 rounded-md text-sm text-gray-300 cursor-pointer flex items-center justify-between hover:bg-[#323232] transition"
      >
        {options.find((o) => o.value === value)?.label}
        <ChevronDown size={16} className="text-gray-400" />
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-1 w-full rounded-md bg-[#2B2B2B] border border-[#3A3A3A] shadow-lg overflow-hidden z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-gray-300 hover:bg-[#3A3A3A] cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
