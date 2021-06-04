import { Layout, Input, Form, Button, Descriptions } from "antd";
import React, { useState } from "react";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

export default function Home() {
  const [carNumber, setCarNumber] = useState("");
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    const params = {
      mode: "search",
      car_number: carNumber,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    console.log(res);
    setData(res.data.search);
    setCarNumber("");
    setIsLoading(false);
  };
  return (
    <Layout.Content>
      <h1>search</h1>
      <Form>
        {/* TODO: エラーメッセージ（tooltipと同じで良さそう） */}
        <Form.Item
          label="車ナンバー 4桁"
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
            検索
          </Button>
        </Form.Item>
      </Form>
      {data.length !== 0 &&
        data.map((item: any, index: number) => (
          <Descriptions title={item[0]}>
            <Descriptions.Item label="車ナンバー">{item[1]}</Descriptions.Item>
          </Descriptions>
        ))}
    </Layout.Content>
  );
}
