import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Home,
  Plus,
  Download,
  HelpCircle,
  ChevronDown,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { LuPanelLeft } from "react-icons/lu";

function EditableTitle({ initialTitle }) {
  const [title, setTitle] = React.useState(initialTitle);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => setIsEditing(true);
  const finishEditing = () => {
    if (title.trim() === "") setTitle("Untitled");
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") finishEditing();
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={finishEditing}
      onKeyDown={handleKeyDown}
      className="bg-transparent border-b border-[#256AFF] text-sm font-medium text-white focus:outline-none w-[160px]"
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className="text-sm font-medium text-white cursor-text select-none"
      title="Double-click to rename"
    >
      {title}
    </span>
  );
}


export default function App() {
  const [phases, setPhases] = useState(["Phase 1"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showPhases, setShowPhases] = useState(true);
  const [phaseToDelete, setPhaseToDelete] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const addPhase = () =>
    setPhases([...phases, `Phase ${phases.length + 1}`]);
  const handleDeletePhase = (index) => setPhaseToDelete(index);
  const confirmDeletePhase = () => {
    if (phaseToDelete !== null) {
      setPhases(phases.filter((_, i) => i !== phaseToDelete));
      setPhaseToDelete(null);
    }
  };
  const cancelDeletePhase = () => setPhaseToDelete(null);

  // 🧩 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // --- Dropdown Menu Items ---
  const menuItems = [
    {
      label: "Home",
      action: () => alert("Navigating to Home..."),
    },
    {
      label: "File",
      submenu: [
        { label: "New", action: () => alert("New File Created") },
        { label: "Open", action: () => alert("Opening File...") },
        { label: "Save", action: () => alert("File Saved") },
        { label: "Save As", action: () => alert("Save As...") },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", action: () => alert("Undo action") },
        { label: "Redo", action: () => alert("Redo action") },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-screen flex overflow-hidden bg-white relative">
      {/* 🧭 LEFT SIDEBAR */}
      <div
        className={`w-[250px] bg-[#2C2C2C] left-[15px] top-[15px] bottom-[15px] text-white flex flex-col justify-between overflow-hidden border-r border-gray-800 
          absolute inset-y-0 rounded-xl shadow-lg z-40 transition-all duration-500 ease-in-out transform origin-top-left
          ${
            isSidebarOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-full scale-50 opacity-0"
          }`}
      >
        {/* 🔹 TOP BAR WITH DROPDOWN MENU */}
        <div className="relative flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 relative">
            <img src="/stdLogo.png" alt="Logo" className="w-5 h-5 object-contain" />
            <h2 className="text-sm">Staad Builder</h2>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition"
            >
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Sidebar Toggle */}
          <button onClick={toggleSidebar}>
            <LuPanelLeft
              className={`w-5 h-5 text-white hover:text-gray-300 transition-transform duration-300 ${
                isSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* 🏷️ PROJECT TITLE */}
        <div className="px-4 pt-2 pb-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <EditableTitle initialTitle="KTPL – Staad Model" />
            <span className="text-[10px] text-[#84ABFF] bg-[#353F56] px-2 py-[3px] rounded-[4px]">
              Trial
            </span>
          </div>
        </div>

        {/* 🔸 MIDDLE SECTION */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
          <div className="text-gray-300 text-xs mb-2 uppercase tracking-wide">
            Workspace
          </div>

          <button className="flex justify-between items-center text-sm text-white hover:bg-gray-700 px-2 py-2 w-full rounded-md mb-3 transition">
            <span>Main Canvas</span>
            <Home size={15} />
          </button>

          {/* === PHASES SECTION === */}
          <div className="flex justify-between items-center text-gray-300 text-xs uppercase mt-4 mb-2 tracking-wide">
            <span>Phases</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPhases(!showPhases)}
                className="text-gray-400 hover:text-white transition"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    showPhases ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </button>
              <button onClick={addPhase}>
                <Plus size={13} className="hover:text-white transition" />
              </button>
            </div>
          </div>

          {/* Collapsible Phase List */}
          {showPhases && (
            <div className="space-y-1 transition-all duration-300 ease-in-out">
              {phases.map((phase, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${
                    idx === 0
                      ? "bg-[#4566AF] text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>{phase}</span>
                  <button
                    onClick={() => handleDeletePhase(idx)}
                    className="text-gray-400 hover:text-red-400 transition"
                    title="Delete Phase"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ⬇️ BOTTOM SECTION */}
        <div className="p-4 border-t border-gray-700 space-y-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full">
            <Download size={14} />
            Import
          </button>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full">
            <HelpCircle size={14} />
            Help & Feedback
          </button>
        </div>
      </div>

      {/* 🪟 Floating Reopen Button */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 bg-[#2b2b2b] text-white p-2 rounded-md shadow-md hover:bg-[#3a3a3a] transition-all duration-200 ease-in-out z-50"
        >
          <LuPanelLeft className="w-5 h-5 rotate-180" />
        </button>
      )}

      {/* 🧾 Confirmation Popup */}
      {phaseToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
          <div className="bg-[#2C2C2C] p-5 rounded-xl border border-gray-700 w-[280px] text-center shadow-lg">
            <h2 className="text-white text-sm font-medium mb-3">
              Are you sure you want to delete this phase?
            </h2>
            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={confirmDeletePhase}
                className="px-3 py-1.5 bg-[#A50000] text-white rounded-md text-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={cancelDeletePhase}
                className="px-3 py-1.5 bg-[#3D3D3D] text-gray-200 rounded-md text-sm hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📂 Dropdown rendered above everything */}
      {menuOpen &&
        ReactDOM.createPortal(
          <div
            className="dropdown-container fixed left-[75px] top-[70px] 
              z-[9999] w-[200px] rounded-xl border border-[#3E3E3E] 
              bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E]
              shadow-[0_6px_20px_rgba(0,0,0,0.6)] 
              animate-fadeInScale backdrop-blur-md py-2"
          >
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() =>
                  setActiveSubmenu(item.submenu ? item.label : null)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {/* Parent Item */}
                <button
                  onClick={item.action}
                  className="flex justify-between items-center w-full px-4 py-2 
                  text-sm text-gray-200 hover:bg-[#353535] hover:text-white 
                  rounded-md transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-[6px] h-[6px] rounded-full transition-colors ${
                        activeSubmenu === item.label
                          ? "bg-[#256AFF]"
                          : "bg-transparent group-hover:bg-[#256AFF]"
                      }`}
                    ></span>
                    {item.label}
                  </span>

                  {item.submenu && (
                    <ChevronRight
                      size={14}
                      className="text-gray-400 group-hover:text-white 
                      transition-transform duration-200 group-hover:translate-x-[2px]"
                    />
                  )}
                </button>

                {/* ▶️ Submenu */}
                {item.submenu && activeSubmenu === item.label && (
                  <div
                    className="absolute left-[190px] top-0 w-[160px] 
                      bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] 
                      border border-[#3E3E3E] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.45)] 
                      py-2 animate-fadeInScale z-[10000]"
                  >
                    {item.submenu.map((sub, j) => (
                      <button
                        key={j}
                        onClick={sub.action}
                        className="block w-full text-left px-4 py-2 text-sm 
                        text-gray-200 hover:bg-[#353535] hover:text-white 
                        rounded-md transition-all duration-200"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
