import React from "react";

import "./number-input.css";

type NumberInputProps = {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function NumberInput({ label = "Choose a Number", onInput, ...props }: NumberInputProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    onInput?.(e);
  };

  return (
    <div className="number-input-wrapper">
      <small className="no-sel default">{label}</small>
      <input {...props} className="size-m number-input" onInput={handleInput} inputMode="numeric" type="text" />
    </div>
  );
}
