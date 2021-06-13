import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { PageHeader, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Header() {
  const [count, setCount] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const passphrase = process.env.PASSPHRASE;

  const onClick = () => {
    if (count + 1 > 20) {
      if (window.prompt("パスフレーズを入力") === passphrase) {
        setCount(0);
        history.push("/admin");
        return;
      }
    }
    setCount(count + 1);
  };

  return (
    <PageHeader
      title="parkize"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8))",
      }}
      extra={
        location.pathname === "/" ? (
          <Button icon={<HomeOutlined />} type="text" onClick={onClick} />
        ) : location.pathname.startsWith("/admin") ? (
          <Link to="/admin" key="home">
            <Button icon={<HomeOutlined />} type="text" />
          </Link>
        ) : (
          <>
            <Button key="register" type="text">
              <Link to="/register">登録</Link>
            </Button>
            <Button key="search" type="text">
              <Link to="/search">検索</Link>
            </Button>
            <Link to="/home" key="home">
              <Button icon={<HomeOutlined />} type="text" />
            </Link>
          </>
        )
      }
    />
  );
}
