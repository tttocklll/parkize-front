import axios from "axios";
const gasId =
  "AKfycbztVIWCvSo7fe8y1foUeRJvSFEd1iG3YNWWzr63smJSXd-shgsY-FJfA6MwOoJBWNWHvA";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
