import { useEffect, useState, useCallback } from "react";
import { getRequest2GAS } from "../utils/GetRequest2GAS";

export function useGetEvents() {
  const [events, setEvents] = useState<any[]>();
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    async function getEvents() {
      const params = {
        mode: "get_all_events",
        cross_domain: true,
      };
      const res = await getRequest2GAS(params);
      setEvents(res.data.result);
    }
    getEvents();
  }, [trigger]);

  const triggerGetEvents = useCallback(() => {
    setTrigger(!trigger);
  }, [trigger]);
  return [events, triggerGetEvents] as const;
}
