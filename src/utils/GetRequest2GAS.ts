import axios from "axios";
const GasUrl =
  process.env.GAS_URL ??
  "https://script.google.com/macros/s/AKfycbyi3a4n2YxJsJzDHiMLNBh0wBPLrrg0vyclNM6pMyCQhEFB_1MsjbOXXc_vgyMQSjMZJA/exec";

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
