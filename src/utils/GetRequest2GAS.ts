import axios from "axios"
const GasUrl = process.env.GAS_URL ?? "https://script.google.com/macros/s/AKfycbwb-0S3o1OOQHoi_wYi955nGAwdleoFI4zI4_M7bKtn-Tf81219PW68YvSS59cM77ex8A/exec";
console.log(GasUrl);
export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(
    GasUrl,
    { params }
  );
  return res;
}