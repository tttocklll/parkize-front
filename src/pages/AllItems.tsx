import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

import AccordionWithDescriptions from "../components/AccordionWithDescriptions";
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

          <AccordionWithDescriptions items={list} />
        </>
      )}
    </Layout.Content>
  );
}
