import React, { useState } from "react";
import { Layout, Button, Spin, List, Space, message, Empty } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useGetEvents } from "../../hooks/useGetEvents";
import { getRequest2GAS } from "../../utils/GetRequest2GAS";

export default function AdminHome() {
  const [events, triggerGetEvents] = useGetEvents();
  const [isDeleting, setIsDeleting] = useState(false);

  const onClick = async (eventName: string) => {
    if (
      window.confirm(
        "本当に削除しますか？\n（このイベントに登録されたデータのすべてが削除されます。この操作は取り消せません。）"
      )
    ) {
      setIsDeleting(true);
      const params = {
        mode: "delete_event",
        cross_domain: true,
        event_name: eventName,
      };
      const res = await getRequest2GAS(params);
      if (res.data.success) {
        triggerGetEvents();
        message.success(`${res.data.deleteCount}件削除しました！`);
      } else {
        message.error(res.data.error);
      }
      setIsDeleting(false);
    }
  };

  return (
    <Layout.Content>
      <h1>管理画面</h1>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Link to="/admin/create">
          <Button icon={<PlusOutlined />} block size="large" type="primary">
            作成
          </Button>
        </Link>
        {events === undefined ? (
          <Spin size="large" />
        ) : events.length === 0 ? (
          <Empty description="データがありません" />
        ) : (
          <Spin spinning={isDeleting}>
            <List
              dataSource={events}
              bordered
              renderItem={(item: any) => (
                <List.Item
                  onClick={() => onClick(item.event_name)}
                  actions={[
                    <Button icon={<DeleteOutlined />} type="text" danger>
                      削除
                    </Button>,
                  ]}
                >
                  {item.event_name}
                </List.Item>
              )}
              size="large"
            />
          </Spin>
        )}
      </Space>
    </Layout.Content>
  );
}
