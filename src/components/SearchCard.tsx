import React, { useState } from "react";
import { Button, Descriptions, Card, Switch } from "antd";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

interface itemProps {
  name: string;
  car_number: string;
  car_area?: string;
  car_category?: number;
  car_hiragana?: string;
  car_name?: string;
  company_name?: string;
  section?: string;
  status: string;
  created_at: string;
  left_at?: string;
}

interface cardProps {
  item: itemProps;
}

export default function SearchCard({ item }: cardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(item.status === "未出庫");

  const onFlip = async () => {
    setIsLoading(true);
    const params = {
      mode: "flip_status",
      crossDomain: true,
      created_at: item.created_at,
      car_number: item.car_number,
    };
    const res = await getRequest2GAS(params);
    if (res.data.success) {
      setIsChecked(!isChecked);
    }
    setIsLoading(false);
  };

  return (
    <Card
      title={`${item.name} 様`}
      key={item.name}
      actions={[
        <Button
          type="text"
          style={{ width: "100%", height: "100%" }}
          key="edit"
        >
          編集
        </Button>,
        <Button
          type="text"
          style={{ width: "100%", height: "100%" }}
          key="remove"
          danger
        >
          削除
        </Button>,
      ]}
      extra={[
        <Switch
          checkedChildren="未出庫"
          unCheckedChildren="出庫済"
          loading={isLoading}
          onClick={onFlip}
          checked={isChecked}
        />,
      ]}
    >
      <Descriptions bordered size="small" layout="vertical">
        <Descriptions.Item label="車　ナンバー">
          {`${item.car_area} ${item.car_category} ${item.car_hiragana} ${item.car_number}`}
        </Descriptions.Item>
        <Descriptions.Item label="会社名">
          {item.company_name}
        </Descriptions.Item>
        <Descriptions.Item label="セクション">{item.section}</Descriptions.Item>
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
  );
}
