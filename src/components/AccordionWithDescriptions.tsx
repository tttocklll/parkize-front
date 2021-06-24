import React from "react";
import { Collapse, Descriptions } from "antd";

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
  note?: string;
}

interface Props {
  items: itemProps[];
}

export default function AccordionWithDescriptions({ items }: Props) {
  return (
    <Collapse accordion style={{ textAlign: "left" }}>
      {items.map((item: any) => (
        <Collapse.Panel
          header={`${item.car_number} ${item.name}様 （${item.status}）`}
          key={item.created_at}
        >
          <Descriptions size="small">
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
            <Descriptions.Item label="備考">{item.note}</Descriptions.Item>
          </Descriptions>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}
