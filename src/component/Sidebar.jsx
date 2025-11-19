import React, {useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  Home,
  Pencil,
  Trash2,
  Layers,
  HelpCircle,
  Settings,
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active, onClick, innerRef }) => (
  <div
    ref={innerRef}
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all
      ${
        active
          ? "bg-[#3A3A3A] text-white rounded-xl shadow-sm"
          : "text-[#d0d0d0] hover:text-white"
      }`}
  >
    <Icon size={18} strokeWidth={1.6} />
    <span className="text-[15px]">{label}</span>
  </div>
);

export default function Sidebar({ setFormModal }) {
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [helpMenuPosition, setHelpMenuPosition] = useState({ top: 0, left: 0 });

  const helpButtonRef = useRef(null);

  const helpMenuItems = [
    { label: "Staad Builder Docs", action: () => console.log("Docs") },
    { label: "Tutorial", action: () => console.log("Tutorial") },
    { type: "divider" },
    { label: "Send Feedback", action: () => setFormModal("feedback") },
    { label: "Report Bug", action: () => setFormModal("bug") },
    { label: "Feature Request", action: () => setFormModal("feature") },
  ];

const helpMenuRef = useRef(null);

const openHelpMenu = () => {
  if (helpButtonRef.current) {
    const rect = helpButtonRef.current.getBoundingClientRect();

    const top = rect.top - 200;   // opens ABOVE
    const left = rect.left + 10;  // aligned horizontally

    setHelpMenuPosition({ top, left });
    setIsHelpMenuOpen(true);
  }
};

useEffect(() => {
  function handleClickOutside(e) {
    if (
      helpMenuRef.current &&
      !helpMenuRef.current.contains(e.target) &&
      !helpButtonRef.current.contains(e.target)
    ) {
      setIsHelpMenuOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  return (
    <>
      <aside className="w-[250px] bg-[#2A2A2A] h-[calc(100vh-64px)] flex flex-col py-3 border-r border-[#525151]">
        
        <div className="px-2">
          <SidebarItem icon={Home} label="Home" active />

          <div className="mt-3">
            <SidebarItem icon={Pencil} label="My files" />
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-full border-t border-[#3a3a3a] my-2" />

        <div className="px-4 flex flex-col gap-1">
          <SidebarItem icon={Trash2} label="Trash" />
          <SidebarItem icon={Layers} label="Updates" />

          {/* HELP & FEEDBACK (opens menu) */}
          <SidebarItem
            icon={HelpCircle}
            label="Help & Feedback"
            innerRef={helpButtonRef}
            onClick={openHelpMenu}
          />

          <SidebarItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* HELP MENU PORTAL */}
      {isHelpMenuOpen &&
        ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              ref={helpMenuRef}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.18 }}
              style={{
                top: helpMenuPosition.top,
                left: helpMenuPosition.left,
              }}
              className="fixed z-[9999] w-[220px] rounded-xl border border-[#3E3E3E] bg-gradient-to-b from-[#2C2C2C] to-[#1E1E1E] shadow-xl py-2"
            >
              {helpMenuItems.map((item, i) =>
                item.type === "divider" ? (
                  <hr key={i} className="border-t border-[#3E3E3E] my-2" />
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      item.action();
                      setIsHelpMenuOpen(false);
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
    </>
  );
}
