import axios from "axios";
const gasId =
  "AKfycbzURj8cqUCIL-tSiuQxG2dtPht77xXe3Z1SqvpNGJBjBkyvSjWjtYjV7cSM9rs6kyJpTg";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
