import emotionStyled from "@emotion/styled";
import Button from "../GeneralComponents/Button";
import { RedButton } from "../FormComponents/RedButton";
import useSnackbar from "../CustomHooks/useSnackbar";
import alertMessages from "@/assets/alertMessages";
import axios from "axios";
import { getCookies } from "@/actions/cookies";
import formatDate from "@/actions/formatDate";
import { TNotesFormData } from "../NotebookComponents/types";
import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";
import { useState } from "react";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useRouter } from "next/router";


type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

const Container = emotionStyled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  `;

const ImgContainer = emotionStyled.div`
  width: 20%;
  `;

const Img = emotionStyled.img`
  width: 290px;
  @media (min-width: 700px) {
    width: 500px;
  }
  `;

const Video = emotionStyled.video`
  width: 290px;
  @media (min-width: 700px) {
    width: 500px;
  }
`;

const Audio = emotionStyled.audio`
width: 290px;
  @media (min-width: 700px) {
    width: 500px;
  }
`;

const Form = emotionStyled.form`
  display: flex;
  gap: 5px;
  padding: 5px;
  align-items: center;
`;


const DisplayLog = ({
  log,
  closeModal,
  updateLogs,
  onDeleteLog
}: {
  log: TLogFormData;
  closeModal: React.MouseEventHandler<HTMLElement>;
  updateLogs: Function;
  onDeleteLog: Function;
}) => {
  const storedMarker = useSelector((state: RootState) => state.notes.marker)
  const [selectedLog, setSelectedLog] = useState(log)
  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(log.title);
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  const router = useRouter()

  const { id, title, file, created_at } = selectedLog;


  const handleDeleteButton = async () => {
    try {
      const token = await getCookies("authToken");

      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.delete.success, "success", {
        name: "INFO",
      });

      const marker = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTimeout(() => {
        setEditModeOff()
        updateLogs(marker.data)
        onDeleteLog()
      }, 1000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", { name: "INFO" });
      } else {
        console.error(error);
      }
    }
  };

  const handleSubmitButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await editLog();
    // await fetchLogs()
    setEditModeOff();
  };

  const editLog = async () => {
    try {
      const token = await getCookies("authToken");

      const editedLog = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log/${id}`,
        { title: titleInput, pin_id: storedMarker?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.edit.success, "success", {
        name: "INFO",
      });

      const marker = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // const editedLog = marker.data.logs.find(({id}: {id: number}) => id === selectedLog.id)
  console.log("MARKER EDIT",marker.data)


      setTimeout(() => {
        setSelectedLog(editedLog.data)
        updateLogs(marker.data)
      }, 1000);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", { name: "INFO" });
      } else {
        console.error(error);
      }
    }
  };

  const setEditModeOff = () => {
    setEditMode(false);
    // setTitleInput("");
  };

  return (
    <MarkerModalLayout closeModal={closeModal}>
      <Container>
        {!editMode && (
          <i onClick={() => setEditMode(true)} className="fi fi-rr-edit" />
        )}
        {!editMode && <h3>{title}</h3>}
        {editMode && (
          <Form onSubmit={handleSubmitButton}>
            <FormInputBoxes
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
            />
            <Button>
              <i className="fi fi-br-check-circle" />
            </Button>
            <i onClick={setEditModeOff} className="fi fi-br-cross-circle" />
          </Form>
        )}
        <p>{formatDate(created_at)}</p>
        <ImgContainer>
          <a href={file.url}>
            {file.mimetype.includes("image") && <Img src={file.url} />}
            {file.mimetype.includes("video") && (
              <Video controls>
                <source src={file.url} type={file.mimetype} />
              </Video>
            )}
            {file.mimetype.includes("audio") && (
              <Audio controls>
                <source src={file.url} type={file.mimetype} />
              </Audio>
            )}
          </a>
        </ImgContainer>
        {editMode && (
          <RedButton
            onClick={handleSnackBarOpening.bind(
              null,
              alertMessages.delete.warning,
              "warning",
              { name: "CHOICE", function: handleDeleteButton, button: "Delete" }
            )}
          >
            <i className="fi fi-br-trash" /> Delete
          </RedButton>
        )}
        <CustomSnackbar />
      </Container>
    </MarkerModalLayout>
  );
};

export default DisplayLog;
