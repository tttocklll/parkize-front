import axios from "axios";
const gasId =
  "AKfycbxghBHf--bzp9-WLuM8JX1iK9ScKrzAPvUzVQ3PimYnKymuBnxfkYaFAbyF_hLt1IevJw";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
