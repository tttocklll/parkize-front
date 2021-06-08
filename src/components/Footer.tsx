import React from "react";
import { Layout } from "antd";

export default function Footer() {
  return (
    <Layout.Footer
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "40px",
        padding: 10,
      }}
    >
      &copy; 2021 OHMURA Tokiya
    </Layout.Footer>
  );
}
