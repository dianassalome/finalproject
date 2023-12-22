import axios from "axios";
import { getCookies } from "./cookies";

export const getNotebookById = async (id: number, token: string) => {
  return await axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

