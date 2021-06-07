import axios from "axios";
const GasUrl =
  process.env.GAS_URL ??
  "https://script.google.com/macros/s/AKfycbzSlqoR1-Sh1hbTWQt9xAELcdAtvlrXJMRbkuFQuE2nEFwFl12I1St90z7OXo-LCmnctg/exec";

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
