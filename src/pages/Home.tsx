import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Space } from "antd";

export default function Home() {
  return (
    <Layout.Content>
      <h1>ホーム</h1>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Button type="primary" size="large" block>
          <Link to="/register">登録</Link>
        </Button>
        <Button type="primary" size="large" block>
          <Link to="/search">検索</Link>
        </Button>
      </Space>
    </Layout.Content>
  );
}
