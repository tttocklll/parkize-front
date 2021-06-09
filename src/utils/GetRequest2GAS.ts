import axios from "axios";
const gasId =
  "AKfycbyA1NOCcWjVZ6RGgfYUll7Y7X7jx8kXanUogMtHGMPLVKATtuVm7I52TV84MsBVsXey0g";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
