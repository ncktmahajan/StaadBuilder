import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="bg-[#383838] px-3 py-2 rounded-md flex items-center gap-2">
      <Search size={16} stroke="#818181" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="bg-transparent outline-none text-sm w-[260px] text-[#818181] placeholder-[#818181]"
      />
    </div>
  );
}
