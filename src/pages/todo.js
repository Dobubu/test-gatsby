import React, { useState, useEffect, useCallback } from "react";
import { Tabs, Button, Flex, ConfigProvider, theme } from "antd";
import { green } from "@ant-design/colors";

import Layout from "../components/layout";
import { Seo } from "../components/seo";
import TodoInput from "../components/todo/TodoInput";
import TodoItem from "../components/todo/TodoItem";

const items = [
  {
    key: "all",
    label: "全部",
    children: "Content of Tab Pane 1",
  },
  {
    key: "completed",
    label: "完成",
    children: "Content of Tab Pane 2",
  },
  {
    key: "uncompleted",
    label: "未完成",
    children: "Content of Tab Pane 3",
  },
];

const defaultTodoList = [
  {
    title: "Learn Gatsby",
    completed: true,
  },
  {
    title: "Build a website",
    completed: false,
  },
  {
    title: "Deploy the website",
    completed: false,
  },
];

function TodoPage() {
  console.log("TodoPage re-render -------");

  const [isDark, setIsDark] = useState(false);
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [filteredTodos, setFilteredTodos] = useState(todoList);
  const [currentTab, setCurrentTab] = useState("all");

  // 當 todoList 或 currentTab 變化時，更新 filteredTodos
  useEffect(() => {
    const getFilteredTodos = () => {
      switch (currentTab) {
        case "completed":
          return todoList.filter((todo) => todo.completed);
        case "uncompleted":
          return todoList.filter((todo) => !todo.completed);
        default:
          return todoList;
      }
    };

    setFilteredTodos(getFilteredTodos());
  }, [todoList, currentTab]);

  const onChangeTab = (key) => {
    console.log(key);
    setCurrentTab(key);
  };

  const onChangeCheckBox = (e, index) => {
    console.log("index: ", index);
    console.log("e: ", e);

    // 根據過濾後的索引找到原始 todoList 中的實際索引
    const originalIndex = todoList.findIndex(
      (item) => item === filteredTodos[index]
    );
    if (originalIndex !== -1) {
      const newTodoList = [...todoList];
      newTodoList[originalIndex].completed = e.target.checked;
      setTodoList(newTodoList);
    }
  };

  const handleAddTodo = useCallback((todoValue) => {
    if (todoValue.trim() === "") return;

    const newTodo = {
      title: todoValue,
      completed: false,
    };

    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }, []);

  const handleDeleteTodo = (index) => {
    // 根據過濾後的索引找到原始 todoList 中的實際索引
    const originalIndex = todoList.findIndex(
      (item) => item === filteredTodos[index]
    );
    if (originalIndex !== -1) {
      const newTodoList = todoList.filter((_, i) => i !== originalIndex);
      setTodoList(newTodoList);
    }
  };

  return (
    <Layout pageTitle="My Todo">
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Flex gap="middle" style={{ marginBottom: 16 }}>
          <Button
            onClick={() => setIsDark(!isDark)}
            style={{ marginLeft: "auto" }}
          >
            切換 {isDark ? "Light" : "Dark"} 模式
          </Button>
          <Button type="primary" style={{ background: green[6] }}>
            排序：新到舊
          </Button>
        </Flex>

        <Flex gap="middle" style={{ marginBottom: 16 }}>
          <TodoInput onAdd={handleAddTodo} />
        </Flex>
      </ConfigProvider>

      <hr />
      <Tabs defaultActiveKey="all" items={items} onChange={onChangeTab} />

      <Flex gap="middle" wrap>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            onChangeCheckBox={onChangeCheckBox}
            onDeleteTodo={handleDeleteTodo}
          ></TodoItem>
        ))}
      </Flex>
    </Layout>
  );
}

export const Head = () => <Seo title="Todo Page" />;

export default TodoPage;
