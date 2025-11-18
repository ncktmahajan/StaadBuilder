import React from "react";
import { Grid, List } from "lucide-react";

export default function LayoutSwitcher({ layout, setLayout }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLayout("grid")}
        className={`p-2 rounded-md ${layout === "grid" ? "bg-[#333] text-white" : "text-gray-300 hover:bg-[#2b2b2b]"}`}
      >
        <Grid size={16} />
      </button>
      <button
        onClick={() => setLayout("list")}
        className={`p-2 rounded-md ${layout === "list" ? "bg-[#333] text-white" : "text-gray-300 hover:bg-[#2b2b2b]"}`}
      >
        <List size={16} />
      </button>
    </div>
  );
}
