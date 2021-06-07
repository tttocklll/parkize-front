import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout } from "antd";

export default function Home() {
  return (
    <Layout.Content>
      <h1>home</h1>
      <Button type="primary" shape="round" size="large">
        <Link to="/register">登録</Link>
      </Button>
      <Button type="primary" shape="round" size="large">
        <Link to="/search">検索</Link>
      </Button>
    </Layout.Content>
  );
}
