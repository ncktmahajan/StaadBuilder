import { useState } from "react";
import { Plus, Minus, ChevronDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RightPanel() {
  const [columns, setColumns] = useState([{ id: 1 }]);
  const [members, setMembers] = useState([{ id: 1 }]);
  const [ties, setTies] = useState([{ id: 1 }]);

  const addItem = (list, setList) =>
    setList([...list, { id: Date.now() }]);

  const removeItem = (id, list, setList) =>
    setList(list.filter((item) => item.id !== id));

  const toggleCheckbox = (id, list, setList, key) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, [key]: !item[key] } : item
      )
    );
  };

  // ANIMATION VARIANTS
  const itemAnim = {
    initial: { opacity: 0, scale: 0.9, y: -6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.85, y: -6 },
    transition: { duration: 0.18, ease: "easeOut" }
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute right-[15px] top-[15px] bottom-[15px] w-[300px] bg-[#2C2C2C] text-white
                  rounded-xl shadow-lg flex flex-col border border-gray-800 z-40 overflow-hidden"
      >

      {/* HEADER */}
      <div className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full border-2 border-[#256AFF]">
            <img
              src="https://randomuser.me/api/portraits/men/36.jpg"
              alt="User"
              className="w-[35px] h-[35px] rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-[1px] rounded-md bg-gradient-to-br from-[#CCCCCC] to-[#666666] inline-block">
            <button className="px-3 py-1.5 rounded-md text-sm bg-[#3D3D3D] text-white hover:bg-gray-600 transition">
              Share
            </button>
          </div>

          <div className="p-[1px] rounded-md bg-gradient-to-br from-[#164099] to-[#FFFFFF] inline-block">
            <button className="px-3 py-1.5 bg-blue-600 rounded-md text-sm text-white hover:bg-[#256AFF] transition">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* SCROLL CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        {/* PROJECT WORKFLOW (unchanged) */}
        <section>
          <h3 className="text-sm font-medium mb-4 text-white">Project Workflow</h3>

          <div className="flex items-center justify-between relative">
            <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 h-[1.5px] bg-[#D9D9D9] mx-5" />

            {["Line", "Design", "Detailing", "Drawing"].map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10 group">
                <div
                  className={`p-[2px] rounded-full transition-all duration-300 ${
                    index === 0
                      ? "bg-gradient-to-br from-[#256AFF] to-[#1C4BC3]"
                      : "bg-[#D9D9D9]"
                  }`}
                >
                  <div
                    className={`w-[19px] h-[19px] border-[3px] border-[#3A3A3A] rounded-full transition-all duration-300 ${
                      index === 0 ? "bg-[#256AFF]" : "bg-[#3A3A3A]"
                    }`}
                  ></div>
                </div>

                <span className="text-xs mt-1 text-gray-300 whitespace-nowrap">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* GRID PLANE (unchanged) */}
        <section className="border-t border-gray-700 pt-4">
          <h3 className="text-sm font-medium mb-2">Grid Plane</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs w-4">X</span>
              <input
                type="text"
                placeholder="0 30800"
                className="flex-1 bg-[#3D3D3D] text-xs px-2 py-1 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-4">Y</span>
              <input
                type="text"
                placeholder="0 7500 7500 8000 7500 7500"
                className="flex-1 bg-[#3D3D3D] text-xs px-2 py-1 rounded-md focus:outline-none"
              />
            </div>
            <button className="w-full bg-[#256AFF] text-sm rounded-md py-2 hover:bg-blue-700 transition">
              Place the Grid
            </button>
          </div>
        </section>

        {/* COLUMN SECTION */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2 text-white">
            <h3 className="text-sm font-medium">Column</h3>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.75 }}
              onClick={() => addItem(columns, setColumns)}
            >
              <Plus size={16} />
            </motion.button>
          </div>

          <AnimatePresence>
            {columns.map((col) => (
              <motion.div
                key={col.id}
                {...itemAnim}
                className="bg-[#3E3E3E] p-2 rounded-lg mb-2 text-xs space-y-2 text-gray-300"
              >
                {/* Type */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <label className="text-xs w-10">Type</label>

                    <div className="relative flex-1">
                      <select
                        className="bg-[#656565] w-full px-2 py-1 rounded-md text-xs text-gray-200 pr-8 appearance-none"
                      >
                        <option>Column</option>
                        <option>Rafter</option>
                      </select>

                      <ChevronDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.75 }}
                    onClick={() => removeItem(col.id, columns, setColumns)}
                  >
                    <Minus size={14} />
                  </motion.button>
                </div>

                {/* Point */}
                <div className="flex items-center gap-2">
                  <label className="text-xs w-10">Point</label>

                  <div className="flex flex-1 items-center gap-2 pr-[22px]">
                    <input
                      type="text"
                      placeholder="X"
                      className="bg-[#4E4E4E] px-2 py-1 w-1/2 rounded-md text-center text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Y"
                      className="bg-[#4E4E4E] px-2 py-1 w-1/2 rounded-md text-center text-xs"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* MEMBER SECTION */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Member</h3>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.75 }}
              onClick={() => addItem(members, setMembers)}
            >
              <Plus size={16} />
            </motion.button>
          </div>

          <AnimatePresence>
            {members.map((mem) => (
              <motion.div
                key={mem.id}
                {...itemAnim}
                className="bg-[#3E3E3E] p-2 rounded-lg mb-2 text-xs space-y-2"
              >
                {/* Start */}
                <div className="flex justify-between items-center gap-2">
                  <label className="w-10">Start</label>

                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-4 h-4 rounded-sm border cursor-pointer flex items-center justify-center shrink-0 ${
                        mem.startChecked ? "bg-[#A50000] border-[#A50000]" : "border-[#CFAD00]"
                      }`}
                      onClick={() =>
                        toggleCheckbox(mem.id, members, setMembers, "startChecked")
                      }
                    >
                      {mem.startChecked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          strokeWidth="3"
                          className="w-3 h-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Node"
                      className="bg-[#4E4E4E] px-2 py-1 flex-1 min-w-0 rounded-md text-xs"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.75 }}
                    onClick={() => removeItem(mem.id, members, setMembers)}
                  >
                    <Minus size={14} />
                  </motion.button>
                </div>

                {/* End */}
                <div className="flex justify-between items-center gap-2">
                  <label className="w-10">End</label>

                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-4 h-4 rounded-sm border cursor-pointer flex items-center justify-center shrink-0 ${
                        mem.endChecked ? "bg-[#A50000] border-[#A50000]" : "border-[#CFAD00]"
                      }`}
                      onClick={() =>
                        toggleCheckbox(mem.id, members, setMembers, "endChecked")
                      }
                    >
                      {mem.endChecked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          strokeWidth="3"
                          className="w-3 h-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Height"
                      className="bg-[#4E4E4E] px-2 py-1 flex-1 min-w-0 rounded-md text-xs"
                    />
                  </div>

                  <div className="w-[14px]"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* TIE MEMBERS */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">TIE Members</h3>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.75 }}
              onClick={() => addItem(ties, setTies)}
            >
              <Plus size={16} />
            </motion.button>
          </div>

          <AnimatePresence>
            {ties.map((tie) => (
              <motion.div
                key={tie.id}
                {...itemAnim}
                className="bg-[#3D3D3D] p-2 rounded-lg mb-2 text-xs flex justify-between items-center"
              >
                <label>Node No.</label>

                <input
                  type="text"
                  placeholder="Node"
                  className="bg-[#4E4E4E] px-2 py-1 rounded-md w-[65%] text-xs"
                />

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.75 }}
                  onClick={() => removeItem(tie.id, ties, setTies)}
                >
                  <Minus size={14} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>

      {/* UPDATE MODEL BUTTON */}
      <div className="p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          className="w-full bg-[#3D3D3D] text-white text-[14px] py-2 rounded-md flex justify-center items-center gap-2 hover:bg-[#4a4a4a] transition"
        >
          <RotateCcw size={14} /> Update Model
        </motion.button>
      </div>
    </motion.div>
  );
}
