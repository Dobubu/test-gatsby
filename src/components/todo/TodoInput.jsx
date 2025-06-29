import React from "react";
import { Input } from "antd";

export default function TodoInput({ value, onChange }) {
  console.log("Input re-render");

  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <Input
      placeholder="輸入待辦事項..."
      value={value}
      onChange={handleChange}
      aria-label="待辦事項輸入"
    />
  );
}
