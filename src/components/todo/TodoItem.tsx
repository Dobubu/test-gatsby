import React, { memo } from "react";
import { Checkbox, Button, Flex, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { red, gray } from "@ant-design/colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw";

dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

const formatTimeAgo = (dateString) => dayjs(dateString).fromNow();

const TodoItem = ({ index, todo, onChangeCheckBox, onDeleteTodo }) => {
  console.log("TodoItem re-render, ", todo.title, index);

  return (
    <Flex align="center" justify="space-between" style={{ width: "100%" }}>
      <Checkbox
        onChange={(e) => onChangeCheckBox(e, todo.id)}
        checked={todo.completed}
      >
        {todo.title}
      </Checkbox>

      <Flex style={{ marginLeft: "auto" }} align="center" gap="middle">
        <Flex vertical>
          <span style={{ fontSize: 12 }}>
            {formatTimeAgo(todo.created)} 建立
          </span>
          <span style={{ fontSize: 10, color: gray[3] }}>{todo.created}</span>
        </Flex>
        <Tooltip title="Delete">
          <Button
            type="primary"
            shape="circle"
            style={{ background: red[3] }}
            icon={<DeleteOutlined />}
            onClick={() => onDeleteTodo(todo.id)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.todo.title === nextProps.todo.title &&
    prevProps.todo.completed === nextProps.todo.completed
  );
};

export default memo(TodoItem, arePropsEqual);
