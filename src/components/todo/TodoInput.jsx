import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Input } from "antd";

// 我們在此處使用 forwardRef 來向外暴露方法
const TodoInput = forwardRef(function TodoInput({ onChange }, ref) {
  // 使用內部狀態來管理輸入值
  const [inputValue, setInputValue] = useState("");
  console.log("Input re-render");
  const inputRef = useRef(null);

  // 暴露給父組件的方法
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputValue;
    },
    setValue: (value) => {
      setInputValue(value);
    },
    clear: () => {
      setInputValue("");
    },
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  // 處理輸入變化
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  // 處理按下 Enter 鍵時的提交
  function handlePressEnter() {
    onChange(inputValue);
  }

  return (
    <Input
      ref={inputRef}
      placeholder="輸入待辦事項..."
      aria-label="待辦事項輸入"
      value={inputValue}
      onChange={handleChange}
      onPressEnter={handlePressEnter}
    />
  );
});

export default TodoInput;
