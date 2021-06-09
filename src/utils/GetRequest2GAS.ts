import axios from "axios";
const gasId =
  "AKfycbxPtvUAZTi5Obg1aso84xx7SraTprTCSvocsZx0SB6DLsHgskRODFtDFqUEdtEUuzqZxQ";
const GasUrl =
  process.env.GAS_URL ?? `https://script.google.com/macros/s/${gasId}/exec`;

export async function getRequest2GAS(params: { [key: string]: any }) {
  const res = await axios.get(GasUrl, { params });
  return res;
}
