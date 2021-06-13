import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Layout, Space } from "antd";

import { useSession } from "../hooks/useSession";

export default function Home() {
  const eventName = useSession();
  const history = useHistory();

  const onLogout = () => {
    sessionStorage.removeItem("session_id");
    history.push("/");
  };

  return (
    <Layout.Content>
      <h1>ホーム</h1>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <h3>Event: {eventName}</h3>
        <Button type="primary" size="large" block key="register">
          <Link to="/register">登録</Link>
        </Button>
        <Button type="primary" size="large" block key="search">
          <Link to="/search">検索</Link>
        </Button>
        <Button type="primary" size="large" block key="list">
          <Link to="/list">一覧</Link>
        </Button>
        <Button block size="large" onClick={onLogout}>
          ログアウト
        </Button>
      </Space>
    </Layout.Content>
  );
}
