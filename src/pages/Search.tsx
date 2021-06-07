import { Layout, Input, Button, Descriptions } from "antd";
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

      {data.length !== 0 &&
        data.map((item: any, index: number) => (
          <Descriptions title={item[0]}>
            <Descriptions.Item label="車ナンバー">{item[1]}</Descriptions.Item>
          </Descriptions>
        ))}
    </Layout.Content>
  );
}
