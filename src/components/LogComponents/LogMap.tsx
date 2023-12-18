import LogElement from "./LogElement";
import { TNotesFormData } from "../NotebookComponents/types";

type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string, mimetype: string };
  pin_id: number;
  user_id: number;
};

const LogMap = ({ markerLogs }: { markerLogs: TLogFormData[] }) => {
  console.log("MARKER LOGS", markerLogs);

  return (
    <>
      {markerLogs.length !== 0 &&
        markerLogs.map((log) => <LogElement key={log.id} log={log} />)}
    </>
  );
};

export default LogMap;
