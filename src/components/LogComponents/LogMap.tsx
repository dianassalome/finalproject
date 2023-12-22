import LogElement from "./LogElement";
import { TNotesFormData } from "../NotebookComponents/types";
import { getCookies } from "@/actions/cookies";
//Context
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectMarker } from "@/state/notebook/notesSlice";

type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

const LogMap = () => {

  const storedMarker = useSelector((state: RootState) => state.notes.marker);

  const [logs, setLogs] = useState([]);

  useEffect(() => { 
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = await getCookies("authToken");

    const marker = await axios.get(
      `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker?.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setLogs(marker.data.logs)
    } catch (error) {
      console.log(error)
    }
  };

  console.log("traz os logs?", storedMarker, logs);

  return (
    <>
      {storedMarker &&
        logs.map((log: TLogFormData) => <LogElement key={log.id} log={log} fetchLogs={fetchLogs} />)}
    </>
  );
};

export default LogMap;
