import React, { useState, useCallback, useMemo } from "react";
import { Tabs, Button, Flex } from "antd";
import { green } from "@ant-design/colors";

import Layout from "../components/layout";
import { Seo } from "../components/seo";
import TodoInput from "../components/todo/TodoInput";
import TodoItem from "../components/todo/TodoItem";
import ThemeToggleButton from "../components/todo/ThemeToggleButton";
import { ThemeProvider } from "../context/ThemeContext";

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
    created: "2025-06-02",
  },
  {
    id: 2,
    title: "Build a website",
    completed: false,
    created: "2025-06-29",
  },
  {
    id: 3,
    title: "Deploy the website",
    completed: false,
    created: "2025-05-03",
  },
];

function TodoPage() {
  console.log("TodoPage re-render -------");

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

  const [sortState, setSortState] = useState("newest"); // oldest or newest

  const sortedAndFilteredTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      const dataA = new Date(a.created);
      const dataB = new Date(b.created);

      return sortState === "newest" ? dataB - dataA : dataA - dataB;
    });
  }, [filteredTodos, sortState]);

  const handleSortTodos = () => {
    setSortState((prevState) => (prevState === "newest" ? "oldest" : "newest"));
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
    return sortedAndFilteredTodos.map((todo, index) => (
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
      <ThemeProvider>
        <Flex gap="middle" style={{ marginBottom: 16 }}>
          <ThemeToggleButton />
          <Button
            type="primary"
            style={{ background: green[6] }}
            onClick={handleSortTodos}
          >
            排序：{sortState === "newest" ? "新到舊" : "舊到新"}
          </Button>
        </Flex>

        <Flex gap="middle" style={{ marginBottom: 16 }}>
          <TodoInput onAdd={handleAddTodo} />
        </Flex>
      </ThemeProvider>

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
