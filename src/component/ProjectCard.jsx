import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, layout = "grid" }) {
  const href = `/project/${project.id}/file`;

  // LIST VIEW
  if (layout === "list") {
    return (
      <Link to={href}>
        <div className="flex items-center gap-4 bg-[#242424] p-4 rounded-lg border border-[#2b2b2b] cursor-pointer 
          transition-all duration-200 hover:bg-[#2d2d2d] hover:shadow-md hover:-translate-y-[2px]">
          
          <img
            src={project.thumb}
            alt=""
            className="w-32 h-20 object-cover rounded-md"
          />

          <div className="flex-1">
            <div className="text-white font-medium">{project.title}</div>
            <div className="text-gray-400 text-sm">{project.edited}</div>
          </div>

          <div className="text-gray-400 text-sm">•••</div>
        </div>
      </Link>
    );
  }

  // GRID VIEW
  return (
    <Link to={href}>
      <div className="rounded-lg cursor-pointer transition-all duration-200 
        hover:-translate-y-[3px] hover:shadow-lg">

        {/* THUMBNAIL */}
        <div className="bg-white rounded-lg overflow-hidden w-full h-[140px] flex items-center justify-center 
          transition-all duration-200 hover:brightness-105">
          <img
            src={project.thumb}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="mt-[5px]">
          <div className="text-gray-100 font-regular">{project.title}</div>
          <div className="text-gray-400 text-sm mt-[2px] font-light">{project.edited}</div>
        </div>
      </div>
    </Link>
  );
}
