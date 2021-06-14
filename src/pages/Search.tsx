import React, { useState } from "react";
import { Layout, Input, Space, message } from "antd";

import SearchCard from "../components/SearchCard";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { useSession } from "../hooks/useSession";

export default function Search() {
  const [carNumber, setCarNumber] = useState("");
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const eventName = useSession();

  const onClick = async () => {
    setIsLoading(true);
    setData(undefined);
    const params = {
      mode: "search",
      car_number: carNumber,
      event_name: eventName,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    setData(res.data);
    setCarNumber("");
    setIsLoading(false);
  };

  const onDelete = async (params: { [key: string]: any }) => {
    const res = await getRequest2GAS(params);
    if (res.data.success) {
      const searchParams = {
        mode: "search",
        car_number: data.targetNumber,
        crossDomain: true,
      };
      const res = await getRequest2GAS(searchParams);
      setData(res.data);
      message.success("削除されました");
    } else {
      message.error(res.data.error);
    }
  };

  const onFlip = async (params: { [key: string]: any }) => {
    const res = await getRequest2GAS(params);

    if (res.data.success) {
      const searchParams = {
        mode: "search",
        car_number: data.targetNumber,
        crossDomain: true,
      };
      const res = await getRequest2GAS(searchParams);

      setData(res.data);
    } else {
      message.error(res.data.error);
    }
  };

  return (
    <Layout.Content style={{ maxWidth: "600px" }}>
      <h1>検索</h1>
      <h3>Event: {eventName}</h3>
      <Input.Search
        placeholder="車ナンバー（「･」→「0」）"
        onSearch={onClick}
        enterButton="検索"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        value={carNumber}
        onChange={(e) => setCarNumber(e.target.value)}
        type="number"
        pattern="\d*"
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        {!!data && (
          <>
            <h3>
              {data.targetNumber}の検索結果：{data.result.length}件
            </h3>
            {data.result.map((item: any) => (
              <SearchCard
                item={item}
                key={`${item.created_at}${item.name}`}
                onDelete={onDelete}
                onFlip={onFlip}
              />
            ))}
          </>
        )}
      </Space>
    </Layout.Content>
  );
}
