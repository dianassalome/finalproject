import emotionStyled from "@emotion/styled";
import { TNotesFormData } from "../NotebookComponents/types";
import DisplayLog from "./DisplayLog";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { selectLog, deselectLog } from "@/state/notebook/notesSlice";


type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

const ImgContainer = emotionStyled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;
`;

const Icon = emotionStyled.i`
display: flex;
position: absolute;
z-index: 1;
background-color: rgba(255, 255, 255, 0.7);
border-radius: 10px;
padding: 5px;
top: 0;
right: 0;
font-size: 20px;
`;

const Img = emotionStyled.img`
width: 100%;
aspect-ratio: 1;
object-fit: cover;
border-radius: 10px;
`;

const Video = emotionStyled.video`
width: 100%;
aspect-ratio: 1;
object-fit: cover;
border-radius: 10px;
`;

const Audio = emotionStyled.audio`
width: 100%;
`;

const LogElement = ({ log, fetchLogs }: { log: TLogFormData, fetchLogs: Function }) => {
  // const dispatch = useDispatch();

  console.log("LOG NO LOGELEMENT",log)
  
  const { url, mimetype } = log.file;

  const [viewLogModal, setViewLogModal] = useState(false);

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setViewLogModal(false)
      // dispatch(deselectLog());
    }
  };

  const handleOpenLog = () => {
    setViewLogModal(true);
    // dispatch(selectLog(log));
  };

  return (
    <>
      <ImgContainer>
        <Icon
          onClick={handleOpenLog}
          className="fi fi-br-arrow-up-right-from-square"
        />
        {mimetype.includes("image") && <Img src={url}></Img>}
        {mimetype.includes("video") && (
          <Video controls>
            <source src={url} type={mimetype} />
          </Video>
        )}
        {mimetype.includes("audio") && (
          <Audio controls>
            <source src={url} type={mimetype} />
          </Audio>
        )}
      </ImgContainer>
      {viewLogModal && <DisplayLog log={log} closeModal={closeModal} fetchLogs={fetchLogs}/>}
    </>
  );
};

export default LogElement;
