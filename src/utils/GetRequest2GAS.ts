import axios from "axios";
const gasId =
  "AKfycbyQ8sUqXtOtBfkWFOJkoGcnxpNEA_hkFWoFjmHno-KTpqG3hebrVG9Uj7Kgj6QxyiunXw";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
