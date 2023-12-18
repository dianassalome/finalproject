import emotionStyled from "@emotion/styled";
import Button from "../Button";
import { RedButton } from "../FormComponents/RedButton";
import useSnackbar from "../CustomHooks/useSnackbar";
import alertMessages from "@/assets/alertMessages";
import axios from "axios";
import { getCookies } from "@/actions/cookies";
import formatDate from "@/actions/formatDate";
import { TNotesFormData } from "../NotebookComponents/types";
import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";

type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string };
  pin_id: number;
  user_id: number;
};

const Container = emotionStyled.div`
  display: flex;
  flex-direction: column;
  `;

const ImgContainer = emotionStyled.div`
  width: 20%;
  `;

const Img = emotionStyled.img`
  width: 100%;
  object-fit: cover;
  `;

const DisplayLog = ({
  log,
  closeModal,
}: {
  log: TLogFormData;
  closeModal: React.MouseEventHandler<HTMLElement>;
}) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  const { id, title, description, file, created_at } = log;

  const handleDeleteButton = async () => {
    try {
      const token = getCookies("authToken");

      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.delete.success, "success", {
        name: "INFO",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", { name: "INFO" });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <MarkerModalLayout closeModal={closeModal}>
      <Container>
        <h3>{title}</h3>
        <ImgContainer>
          <a href={file.url}>
            <Img src={file.url} />
          </a>
        </ImgContainer>
        <p>{formatDate(created_at)}</p>
        <p>{description}</p>
        <p>{title}</p>

        {/* <Button>
          
            <i className="fi fi-bs-eye" /> View
       
        </Button> */}
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
        <CustomSnackbar />
      </Container>
    </MarkerModalLayout>
  );
};

export default DisplayLog;
