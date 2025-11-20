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
  Undo2,
  Redo2,
} from "lucide-react";
import { LuPanelLeft } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import FormModal from "../component/FormModal";
// 1. IMPORT THE NEW COMPONENT
import ImportOverlay from "../component/ImportOverlay"; // Assuming ImportOverlay.jsx is in the same directory

// --- START: Helper Components (Unchanged) ---
// ... (EditableTitle and IconOnlySidebarButton remain unchanged)
function EditableTitle({ initialTitle, isCollapsed }) {
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

  if (isCollapsed) return null; // Hide title when in collapsed/icon stage

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

// Separate component for the Icon-only button
const IconOnlySidebarButton = ({ onClick }) => (
  <motion.button
    key="sidebar-open-btn"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2 }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
    // Set to smaller square size (50px) with corner radius (rounded-xl)
    className="absolute top-[15px] left-[15px] p-2 w-[40px] h-[40px] flex items-center justify-center
               rounded-[8px] bg-[#2C2C2C] text-white z-50 shadow-lg"
  >
    <LuPanelLeft className={`w-5 h-5`} />
  </motion.button>
);
// --- END: Helper Components ---


export default function App() {
  const [phases, setPhases] = useState(["Phase 1"]);
  const [sidebarStage, setSidebarStage] = useState('full');
  const [showPhases, setShowPhases] = useState(true);
  const [phaseToDelete, setPhaseToDelete] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // help menu + modal states
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [helpMenuPosition, setHelpMenuPosition] = useState({ top: 0, left: 0 });
  const helpButtonRef = useRef(null);
  const [formModal, setFormModal] = useState(null);
  
  // 2. NEW STATE FOR IMPORT MODAL
  const [showImportModal, setShowImportModal] = useState(false);

  const isSidebarOpen = sidebarStage !== 'icon';
  const isSidebarCollapsed = sidebarStage === 'collapsed';

  // Logic for the two-stage toggle with automatic second stage (Unchanged)
  const toggleSidebar = () => {
    if (sidebarStage === 'full') {
      setSidebarStage('collapsed'); // Stage 1: Collapse height
      // Automatically transition to icon stage after a short delay (200ms for snappier feel)
      setTimeout(() => {
        setSidebarStage('icon');
      }, 200);
    } else if (sidebarStage === 'collapsed') {
      // This path only handles direct click from collapsed state if auto-transition is interrupted
      setSidebarStage('icon');
    } else {
      setSidebarStage('full'); // Stage 3: Maximize
    }
  };

  const maximizeSidebar = () => setSidebarStage('full');

  const addPhase = () => setPhases((p) => [...p, `Phase ${p.length + 1}`]);

  // --- Framer Motion Stage Variants (Unchanged from previous answer) ---
  const smoothTransition = {
    duration: 0.35,
    ease: "easeInOut",
  };

  const sidebarVariants = {
    full: {
      opacity: 1,
      x: 15,
      scale: 1,
      width: 250,
      height: 'calc(100vh - 30px)',
      borderRadius: '12px',
      transition: smoothTransition,
    },
    collapsed: {
      opacity: 1,
      x: 15,
      scale: 1,
      width: 250,
      height: 70,
      borderRadius: '12px',
      transition: smoothTransition,
    },
    icon: {
      opacity: 0,
      x: -50,
      scale: 0.85,
      width: 50,
      height: 50,
      borderRadius: '12px',
      transition: {
        duration: 0.25,
        opacity: { delay: 0.15, duration: 0.1 }
      },
    },
  };

  const contentVariants = {
    full: {
      opacity: 1,
      height: 'auto',
      pointerEvents: 'auto',
      transition: { duration: 0.3, ease: "easeOut" },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      pointerEvents: 'none',
      transition: { duration: 0.3, ease: "easeOut" },
    }
  };

  const menuItems = [
    // ... menuItems (Unchanged)
    {
      label: "Home",
      icon: Home,
      action: () => alert("Navigating to Home..."),
    },
    {
      label: "File",
      submenu: [
        { label: "New", icon: "/icons/new.png", action: () => alert("New File Created") },
        { label: "Open", icon: "/icons/open.png", action: () => alert("Opening File...") },
        { label: "Save", icon: "/icons/save.png", action: () => alert("File Saved") },
        { label: "Save As", icon: "/icons/save-as.png", action: () => alert("Save As...") },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", icon: Undo2, action: () => alert("Undo action") },
        { label: "Redo", icon: Redo2, action: () => alert("Redo action") },
      ],
    },
  ];

  const helpMenuItems = [
    // ... helpMenuItems (Unchanged)
    { label: "Staad Builder Docs", action: () => alert("Opening Docs...") },
    { label: "Tutorial", action: () => alert("Opening Tutorial...") },
    { type: "divider" },
    { label: "Send Feedback", action: () => setFormModal("feedback") },
    { label: "Report Bug", action: () => setFormModal("bug") },
    { label: "Feature Request", action: () => setFormModal("feature") },
  ];

  useEffect(() => {
    // ... close handlers (Unchanged)
    const close = (e) => {
      if (menuOpen && !e.target.closest(".main-dropdown-container")) {
        setMenuOpen(false);
        setActiveSubmenu(null);
      }
      if (isHelpMenuOpen && !e.target.closest(".help-dropdown-container")) {
        setIsHelpMenuOpen(false);
      }
    };
    if (menuOpen || isHelpMenuOpen) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen, isHelpMenuOpen]);

  const openHelpMenu = () => {
    // ... openHelpMenu (Unchanged)
    if (helpButtonRef.current) {
      const rect = helpButtonRef.current.getBoundingClientRect();
      const upwardShift = 20;
      const top = rect.top - 200 - upwardShift;
      const left = rect.left;
      setHelpMenuPosition({ top, left });
      setIsHelpMenuOpen(true);
    }
  };

  function handleFormSubmit(type, payload) {
    // ... handleFormSubmit (Unchanged)
    console.log("Submitted", type, payload);
    alert(`${type} submitted — check console for payload.`);
  }

  // NEW: Handler for file import
  function handleFileImport(file) {
    console.log("File Imported:", file.name, file);
    alert(`File "${file.name}" imported successfully!`);
    // Here you would add the actual file processing/upload logic
  }


  return (
    <div className="min-h-screen w-screen flex overflow-hidden bg-white relative">
      {/* Sidebar Open Button (Only shows when fully minimized) */}
      {!isSidebarOpen && <IconOnlySidebarButton onClick={maximizeSidebar} />}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={sidebarStage === 'full' ? { opacity: 0, x: -40, scale: 0.9 } : "icon"}
            animate={sidebarStage}
            exit="icon"
            variants={sidebarVariants}
            style={{ originX: 0 }}
            className="absolute top-[15px] bg-[#2C2C2C] text-white flex flex-col justify-between overflow-hidden
              border-r border-gray-800 shadow-lg z-40"
          >
            {/* TOP BAR (Unchanged) */}
            <div className={`relative flex items-center justify-between px-4 py-4 min-h-[70px]`}>
              <div className="flex items-center gap-2 relative">
                <img src="/stdLogo.png" alt="Logo" className="w-5 h-5 object-contain" />
                <h2 className={`text-sm ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Staad Builder</h2>

                <motion.button
                  onClick={() => setMenuOpen((m) => !m)}
                  className={`flex items-center gap-1 text-gray-400 hover:text-white transition ${isSidebarCollapsed ? 'hidden' : 'block'}`}
                >
                  <ChevronDown size={14} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
                </motion.button>
              </div>

              {/* Sidebar Collapse/Maximize Button (Unchanged) */}
              {sidebarStage !== 'icon' && (
                <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }} onClick={toggleSidebar}>
                  <LuPanelLeft className={`w-5 h-5 text-white ${isSidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
                </motion.button>
              )}
            </div>

            {/* COLLAPSIBLE CONTENT CONTAINER (Unchanged) */}
            <motion.div
              initial="full"
              animate={isSidebarCollapsed ? 'collapsed' : 'full'}
              variants={contentVariants}
              className="flex-1 flex flex-col overflow-y-auto scrollbar-hide"
            >
              {/* PROJECT TITLE (Unchanged) */}
              <div className="px-4 pt-2 pb-3 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <EditableTitle initialTitle="KTPL – Staad Model" isCollapsed={isSidebarCollapsed} />
                  <span className="text-[10px] text-[#84ABFF] bg-[#353F56] px-2 py-[3px] rounded-[4px]">Free</span>
                </div>
              </div>

              {/* MAIN CONTENT (Unchanged) */}
              <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                <div className="text-gray-300 text-xs mb-2 uppercase">Workspace</div>

                <motion.button whileHover={{ scale: 1.02 }} className="flex justify-between items-center text-sm text-white hover:bg-gray-700 px-2 py-2 w-full rounded-md mb-3 transition">
                  <span>Main Canvas</span>
                  <Home size={15} />
                </motion.button>

                {/* PHASES (Unchanged) */}
                <div className="flex justify-between items-center text-gray-300 text-xs uppercase mt-4 mb-2">
                  <span>Phases</span>

                  <div className="flex items-center gap-2">
                    <motion.button whileHover={{ scale: 1.15 }} onClick={() => setShowPhases((s) => !s)}>
                      <ChevronDown size={14} className={`${showPhases ? "rotate-0" : "-rotate-90"}`} />
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }} onClick={addPhase}>
                      <Plus size={13} />
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence>
                  {showPhases && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="space-y-1">
                      {phases.map((phase, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${idx === 0 ? "bg-[#4566AF] text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                        >
                          <span>{phase}</span>

                          <motion.button whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.85 }} onClick={() => setPhaseToDelete(idx)}>
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
                {/* 3. UPDATED IMPORT BUTTON */}
                <motion.button 
                    onClick={() => setShowImportModal(true)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full px-3 py-2 rounded-md hover:bg-gray-700">
                  <Download size={14} />
                  Import
                </motion.button>

                <motion.button ref={helpButtonRef} onClick={openHelpMenu} className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm w-full px-3 py-2 rounded-md hover:bg-gray-700">
                  <HelpCircle size={14} />
                  Help & Feedback
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN DROPDOWN MENU (Unchanged) */}
      {/* ... (Menu and Submenu Portals) */}
      {menuOpen &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -6 }}
            transition={{ duration: 0.18 }}
            className="main-dropdown-container fixed left-[75px] top-[70px] z-[9999] w-[200px] rounded-xl border border-[#3E3E3E] bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] shadow-md py-2"
          >
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.submenu ? item.label : null)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button onClick={item.action} className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-[#353535] hover:text-white rounded-md">
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>

                  {item.submenu && <ChevronRight size={14} />}
                </button>

                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="absolute left-[190px] top-0 w-[160px] bg-[#2C2C2C] border border-[#3E3E3E] rounded-lg shadow py-2">
                      {item.submenu.map((sub, j) => (
                        <button key={j} onClick={sub.action} className="flex justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#353535] hover:text-white">
                          <span>{sub.label}</span>

                          {sub.icon &&
                            (typeof sub.icon === "string" ? (
                              <img src={sub.icon} alt="" className="w-[18px] h-[18px] object-contain" />
                            ) : (
                              React.createElement(sub.icon, { size: 18 })
                            ))}
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

      {/* HELP MENU PORTAL (Unchanged) */}
      {/* ... (Help Menu Portal) */}
      {isHelpMenuOpen &&
        ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.18 }}
              style={{ top: helpMenuPosition.top, left: helpMenuPosition.left }}
              className="help-dropdown-container fixed z-[9999] w-[220px] rounded-xl border border-[#3E3E3E] bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] shadow-xl py-2"
            >
              {helpMenuItems.map((item, i) =>
                item.type === "divider" ? (
                  <hr key={i} className="border-t border-[#3E3E3E] my-2" />
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      item.action();
                      setIsHelpMenuOpen(false); // close menu on selection
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

      {/* DELETE CONFIRMATION (Unchanged) */}
      {/* ... (Delete Confirmation Modal) */}
      <AnimatePresence>
        {phaseToDelete !== null && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }} className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
            <div className="bg-[#2C2C2C] p-5 rounded-xl border border-gray-700 w-[280px] text-center shadow-lg">
              <h2 className="text-white text-sm font-medium mb-3">Are you sure you want to delete this phase?</h2>

              <div className="flex justify-center gap-3 mt-2">
                <button onClick={() => { setPhases((p) => p.filter((_, i) => i !== phaseToDelete)); setPhaseToDelete(null); }} className="px-3 py-1.5 bg-[#A50000] text-white rounded-md text-sm hover:bg-red-700">Delete</button>
                <button onClick={() => setPhaseToDelete(null)} className="px-3 py-1.5 bg-[#3D3D3D] text-gray-200 rounded-md text-sm hover:bg-gray-600">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal (Unchanged) */}
      <AnimatePresence>
        {formModal && <FormModal type={formModal} onClose={() => setFormModal(null)} onSubmit={handleFormSubmit} />}
      </AnimatePresence>
      
      {/* 4. RENDER THE IMPORT OVERLAY */}
      <AnimatePresence>
        {showImportModal && (
          <ImportOverlay 
            onClose={() => setShowImportModal(false)}
            onFileSelected={handleFileImport}
          />
        )}
      </AnimatePresence>

    </div>
  );
}