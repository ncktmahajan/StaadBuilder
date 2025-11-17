import React, { useState, useEffect, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

function EditableTitle({ initialTitle }) {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const finishEditing = () => {
    if (title.trim() === "") setTitle("Untitled");
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={finishEditing}
      onKeyDown={(e) => e.key === "Enter" && finishEditing()}
      className="bg-transparent border-b border-[#256AFF] text-sm font-medium text-white focus:outline-none w-[160px]"
    />
  ) : (
    <span
      onDoubleClick={() => setIsEditing(true)}
      className="text-sm font-medium text-white cursor-text select-none"
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
  
  // 🔥 NEW STATE FOR HELP MENU
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [helpMenuPosition, setHelpMenuPosition] = useState({ top: 0, left: 0 });
  const helpButtonRef = useRef(null); // Ref to get button position

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addPhase = () => setPhases([...phases, `Phase ${phases.length + 1}`]);

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
  
  // 🔥 NEW ITEMS FOR HELP MENU
  const helpMenuItems = [
    { label: "Staad Builder Docs", action: () => alert("Opening Docs...") },
    { label: "Tutorial", action: () => alert("Opening Tutorial...") },
    { type: "divider" },
    { label: "Send Feedback", action: () => alert("Opening Feedback Form...") },
    { label: "Report Bug", action: () => alert("Opening Bug Report...") },
    { label: "Feature Request", action: () => alert("Opening Feature Request Form...") },
  ];

  useEffect(() => {
    const close = (e) => {
      // Close the main dropdown menu
      if (menuOpen && !e.target.closest(".main-dropdown-container")) {
        setMenuOpen(false);
        setActiveSubmenu(null);
      }
      // Close the help menu
      if (isHelpMenuOpen && !e.target.closest(".help-dropdown-container")) {
        setIsHelpMenuOpen(false);
      }
    };
    if (menuOpen || isHelpMenuOpen) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen, isHelpMenuOpen]);
  
  // Function to calculate menu position dynamically for "Help & Feedback"
// Function to calculate menu position dynamically for "Help & Feedback"
  const openHelpMenu = () => {
    if (helpButtonRef.current) {
      const rect = helpButtonRef.current.getBoundingClientRect();
      const menuHeightEstimate = 200; // Original Estimate
      
      const extraShift = 15; 
      const top = rect.top - menuHeightEstimate - 5 - extraShift; 
      const left = rect.left;

      setHelpMenuPosition({ top, left });
      setIsHelpMenuOpen(true);
    }
  };


  return (
    <div className="min-h-screen w-screen flex overflow-hidden bg-white relative">

      {/* 🔥 ANIMATED SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 15, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[250px] absolute top-[15px] bottom-[15px] bg-[#2C2C2C]
              text-white flex flex-col justify-between overflow-hidden 
              border-r border-gray-800 rounded-xl shadow-lg z-40"
          >
            {/* 🔹 TOP BAR */}
            <div className="relative flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2 relative">
                <img
                  src="/stdLogo.png"
                  alt="Logo"
                  className="w-5 h-5 object-contain"
                />
                <h2 className="text-sm">Staad Builder</h2>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      menuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.8 }}
                onClick={toggleSidebar}
              >
                <LuPanelLeft
                  className={`w-5 h-5 text-white transition-transform ${
                    isSidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            </div>

            {/* 🔸 PROJECT TITLE */}
            <div className="px-4 pt-2 pb-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <EditableTitle initialTitle="KTPL – Staad Model" />
                <span className="text-[10px] text-[#84ABFF] bg-[#353F56] px-2 py-[3px] rounded-[4px]">
                  Trial
                </span>
              </div>
            </div>

            {/* 🏗 MAIN CONTENT */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
              <div className="text-gray-300 text-xs mb-2 uppercase">
                Workspace
              </div>

              {/* Canvas */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center text-sm text-white hover:bg-gray-700 px-2 py-2 w-full rounded-md mb-3 transition"
              >
                <span>Main Canvas</span>
                <Home size={15} />
              </motion.button>

              {/* PHASE TITLE */}
              <div className="flex justify-between items-center text-gray-300 text-xs uppercase mt-4 mb-2">
                <span>Phases</span>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setShowPhases(!showPhases)}
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        showPhases ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={addPhase}
                  >
                    <Plus size={13} />
                  </motion.button>
                </div>
              </div>

              {/* 🔥 ANIMATED PHASE LIST */}
              <AnimatePresence>
                {showPhases && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1"
                  >
                    {phases.map((phase, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${
                          idx === 0
                            ? "bg-[#4566AF] text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <span>{phase}</span>

                        <motion.button
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setPhaseToDelete(idx)}
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FOOTER */}
          <div className="p-4 border-t border-gray-700 space-y-1">
            {/* Import Button with Hover Effect */}
            <motion.button
              className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full px-3 py-2 rounded-md hover:bg-gray-700"
            >
              <Download size={14} />
              Import
            </motion.button>

            {/* Help & Feedback Button with Hover Effect and Menu Logic */}
            <motion.button
              ref={helpButtonRef} // Attach ref here
              onClick={openHelpMenu} // Use the new handler
              className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full relative px-3 py-2 rounded-md hover:bg-gray-700"
            >
              <HelpCircle size={14} />
              Help & Feedback
            </motion.button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REOPEN BUTTON */}
      {!isSidebarOpen && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleSidebar}
          className="absolute top-4 left-4 bg-[#2b2b2b] text-white p-2 rounded-md shadow-md transition z-50"
        >
          <LuPanelLeft className="w-5 h-5 rotate-180" />
        </motion.button>
      )}

      {/* DELETE CONFIRMATION */}
      <AnimatePresence>
        {phaseToDelete !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm"
          >
            <div className="bg-[#2C2C2C] p-5 rounded-xl border border-gray-700 w-[280px] text-center shadow-lg">
              <h2 className="text-white text-sm font-medium mb-3">
                Are you sure you want to delete this phase?
              </h2>

              <div className="flex justify-center gap-3 mt-2">
                <button
                  onClick={() => {
                    setPhases(phases.filter((_, i) => i !== phaseToDelete));
                    setPhaseToDelete(null);
                  }}
                  className="px-3 py-1.5 bg-[#A50000] text-white rounded-md text-sm hover:bg-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() => setPhaseToDelete(null)}
                  className="px-3 py-1.5 bg-[#3D3D3D] text-gray-200 rounded-md text-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU PORTAL (Existing Main Dropdown) */}
      {menuOpen &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -6 }}
            transition={{ duration: 0.18 }}
            className="main-dropdown-container fixed left-[75px] top-[70px] 
              z-[9999] w-[200px] rounded-xl border border-[#3E3E3E]
              bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] shadow-md py-2"
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
                <button
                  onClick={item.action}
                  className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-[#353535] hover:text-white rounded-md"
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronRight size={14} />}
                </button>

                {/* SUBMENU */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-[190px] top-0 w-[160px] 
                        bg-[#2C2C2C] border border-[#3E3E3E] rounded-lg shadow py-2"
                    >
                      {item.submenu.map((sub, j) => (
                        <button
                          key={j}
                          onClick={sub.action}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#353535] hover:text-white"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>,
          document.body
        )}
        
      {/* NEW HELP MENU PORTAL */}
      {isHelpMenuOpen &&
        ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.18 }}
              style={{
                top: helpMenuPosition.top,
                left: helpMenuPosition.left,
              }}
              className="help-dropdown-container fixed z-[9999] w-[220px] rounded-xl 
                border border-[#3E3E3E] bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] shadow-xl py-2"
            >
              {helpMenuItems.map((item, i) =>
                item.type === "divider" ? (
                  <hr key={i} className="border-t border-[#3E3E3E] my-2" />
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      item.action();
                      setIsHelpMenuOpen(false); // Close menu after action
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#353535] hover:text-white"
                  >
                    {item.label}
                  </button>
                )
              )}
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}