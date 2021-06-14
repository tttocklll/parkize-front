import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Spin, Empty } from "antd";

import AccordionWithDescriptions from "../components/AccordionWithDescriptions";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import { useSession } from "../hooks/useSession";

export default function AllItems() {
  let { event_id } = useParams<{ event_id: string }>();
  const [list, setList] = useState<any[]>();
  const eventName = useSession();
  useEffect(() => {
    async function gas() {
      const res = await getRequest2GAS({
        crossDomain: true,
        mode: "list_all",
        event_name: eventName,
      });
      setList(res.data.result);
    }
    gas();
  }, [eventName]);
  console.log(eventName);
  return (
    <Layout.Content>
      <p>{event_id}</p>
      {list === undefined || eventName === "" ? (
        <Spin size="large" />
      ) : list.length === 0 ? (
        <Empty />
      ) : (
        <>
          <p>全 {list.length} 件</p>

          <AccordionWithDescriptions items={list} />
        </>
      )}
    </Layout.Content>
  );
}
