import React, { useState } from "react";
import { Button, Form, FormItemProps, Input, Layout, message } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

export default function Register() {
  // 登録する情報
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carArea, setCarArea] = useState("");
  const [carCategory, setCarCategory] = useState<number | undefined>();
  const [carHiragna, setCarHiragna] = useState("");
  const [carName, setCarName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [section, setSection] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [carNunmberStatus, setCarNumberStatus] =
    useState<FormItemProps["validateStatus"]>("");

  const initializeState = () => {
    setName("");
    setCarNumber("");
    setCarArea("");
    setCarCategory(undefined);
    setCarHiragna("");
    setCarName("");
    setCompanyName("");
    setSection("");
    setCarNumberStatus(undefined);
  };

  const onClick = async () => {
    setIsLoading(true);
    const params = {
      mode: "register",
      name,
      car_number: carNumber,
      car_area: carArea,
      car_category: carCategory,
      car_hiragana: carHiragna,
      car_name: carName,
      company_name: companyName,
      section: section,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    console.log(res);
    if (res.data.success) {
      message.success("登録しました！", 5);
      initializeState();
    } else {
      message.error(res.data.error, 10);
    }
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
      <Button
        type="primary"
        icon={<SendOutlined />}
        shape="circle"
        size="large"
        disabled={!name || carNunmberStatus !== "success"}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "30px",
          zIndex: 100,
        }}
        onClick={onClick}
        loading={isLoading}
      />
      <h1>登録</h1>
      <Form>
        <Form.Item label="名前" required>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </Form.Item>
        <Form.Item label="会社名">
          <Input
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
        </Form.Item>
        <Form.Item label="セクション">
          <Input onChange={(e) => setSection(e.target.value)} value={section} />
        </Form.Item>
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
        <Form.Item label="車地名" help="「品川」「練馬」など">
          <Input onChange={(e) => setCarArea(e.target.value)} value={carArea} />
        </Form.Item>
        <Form.Item label="車ひらがな（1文字）">
          <Input
            onChange={(e) => setCarHiragna(e.target.value)}
            value={carHiragna}
          />
        </Form.Item>
        <Form.Item label="車のカテゴリー番号" help='"300"，"584"などの番号'>
          <Input
            onChange={(e) => setCarCategory(Number(e.target.value))}
            value={carCategory}
          />
        </Form.Item>
        <Form.Item label="車種">
          <Input onChange={(e) => setCarName(e.target.value)} value={carName} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            icon={<SendOutlined />}
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
