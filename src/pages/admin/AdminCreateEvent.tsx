import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Input, Form, Button, message } from "antd";

import { getRequest2GAS } from "../../utils/GetRequest2GAS";

export default function AdminCreateEvent() {
  const [eventName, setEventName] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const history = useHistory();

  const onClick = async () => {
    setIsSending(true);
    const params = {
      mode: "create_event",
      cross_domain: true,
      event_name: eventName,
      password,
    };
    const res = await getRequest2GAS(params);
    if (res.data.success) {
      message.success("作成しました！");
      setEventName("");
      setPassword("");
      history.push("/admin");
    } else {
      message.error(res.data.error);
    }
    setIsSending(false);
  };

  return (
    <Layout.Content>
      <h1>イベント作成</h1>
      <Form>
        <Form.Item label="イベント名" required>
          <Input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="パスワード" required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            size="large"
            type="primary"
            onClick={onClick}
            disabled={!(eventName && password)}
            loading={isSending}
          >
            作成
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}
