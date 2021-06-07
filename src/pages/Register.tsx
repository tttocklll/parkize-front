import React, { useState } from "react";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { Button, Form, FormItemProps, Input, Layout } from "antd";
import { findAllByDisplayValue } from "@testing-library/dom";

export default function Register() {
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [carNunmberStatus, setCarNumberStatus] =
    useState<FormItemProps["validateStatus"]>("");

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
  const carNumberValidation = (value: string) => {
    if (value.match(/[0-9]{4}/) && value.length === 4) {
      setCarNumberStatus("success");
    } else {
      setCarNumberStatus("error");
    }
  };
  const onChangeCarNumber = (value: string) => {
    setCarNumber(value);
    carNumberValidation(value);
  };

  return (
    <Layout.Content>
      <h1>登録</h1>
      <Form>
        <Form.Item label="名前" required>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </Form.Item>
        {/* TODO: エラーメッセージ（tooltipと同じで良さそう） */}
        <Form.Item
          label="車ナンバー"
          tooltip="「・」は0で埋め、かならず4桁の数字で入力してください"
          required
          hasFeedback
          validateStatus={carNunmberStatus}
          help="「・」は0で埋め、かならず4桁の数字で入力してください"
        >
          <Input
            onChange={(e) => onChangeCarNumber(e.target.value)}
            value={carNumber}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={onClick}
            loading={isLoading}
            disabled={!name || carNunmberStatus !== "success"}
          >
            送信
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}
