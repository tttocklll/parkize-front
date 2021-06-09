import React, { useState } from "react";
import { Layout, Input, Space } from "antd";

import SearchCard from "../components/SearchCard";
import { getRequest2GAS } from "../utils/GetRequest2GAS";

export default function Home() {
  const [carNumber, setCarNumber] = useState("");
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    setData(undefined);
    const params = {
      mode: "search",
      car_number: carNumber,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    setData(res.data);
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
      <Space direction="vertical" style={{ width: "100%" }}>
        {!!data && (
          <>
            <h3>
              {data.targetNumber}の検索結果：{data.result.length}件
            </h3>
            {data.result.map((item: any) => (
              <SearchCard item={item} />
            ))}
          </>
        )}
      </Space>
    </Layout.Content>
  );
}
