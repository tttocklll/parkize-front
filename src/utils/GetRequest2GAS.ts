import axios from "axios";
const gasId = process.env.GAS_ID;
const GasUrl = `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
