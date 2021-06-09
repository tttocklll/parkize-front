import React, { useState } from "react";
import { Button, Descriptions, Card, Switch, Spin } from "antd";

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
  onDelete: any;
}

export default function SearchCard({ item, onDelete }: cardProps) {
  const [isLoadingSwitch, setIsLoadingSwitch] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isChecked, setIsChecked] = useState(item.status === "未出庫");

  const onFlip = async () => {
    setIsLoadingSwitch(true);
    const params = {
      mode: "flip_status",
      crossDomain: true,
      created_at: item.created_at,
      car_number: item.car_number,
    };
    const res = await getRequest2GAS(params);
    if (res.data.success) {
      setIsChecked(!isChecked);
    } else {
    }
    setIsLoadingSwitch(false);
  };

  const onClickDelete = () => {
    const isOk = window.confirm(
      "本当に削除しますか？\n（この操作は取り消せません）"
    );
    if (isOk) {
      setIsLoadingAll(true);
      onDelete({
        mode: "delete",
        crossDomain: true,
        created_at: item.created_at,
        car_number: item.car_number,
      });
    }
  };

  return (
    <Spin size="large" tip="削除しています..." spinning={isLoadingAll}>
      <Card
        title={`${item.name} 様`}
        key={`${item.created_at}${item.name}`}
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
            onClick={onClickDelete}
          >
            削除
          </Button>,
        ]}
        extra={[
          <Switch
            checkedChildren="未出庫"
            unCheckedChildren="出庫済"
            loading={isLoadingSwitch}
            onClick={onFlip}
            checked={isChecked}
            key="switch"
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
          <Descriptions.Item label="セクション">
            {item.section}
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
    </Spin>
  );
}