import { Layout, Input, Button, Descriptions, Card, Space } from "antd";
import React, { useState } from "react";

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
              <Card title={`${item.name} 様`} key={item.name}>
                <Descriptions bordered size="small">
                  <Descriptions.Item label="車　ナンバー">
                    {`${item.car_area} ${item.car_category} ${item.car_hiragana} ${item.car_number}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="会社名">
                    {item.company_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="セクション">
                    {item.section}
                  </Descriptions.Item>
                  <Descriptions.Item label="状態">
                    {item.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="入庫日時">
                    {item.created_at &&
                      new Date(item.created_at).toLocaleString("ja-JP", {
                        timeZone: "JST",
                      })}
                  </Descriptions.Item>
                  <Descriptions.Item label="出庫日時">
                    {item.left_at &&
                      new Date(item.left_at).toLocaleString("ja-JP", {
                        timeZone: "JST",
                      })}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ))}
          </>
        )}
      </Space>
    </Layout.Content>
  );
}
