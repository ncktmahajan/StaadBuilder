import React, { useState } from "react";
import {
  Eye,
  MousePointer2,
  SquareMousePointer,
  Trash2,
  Move,
  // RotateCcw,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
} from "lucide-react";

// 🔹 Top Toolbar (with Perspective / Orthographic toggle + animation)
function TopToolbar() {
  const [activeTool, setActiveTool] = useState("member");
  const [hoveredTool, setHoveredTool] = useState(null);
  const [isPerspective, setIsPerspective] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const toolbarItems = [
    { id: "view", label: "View", icon: <Eye size={20} strokeWidth={1.5} /> },
    { id: "undo", label: "Undo", icon: <Undo2 size={20} strokeWidth={1.5} /> },
    { id: "redo", label: "Redo", icon: <Redo2 size={20} strokeWidth={1.5} /> },
    "divider",
    { id: "member", label: "Member", icon: <MousePointer2 size={20} strokeWidth={1.5} /> },
    { id: "node", label: "Node", icon: <SquareMousePointer size={20} strokeWidth={1.5} /> },
    { id: "delete", label: "Delete", icon: <Trash2 size={20} strokeWidth={1.5} /> },
    "divider",
    { id: "pan", label: "Pan", icon: <Move size={20} strokeWidth={1.5} /> },
    { id: "zoomIn", label: "Zoom In", icon: <ZoomIn size={20} strokeWidth={1.5} /> },
    { id: "zoomOut", label: "Zoom Out", icon: <ZoomOut size={20} strokeWidth={1.5} /> },
  ];

  // 🔁 Handle toggle with rotation animation
  const toggleViewMode = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsPerspective(!isPerspective);
      setIsRotating(false);
    }, 250); // match transition timing
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 50,
      }}
    >
      {/* 🧭 Main Toolbar */}
      <div
        style={{
          backgroundColor: "#2C2C2C",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          gap: "10px",
          color: "white",
        }}
      >
        {toolbarItems.map((item, index) =>
          item === "divider" ? (
            <div
              key={index}
              style={{
                width: "1px",
                height: "26px",
                backgroundColor: "rgba(255,255,255,0.25)",
                margin: "0 4px",
              }}
            />
          ) : (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={() => setHoveredTool(item.id)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Icon Button */}
              <button
                onClick={() => setActiveTool(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "6px",
                  backgroundColor:
                    activeTool === item.id ? "#3B3B3B" : "transparent",
                  border:
                    activeTool === item.id
                      ? "1px solid rgba(255,255,255,0.25)"
                      : "1px solid transparent",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              >
                {React.cloneElement(item.icon, {
                  color: activeTool === item.id ? "#FFFFFF" : "#BBBBBB",
                })}
              </button>

              {/* Tooltip (Bottom Positioned) */}
              {hoveredTool === item.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#1F1F1F",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    opacity: 1,
                    transition: "opacity 0.2s ease",
                    zIndex: 999,
                  }}
                >
                  {item.label}
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#1F1F1F",
                    }}
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* 🔹 Perspective / Orthographic Toggle */}
      <div
        style={{
          backgroundColor: "#2C2C2C",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "46px",
          height: "46px",
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.25s ease",
          position: "relative",
        }}
        onClick={toggleViewMode}
        onMouseEnter={() => setHoveredTool("viewMode")}
        onMouseLeave={() => setHoveredTool(null)}
      >
        <img
          src={
            isPerspective
              ? "/perspective.png"
              : "/orthographic.png"
          }
          alt={isPerspective ? "Perspective" : "Orthographic"}
          style={{
            width: "28px",
            height: "28px",
            transform: isRotating
              ? "rotateY(180deg) scale(0.9)"
              : "rotateY(0deg) scale(1)",
            transition: "transform 0.25s ease",
          }}
        />

        {/* Hover highlight glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "10px",
            boxShadow:
              hoveredTool === "viewMode"
                ? "0 0 8px rgba(255,255,255,0.3)"
                : "none",
            transition: "box-shadow 0.2s ease",
            pointerEvents: "none",
          }}
        />

        {/* Tooltip */}
        {hoveredTool === "viewMode" && (
          <div
            style={{
              position: "absolute",
              top: "58px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#1F1F1F",
              color: "white",
              padding: "4px 8px",
              fontSize: "11px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              opacity: 1,
              zIndex: 999,
            }}
          >
            {isPerspective ? "Perspective View" : "Orthographic View"}
            <div
              style={{
                position: "absolute",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "6px",
                height: "6px",
                backgroundColor: "#1F1F1F",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopToolbar;