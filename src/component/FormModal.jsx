import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackForm from "./Form";

export default function FormModal({ type, onClose, onSubmit }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const config = {
    feedback: {
      title: "Give feedback",
      subtitle: "Please fill the form below with your feedback.",
      fields: {
        titleLabel: "Title",
        titlePlaceholder: "Feedback title",
        descLabel: "Feedback",
        descPlaceholder: "Describe your feedback",
      },
    },
    bug: {
      title: "Report a Bug",
      subtitle: "Please fill the form below with your report.",
      fields: {
        titleLabel: "Title",
        titlePlaceholder: "Bug title",
        descLabel: "Report a Bug",
        descPlaceholder: "Describe your bug",
      },
    },
    feature: {
      title: "Request a feature",
      subtitle: "Please fill the form below with your request.",
      fields: {
        titleLabel: "Title",
        titlePlaceholder: "Feature title",
        descLabel: "Request a feature",
        descPlaceholder: "Describe your feature",
      },
    },
  };

  if (!type) return null;
  const cfg = config[type];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim() && !values.description.trim()) {
      alert("Please enter a title or description.");
      return;
    }
    onSubmit(type, values);
    onClose();
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[99999]"
      >

        {/* ⚠️ WRAP FORM + CLOSE IN A RELATIVE CONTAINER */}
        <div className="relative">

          {/* ✅ OUTSIDE CLOSE BUTTON – now positioned relative to the form */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.15, duration: 0.2 }
            }}
            className="
              absolute 
              -right-[40px] 
              top-[10px]
              w-[35px] h-[35px]
              bg-[#383838] 
              border border-[#7D7D7D]
              rounded-full
              flex items-center justify-center
              text-white text-[16px]
              hover:bg-[#4A4A4A] transition
              z-[100000]
            "
          >
            ✕
          </motion.button>

          {/* MAIN FORM */}
          <motion.form
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 14,
              transition: { duration: 0.18, ease: "easeInOut" },
            }}
            onSubmit={handleSubmit}
            className="
              w-[450px] h-[550px]
              bg-[#383838]
              rounded-2xl 
              p-8 
              border border-[#7D7D7D]
              shadow-xl 
              flex flex-col
            "
          >
            {/* Title */}
            <h2 className="text-white text-[26px] font-regular text-center mb-1">
              {cfg.title}
            </h2>

            <p className="text-gray-400 text-center font-light text-[15px] mb-7">
              {cfg.subtitle}
            </p>

            {/* Form fields */}
            <FeedbackForm
              values={values}
              setValues={setValues}
              fields={cfg.fields}
            />

            {/* Submit Button */}
            <div className="p-[1px] rounded-md bg-gradient-to-br from-[#164099] to-[#FFFFFF] inline-block">
            <button
              type="submit"
              className="
                mt-auto w-full py-3 rounded-xl text-white text-[17px]
                bg-[#256AFF] hover:bg-[#1A55D9] transition duration-150
              "
            >
              Submit
            </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
