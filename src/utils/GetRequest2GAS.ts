import axios from "axios";
const GasUrl =
  process.env.GAS_URL ??
  "https://script.google.com/macros/s/AKfycbz_-BCPewgPXhPSZ1HqoCMoUtSqYtF59dwOAOtYY2BhmOlQyO0r2yCXWWeXda0fmOGr3A/exec";

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
