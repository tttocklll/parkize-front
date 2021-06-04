import React, { useState } from "react";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { Button, Form, Input, Layout } from "antd";

export default function Register() {
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    const params = {
      mode: "register",
      name,
      car_number: carNumber,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    console.log(res);
    setIsLoading(false);
  };
  return (
    <Layout.Content>
      <h1>Register</h1>
      <Form>
        <Form.Item label="名前" required>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </Form.Item>
        {/* TODO: エラーメッセージ（tooltipと同じで良さそう） */}
        <Form.Item
          label="車ナンバー"
          tooltip="「・」は0で埋め、かならず4桁の数字で入力してください"
          required
        >
          <Input
            onChange={(e) => setCarNumber(e.target.value)}
            value={carNumber}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onClick} loading={isLoading}>
            送信
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}
