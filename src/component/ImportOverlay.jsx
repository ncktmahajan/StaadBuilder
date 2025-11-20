import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, FolderOpen, FileText, Download } from "lucide-react";

export default function ImportOverlay({ onClose, onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const fileInputRef = useRef(null);
  
  // --- Drag & Drop Handlers ---
  const dropAreaRef = useRef(null);
  const dragCounter = useRef(0); 

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Wrap startSimulatedUpload in useCallback
  const startSimulatedUpload = useCallback((file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setUploadProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Wait a little before closing to show 100%
        setTimeout(() => {
          setIsUploading(false);
          // These functions must be in the dependency array of this useCallback
          onFileSelected(file); 
          onClose();
        }, 300);
      }
    }, 150);
  }, [onClose, onFileSelected]); // Dependencies for startSimulatedUpload

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  }, []); // No dependencies

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []); // No dependencies

  // 🚀 FIX: Add startSimulatedUpload to the dependency array
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0; 
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      startSimulatedUpload(file); // Now included as a dependency
    }
  }, [startSimulatedUpload]); // Dependency added

  
  // Add/Remove listeners when the component mounts/unmounts
  useEffect(() => {
    let div = dropAreaRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragEnter);
      div.addEventListener('dragleave', handleDragLeave);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
    }
    
    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragEnter);
        div.removeEventListener('dragleave', handleDragLeave);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      }
    };
  }, [handleDrag, handleDragEnter, handleDragLeave, handleDrop]); // Dependencies are correct here

  // --- Input Handlers ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Use the stable version of the function
      startSimulatedUpload(file);
    }
  };

  const openFileBrowser = () => {
    fileInputRef.current.click();
  };
  
  // Define styles for aesthetic changes 
  const dragAreaClasses = `
    flex flex-col items-center justify-center p-12 text-center 
    rounded-xl transition-all duration-300 ease-in-out
    ${
      isDragging
        ? "border-2 border-[#84ABFF] bg-[#2C2C2C]/70 shadow-lg scale-[1.03]"
        : "border-2 border-dashed border-gray-600 bg-[#2C2C2C]"
    }
  `;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose} 
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, type: "spring", damping: 18, stiffness: 150 }}
          className="w-full max-w-lg p-6 bg-[#1E1E1E] rounded-2xl shadow-2xl border border-[#3E3E3E] text-white"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#3E3E3E] pb-3 mb-4">
            <h3 className="text-xl font-regular text-[#f4f4f4] flex items-center gap-2">
              <Download size={20} /> Import File
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-[#3E3E3E] transition"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Conditional Rendering: Drag Area OR Progress Bar */}
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="p-12 h-[300px] flex flex-col justify-center items-center"
              >
                <UploadCloud size={64} className="text-[#84ABFF]" />
                <h4 className="mt-4 text-xl font-medium text-white">
                  Uploading File...
                </h4>
                <p className="text-sm text-gray-400 mt-2">
                  Please wait, this should only take a moment.
                </p>

                {/* Progress Bar UI */}
                <div className="w-full mt-8 h-3 bg-[#2C2C2C] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className="h-full bg-[#4566AF] rounded-full"
                  />
                </div>
                <p className="mt-2 text-sm text-[#84ABFF] font-medium">
                  {uploadProgress}% Complete
                </p>
              </motion.div>
            ) : (
              // Drag & Drop Area (Only shown when not uploading)
              <motion.div
                key="dragarea"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                ref={dropAreaRef}
                className={dragAreaClasses}
              >
                <motion.div
                    animate={{ 
                        scale: isDragging ? 1.1 : 1, 
                        y: isDragging ? -5 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <UploadCloud size={64} className={`transition-all ${isDragging ? "text-[#84ABFF]" : "text-gray-400"}`} />
                </motion.div>
                
                <p className="mt-4 text-lg font-medium">
                  {isDragging ? "Drop your file to upload!" : "Drag & Drop your file here"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  (e.g., `.std`, `.staad`)
                </p>
                <p className="mt-4 text-gray-500">- OR -</p>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File Browser Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openFileBrowser}
                  className="mt-4 px-6 py-2 flex items-center gap-2 bg-[#4566AF] hover:bg-[#5A77B9] text-white font-medium rounded-lg shadow-md transition"
                >
                  <FolderOpen size={18} />
                  Browse Local Files
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer/Hint */}
          <div className="mt-5 pt-3 text-center border-t border-[#3E3E3E]">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <FileText size={14} /> Maximum file size: 50MB
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}