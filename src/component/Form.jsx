import React from "react";

export default function FeedbackForm({ values, setValues, fields }) {
  const onChange = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <div className="w-full">

      {/* TITLE FIELD */}
      <div className="mb-6">
        <label className="text-gray-200 font-light  text-[15px] block mb-2">
          {fields.titleLabel}
        </label>

        <input
          value={values.title}
          onChange={onChange("title")}
          placeholder={fields.titlePlaceholder}
          className="w-full px-3 py-3 rounded-[10px] text-gray-200 font-light  text-[15px] outline-none placeholder:text-gray-400"
          style={{
            background: "#4E4E4E",
            border: "0.5px solid #7D7D7D",
          }}
        />
      </div>

      {/* DESCRIPTION FIELD */}
      <div className="mb-6">
        <label className="text-gray-200 font-light text-[15px] block mb-2">
          {fields.descLabel}
        </label>

        <textarea
          value={values.description}
          onChange={onChange("description")}
          placeholder={fields.descPlaceholder}
          className="w-full px-3 py-3 rounded-[10px] font-light  text-gray-200 text-[15px] outline-none h-[160px] resize-none placeholder:text-gray-400"
          style={{
            background: "#4E4E4E",
            border: "0.5px solid #7D7D7D",
          }}
        />
      </div>
    </div>
  );
}
