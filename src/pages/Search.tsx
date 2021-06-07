import { Layout, Input, Button, Descriptions, Card, Space } from "antd";
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
    <Layout.Content style={{ maxWidth: "600px" }}>
      <h1>検索</h1>
      <Input.Search
        placeholder="車ナンバー4桁"
        onSearch={onClick}
        enterButton="検索"
        size="large"
        loading={isLoading}
        value={carNumber}
        onChange={(e) => setCarNumber(e.target.value)}
      />
      <h3>{data.length} 件該当しました。</h3>
      <Space direction="vertical" style={{ width: "100%" }}>
        {data.length !== 0 &&
          data.map((item: any, index: number) => (
            <Card title={item[0]}>
              <Descriptions bordered size="small">
                <Descriptions.Item label="車ナンバー">
                  {item[1]}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
      </Space>
    </Layout.Content>
  );
}
