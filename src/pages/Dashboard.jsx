import React, { useState, useMemo } from "react";
import { Home as HomeIcon, Upload, Plus } from "lucide-react";

import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import ProjectCard from "../component/ProjectCard";
import UpgradeBanner from "../component/UpgradeBanner";
import LayoutSwitcher from "../component/LayoutSwitcher";
import SearchBar from "../component/SearchBar";
import FormModal from "../component/FormModal"; 
import CustomDropdown from "../component/CustomDropdown";   // ⬅️ NEW IMPORT

/* sample mock projects */
const createMock = (i) => ({
  id: i,
  title: "KTPL – Staad Model",
  edited: "Edited 2 hrs ago",
  thumb: "/placeholder-thumb.png",
});

const initialProjects = Array.from({ length: 1 }).map((_, i) =>
  createMock(i + 1)
);

export default function Dashboard() {
  const [formModal, setFormModal] = useState(null);

  function handleFormSubmit(type, payload) {
    console.log("Submitted", type, payload);
    alert(`${type} submitted — check console for payload.`);
  }

  const [projects] = useState(initialProjects);
  const [layout, setLayout] = useState("grid");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => !q || p.title.toLowerCase().includes(q));
  }, [query, projects]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header setFormModal={setFormModal} />

      <div className="flex flex-1 h-full overflow-hidden">
        <Sidebar setFormModal={setFormModal} />

        {/* Modal */}
        {formModal && (
          <FormModal
            type={formModal}
            onClose={() => setFormModal(null)}
            onSubmit={handleFormSubmit}
          />
        )}

        <main className="relative flex-1 bg-[#2c2c2c] p-6 overflow-y-auto scrollbar-hide">

          {/* TOP BAR */}
          <div className="mb-6 flex items-center justify-between gap-4">
            
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">

              {/* HOME TAG */}
              <div className="px-3 py-1 rounded-full bg-[#477BB9] text-white text-sm font-light">
                <span className="flex items-center gap-2">
                  <HomeIcon size={16} /> 
                  Home
                </span>
              </div>

              {/* LAYOUT SWITCHER */}
              <LayoutSwitcher layout={layout} setLayout={setLayout} />

              {/* SORT DROPDOWN */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-300">Sort by</label>

                <CustomDropdown
                  value={sort}
                  onChange={setSort}
                  options={[
                    { value: "recent", label: "Recent" },
                    { value: "name", label: "Name" }
                  ]}
                />
              </div>

            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center gap-3">

              <SearchBar value={query} onChange={(v) => setQuery(v)} />

              {/* IMPORT BUTTON */}
              <div className="p-[1px] rounded-md bg-gradient-to-r from-[#FFFFFF] to-[#164099]">
                <button className="w-full h-full px-4 py-2 bg-[#2c2c2c] rounded-md text-sm text-gray-200 flex items-center gap-2 hover:bg-[#353535] transition">
                  <Upload size={16} />
                  Import
                </button>
              </div>

              {/* CREATE BUTTON */}
              <div className="p-[1px] rounded-md bg-gradient-to-r from-[#164099] to-[#FFFFFF]">
                <button className="w-full h-full px-4 py-2 bg-[#256AFF] rounded-md text-sm text-white flex items-center gap-2 hover:bg-[#1a55d9] transition">
                  <Plus size={16} />
                  Create
                </button>
              </div>

            </div>
          </div>

          {/* UPGRADE BANNER */}
          <UpgradeBanner />

          {/* PROJECT CARDS */}
          <section className="mt-6">
            {layout === "grid" ? (
              <div className="grid grid-cols-4 gap-6">
                {filtered.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <ProjectCard key={p.id} project={p} layout="list" />
                ))}
              </div>
            )}
          </section>

          {/* WATERMARK */}
          <div className="pointer-events-none fixed bottom-6 right-6 text-right text-xs text-white opacity-70 select-none">
            <div>Powered by Kosoku ❤️</div>
            <div>Engineered and developed in India 🇮🇳</div>
          </div>

        </main>
      </div>
    </div>
  );
}
