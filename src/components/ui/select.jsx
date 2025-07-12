import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onValueChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="border rounded p-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {value}
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow">
          {children.map((child) =>
            child.type === SelectItem
              ? { ...child, props: { ...child.props, onSelect: handleSelect } }
              : child
          )}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <div className="">{children}</div>;
}

export function SelectItem({ children, value, onSelect }) {
  return (
    <div
      className="p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
