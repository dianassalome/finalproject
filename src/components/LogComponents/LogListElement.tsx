import emotionStyled from "@emotion/styled";
import axios from "axios";

import Button from "../GeneralComponents/Button";
import { RedButton } from "../FormComponents/RedButton";
import { getCookies } from "@/actions/cookies";
import useSnackbar from "../CustomHooks/useSnackbar";
import alertMessages from "@/assets/alertMessages";

type TLogListElementProps = {
  // markerId: number;
  // id: number;
  // file: string;
  title: string;
  // fetchPin: Function;
};

const Container = emotionStyled.div`
display: flex;
`;

// const LogListElement = async ({ markerId, id, title, file, fetchPin }: TLogListElementProps) => {
const LogListElement = async ({ title }: TLogListElementProps) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  //   const readFile = JSON.parse(file)
  //   console.log(readFile.url);

  console.log("ESTE È O FILE", title);

  // const handleDeleteButton = async () => {
  //   try {
  //     const token = getCookies("authToken");

  //     await axios.delete(
  //       `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log/${id}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     handleSnackBarOpening(alertMessages.delete.success, "success", {
  //       name: "INFO",
  //     });

  //     await fetchPin()

  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error(error.response?.data.message);
  //       const message = error.response?.data.message;
  //       handleSnackBarOpening(message, "error", { name: "INFO" });
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <Container>
      <p>{title}</p>
      <Button>
        {/* <a href={readFile.url}> */}
        <i className="fi fi-bs-eye" />
        {/* </a> */}
      </Button>
      {/* <RedButton
        onClick={handleSnackBarOpening.bind(
          null,
          alertMessages.delete.warning,
          "warning",
          { name: "CHOICE", function: handleDeleteButton, button: "Delete" }
        )}
      >
        <i className="fi fi-br-trash" />
      </RedButton> */}
      <CustomSnackbar />
    </Container>
  );
};

export default LogListElement;
