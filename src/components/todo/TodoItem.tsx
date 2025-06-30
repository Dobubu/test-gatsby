import React, { memo } from "react";
import { Checkbox, Button, Flex, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";

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
        <span style={{ fontSize: 12 }}>剩餘: 5小時</span>
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
