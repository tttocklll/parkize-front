import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

export function useSession() {
  const [eventName, setEventName] = useState("");
  const history = useHistory();
  useEffect(() => {
    async function session() {
      const sessionId = sessionStorage.getItem("session_id");
      const params = {
        mode: "get_session",
        cross_domain: true,
        session_id: sessionId,
      };
      const res = await getRequest2GAS(params);
      if (res.data.success) {
        setEventName(res.data.event_name);
      } else {
        message.error(res.data.error);
        history.push("/");
      }
    }
    session();
  }, [history]);

  return eventName;
}
