import React, { memo } from "react";
import { Form, Input, Button } from "antd";

const TodoInput = ({ onAdd }) => {
  console.log("TodoInput re-render");

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    onAdd(values.todo);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      data-testid="todo-form"
    >
      <Form.Item
        name="todo"
        rules={[{ required: true, message: "請輸入待辦事項" }]}
      >
        <Input
          placeholder="輸入待辦事項..."
          aria-label="待辦事項輸入"
          data-testid="todo-input"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" data-testid="add-button">
        新增
      </Button>
    </Form>
  );
};

export default memo(TodoInput);
