import React from "react";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Header() {
  const history = useHistory();
  return (
    <PageHeader
      extra={[
        <Button key="register">
          <Link to="/register">登録</Link>
        </Button>,
        <Button key="search">
          <Link to="/search">検索</Link>
        </Button>,
        <Link to="/" key="home">
          <Button icon={<HomeOutlined />} type="text" />
        </Link>,
      ]}
      onBack={() => history.goBack()}
    />
  );
}
