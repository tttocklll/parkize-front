import React, { useState } from "react";
import {
  Button,
  Form,
  FormItemProps,
  Input,
  Layout,
  message,
  Modal,
} from "antd";
import { SendOutlined } from "@ant-design/icons";

import AccordionWithDescriptions from "../components/AccordionWithDescriptions";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { useSession } from "../hooks/useSession";

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

  const [isSending, setIsSending] = useState(false);
  const [carNunmberStatus, setCarNumberStatus] =
    useState<FormItemProps["validateStatus"]>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sameNumbers, setSameNumbers] = useState([]);

  const eventName = useSession();

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

  const onClick = async (forceRegister?: boolean) => {
    setIsSending(true);
    const params = {
      mode: "register",
      forceRegister,
      event_name: eventName,
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
    if (res.data.success) {
      message.success("登録しました！");
      initializeState();
    } else if (res.data.sameNumbers) {
      setSameNumbers(res.data.sameNumbers);
      setIsModalVisible(true);
    } else {
      message.error(res.data.error, 10);
    }
    setIsSending(false);
  };

  const onOk = async () => {
    setIsModalVisible(false);
    onClick(true);
  };

  const onChangeCarNumber = (value: string) => {
    setCarNumber(value);
    setCarNumberStatus(value.length === 4 ? "success" : "error");
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
          height: 60,
          width: 60,
        }}
        onClick={() => onClick()}
        loading={isSending}
      />
      <h1>登録</h1>
      <h3>Event: {eventName}</h3>
      <Form>
        <Form.Item label="名前" required>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isSending}
          />
        </Form.Item>
        <Form.Item label="会社名">
          <Input
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={isSending}
            value={companyName}
          />
        </Form.Item>
        <Form.Item label="セクション">
          <Input
            onChange={(e) => setSection(e.target.value)}
            value={section}
            disabled={isSending}
          />
        </Form.Item>
        <Form.Item
          label="車ナンバー"
          required
          hasFeedback
          validateStatus={carNunmberStatus}
          help="「･」は「0」で入力してください（例：「･･12」→「0012」）"
        >
          <Input
            onChange={(e) => onChangeCarNumber(e.target.value)}
            value={carNumber}
            disabled={isSending}
            pattern="\d*"
            type="number"
          />
        </Form.Item>
        <Form.Item label="車地名" help="「品川」「練馬」など">
          <Input
            disabled={isSending}
            onChange={(e) => setCarArea(e.target.value)}
            value={carArea}
          />
        </Form.Item>
        <Form.Item label="車ひらがな（1文字）">
          <Input
            onChange={(e) => setCarHiragna(e.target.value)}
            value={carHiragna}
            disabled={isSending}
          />
        </Form.Item>
        <Form.Item label="車のカテゴリー番号" help='"300"，"584"など'>
          <Input
            onChange={(e) => setCarCategory(Number(e.target.value))}
            value={carCategory}
            disabled={isSending}
          />
        </Form.Item>
        <Form.Item label="車種">
          <Input
            onChange={(e) => setCarName(e.target.value)}
            value={carName}
            disabled={isSending}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => onClick()}
            loading={isSending}
            disabled={!name || carNunmberStatus !== "success"}
          >
            送信
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="同じナンバーが登録されています"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={onOk}
      >
        <p>本当に追加しますか？</p>

        <AccordionWithDescriptions items={sameNumbers} />
      </Modal>
    </Layout.Content>
  );
}
