import axios from "axios";
const GasUrl =
  process.env.GAS_URL ??
  "https://script.google.com/macros/s/AKfycbzmNx_ZUwwuINhG6B8FWS5YiSRPrmLO8w9jad8UitoSOsi0zdlhUAYT4ic6YJGKQ66Aqw/exec";

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
