import React, { useState, useCallback, useMemo } from "react";
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
    id: 1,
    title: "Learn Gatsby",
    completed: true,
  },
  {
    id: 2,
    title: "Build a website",
    completed: false,
  },
  {
    id: 3,
    title: "Deploy the website",
    completed: false,
  },
];

function TodoPage() {
  console.log("TodoPage re-render -------");

  const [isDark, setIsDark] = useState(false);
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [currentTab, setCurrentTab] = useState("all");

  const filteredTodos = useMemo(() => {
    switch (currentTab) {
      case "completed":
        return todoList.filter((todo) => todo.completed);
      case "uncompleted":
        return todoList.filter((todo) => !todo.completed);
      default:
        return todoList;
    }
  }, [todoList, currentTab]);

  const onChangeTab = (key) => {
    console.log(key);
    setCurrentTab(key);
  };

  const onChangeCheckBox = (e, id) => {
    const checked = e.target.checked;

    setTodoList((prevTodoList) => {
      const newTodoList = prevTodoList.map((todo, i) =>
        todo.id === id ? { ...todo, completed: checked } : todo
      );
      return newTodoList;
    });
  };

  const handleAddTodo = useCallback((todoValue) => {
    if (todoValue.trim() === "") return;

    const newTodo = {
      title: todoValue,
      completed: false,
    };

    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }, []);

  const handleDeleteTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todo) => todo.id !== id)
    );
  };

  const todoItemsList = () => {
    return filteredTodos.map((todo, index) => (
      <TodoItem
        key={todo.id}
        index={index}
        todo={todo}
        onChangeCheckBox={onChangeCheckBox}
        onDeleteTodo={handleDeleteTodo}
      />
    ));
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
        {todoItemsList()}
      </Flex>
    </Layout>
  );
}

export const Head = () => <Seo title="Todo Page" />;

export default TodoPage;
