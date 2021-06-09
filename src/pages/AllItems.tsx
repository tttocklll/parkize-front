import React, { useEffect, useState } from "react";
import { Layout, Collapse, Descriptions, Spin } from "antd";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

export default function AllItems() {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function gas() {
      const res = await getRequest2GAS({
        crossDomain: true,
        mode: "list_all",
      });
      setList(res.data.result);
    }
    gas();
  }, []);
  return (
    <Layout.Content>
      {list.length === 0 ? (
        <Spin size="large" />
      ) : (
        <>
          <p>全 {list.length} 件</p>
          <Collapse accordion style={{ textAlign: "left" }}>
            {list.map((item: any) => (
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
                </Descriptions>
              </Collapse.Panel>
            ))}
          </Collapse>
        </>
      )}
    </Layout.Content>
  );
}
