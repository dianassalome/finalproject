import axios from "axios";

export const getNotebookById = async (id: number, token: string) => {
  return await axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

