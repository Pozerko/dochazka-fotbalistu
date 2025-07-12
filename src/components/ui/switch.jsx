import { useState } from "react";

export function Switch({ checked, onCheckedChange }) {
  const [internalChecked, setInternalChecked] = useState(checked);

  const toggle = () => {
    const newVal = !internalChecked;
    setInternalChecked(newVal);
    onCheckedChange(newVal);
  };

  return (
    <div
      onClick={toggle}
      className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${internalChecked ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${internalChecked ? "translate-x-4" : ""}`}
      ></div>
    </div>
  );
}
