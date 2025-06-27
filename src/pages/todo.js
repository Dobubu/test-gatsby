import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Tabs,
  Button,
  Flex,
  Tooltip,
  ConfigProvider,
  theme,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { red, green } from "@ant-design/colors";

import Layout from "../components/layout";
import { Seo } from "../components/seo";

const items = [
  {
    key: "1",
    label: "全部",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "完成",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
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
  const [isDark, setIsDark] = useState(false);

  const onChangeTab = (key) => {
    console.log(key);
  };

  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
          <Input placeholder="輸入待辦事項..." />
          <Button type="primary">新增</Button>
        </Flex>
      </ConfigProvider>

      <hr />
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />

      <Flex gap="middle" wrap>
        {defaultTodoList.map((todo) => (
          <Flex
            align="center"
            justify="space-between"
            key={Math.random()}
            style={{ width: "100%" }}
          >
            <Checkbox onChange={onChangeCheckBox} checked={todo.completed}>
              {todo.title}
            </Checkbox>

            <Flex style={{ marginLeft: "auto" }} align="center" gap="middle">
              <span style={{ fontSize: 12 }}>剩餘: 5小時</span>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  shape="circle"
                  style={{ background: red[3] }}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Layout>
  );
}

export const Head = () => <Seo title="Todo Page" />;

export default TodoPage;
