import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { List, Layout, Button, Modal, Input, Spin, message } from "antd";

import { useGetEvents } from "../hooks/useGetEvents";

export default function SelectEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const history = useHistory();

  const [events, _] = useGetEvents();

  const onClick = (eventName: string) => {
    setIsModalOpen(true);
    setSelectedEvent(eventName);
  };

  const onOk = async () => {
    const params = {
      mode: "login",
      cross_domain: true,
      event_name: selectedEvent,
      password,
    };
    const res = await getRequest2GAS(params);
    if (res.data.login) {
      message.success("ログインしました！");
      setIsModalOpen(false);
      sessionStorage.setItem("session_id", res.data.sessionId);
      history.push("/home");
    } else {
      message.error(res.data.error);
    }
  };

  const onCancel = () => {
    setSelectedEvent("");
    setPassword("");
    setIsModalOpen(false);
  };

  return (
    <Layout.Content>
      <h1>イベント選択</h1>
      {events === undefined ? (
        <Spin size="large" />
      ) : events.length === 0 ? (
        "まだ何も登録されていません"
      ) : (
        <List
          dataSource={events}
          bordered
          renderItem={(item: any) => (
            <List.Item>
              <Button
                type="link"
                block
                onClick={() => onClick(item.event_name)}
              >
                {item.event_name}
              </Button>
            </List.Item>
          )}
          size="large"
        />
      )}

      <Modal visible={isModalOpen} onCancel={onCancel} onOk={onOk}>
        <h3>パスワードを入力</h3>
        {selectedEvent}
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </Layout.Content>
  );
}
