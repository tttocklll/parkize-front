import axios from "axios"
const GasUrl = process.env.GAS_URL ?? "";

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(
    GasUrl,
    { params }
  );
  return res;
}