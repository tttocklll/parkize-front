import React, { useState } from "react";
import { Button, Form, FormItemProps, Input, Layout } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { getRequest2GAS } from "../utils/GetRequest2GAS";
import InfoMessage from "../components/InfoMessage";

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
  const [info, setInfo] = useState("");
  const [infoType, setInfoType] = useState<"success" | "error" | undefined>();

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
      setInfo("登録しました！");
      setInfoType("success");
      setCarNumber("");
      setName("");
    } else {
      setInfo(res.data.error);
      setInfoType("error");
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
      <h1>登録</h1>
      <InfoMessage message={info} type={infoType} />
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
