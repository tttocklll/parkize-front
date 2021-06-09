import axios from "axios";
const gasId =
  "AKfycbwjD2Ww4BWNPhHDcZ4LkZ-yBSm9n-dOmFJ6xcVK6cXD9krcxq6AmSbI15hc6XPKXzilIA";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
