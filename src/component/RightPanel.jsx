import { useState } from "react";
import { Plus, Minus, ChevronDown, RotateCcw } from "lucide-react";


export default function RightPanel() {
  const [columns, setColumns] = useState([{ id: 1 }]);
  const [members, setMembers] = useState([{ id: 1 }]);
  const [ties, setTies] = useState([{ id: 1 }]);

  // Add/Remove handlers
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

  return (
     <div
  className="absolute right-[15px] top-[15px] bottom-[15px] w-[300px] bg-[#2C2C2C] text-white
             rounded-xl shadow-lg flex flex-col border border-gray-800 z-40 overflow-hidden"
 >

    {/*<div
      className="absolute w-[300px] bg-[#2C2C2C] text-white
                 shadow-lg flex flex-col border border-gray-800 overflow-hidden 
                 inset-y-0 right-0"
    > */} 
      {/* 🧭 FIXED HEADER */}
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

      {/* 🔹 SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        {/* Project Workflow */}
        <section>
          <h3 className="text-sm font-medium mb-4 text-white">Project Workflow</h3> 
          
          {/* Main Flex Container for the entire workflow line */}
          <div className="flex items-center justify-between relative">
            
            {/* The main line connecting all steps (placed in the background) */}
            <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 h-[1.5px] bg-[#D9D9D9] mx-5" />

            {["Line", "Design", "Detailing", "Drawing"].map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative z-10 group"
            >
              {/* Outer Ring (acts as border) */}
              <div
                className={`p-[2px] rounded-full transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-br from-[#256AFF] to-[#1C4BC3]"
                    : "bg-[#D9D9D9]"
                }`}
              >
                {/* Inner Circle (gives visible gap effect) */}
                <div
                  className={`w-[19px] h-[19px] border-[3px] border-[#3A3A3A] rounded-full transition-all duration-300 ${
                    index === 0
                      ? "bg-[#256AFF]"
                      : "bg-[#3A3A3A]"
                  }`}
                ></div>
              </div>
                
                {/* Step Label */}
                <span className="text-xs mt-1 text-gray-300 whitespace-nowrap">{step}</span>
              </div>
            ))}
          </div>
        </section>


        {/* Grid Plane */}
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

        {/* Column Section */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2 text-white">
            <h3 className="text-sm font-medium">Column</h3>
            <button onClick={() => addItem(columns, setColumns, { type: 'Column' })}>
              <Plus size={16} />
            </button>
          </div>

          {columns.map((col) => (
            <div
              key={col.id}
              className="bg-[#3E3E3E] p-2 rounded-lg mb-2 text-xs space-y-2 text-gray-300"
            >
              {/* 1. Type and Remove Button - ALL ON ONE LINE */}
              <div className="flex items-center justify-between gap-2">
                {/* Label and Dropdown Group */}
                <div className="flex items-center gap-2 flex-1">
                  <label className="text-xs w-10">Type</label>
                  
                  {/* WRAPPER for Custom Dropdown Icon */}
                  <div className="relative flex-1">
                    <select 
                      className="bg-[#656565] w-full px-2 py-1 rounded-md text-xs text-gray-200 
                                pr-8 appearance-none" // pr-8 for icon space, appearance-none hides native arrow
                      style={{ minWidth: '0' }}
                    >
                      <option>Column</option>
                      <option>Rafter</option>
                    </select>

                    {/* CUSTOM ICON - Nudged to the left */}
                    <ChevronDown 
                      size={14} 
                      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" 
                      style={{ right: '8px' }} // Custom adjustment, shifting 8px left from the edge
                    />
                  </div>
                </div>
                
                {/* Remove Button */}
                <button onClick={() => removeItem(col.id, columns, setColumns)}>
                  <Minus size={14} />
                </button>
              </div>


              {/* 2. Point (X and Y) Inputs - Now includes the Point(X,Y) label */}
              <div className="flex items-center gap-2"> 
                {/* New Label for Point(X,Y) */}
                <label className="text-xs w-10 whitespace-nowrap">Point</label> 
                
                {/* The padding/margin is no longer needed on the outer div because the label now takes the space */}
                <div className="flex flex-1 items-center gap-2 pr-[22px]"> {/* flex-1 takes up the remaining width */}
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
            </div>
          ))}
        </section>

        {/* Member Section */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Member</h3>
            <button
              onClick={() =>
                addItem(members, setMembers, { startChecked: false, endChecked: false })
              }
            >
              <Plus size={16} />
            </button>
          </div>

          {members.map((mem) => (
            <div
              key={mem.id}
              className="bg-[#3E3E3E] p-2 rounded-lg mb-2 text-xs space-y-2"
            >
              {/* Start */}
              <div className="flex justify-between items-center gap-2">
                {/* 1. FIXED LABEL WIDTH */}
                <label className="w-10">Start</label> 
                {/* This container must allow children to shrink => min-w-0 */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* checkbox: fixed size, do not shrink */}
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
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  {/* input: flex-1 and allow shrinking via min-w-0 */}
                  <input
                    type="text"
                    placeholder="Node"
                    className="bg-[#4E4E4E] px-2 py-1 flex-1 min-w-0 rounded-md text-xs"
                  />
                </div>
                {/* REMOVE BUTTON IS OUTSIDE THE FLEX-1 INPUT GROUP */}
                <button onClick={() => removeItem(mem.id, members, setMembers)}>
                  <Minus size={14} />
                </button>
              </div>

              {/* End */}
              <div className="flex justify-between items-center gap-2">
                {/* 1. FIXED LABEL WIDTH */}
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
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
            </div>
          ))}
        </section>

        {/* TIE Members Section */}
        <section className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">TIE Members</h3>
            <button onClick={() => addItem(ties, setTies)}>
              <Plus size={16} />
            </button>
          </div>

          {ties.map((tie) => (
            <div
              key={tie.id}
              className="bg-[#3D3D3D] p-2 rounded-lg mb-2 text-xs flex justify-between items-center"
            >
              <label>Node No.</label>
              <input
                type="text"
                placeholder="Node"
                className="bg-[#4E4E4E] px-2 py-1 rounded-md w-[65%] text-xs"
              />
              <button onClick={() => removeItem(tie.id, ties, setTies)}>
                <Minus size={14} />
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* 🔘 Update Button */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-[#3D3D3D] text-white text-[14px] py-2 rounded-md flex justify-center items-center gap-2 hover:bg-[#4a4a4a] transition">
          <RotateCcw size={14} /> Update Model
        </button>
      </div>
    </div>
  );
}


         