import { useState } from "react";
import axios from "axios";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { getCookies } from "@/actions/cookies";
import { getNotebookById } from "@/actions/fetchXano";

//Components
import NotesForm from "./NotesForm";
import ModalLayout from "../ModalComponents/ModalLayout";
import { RedButton } from "../FormComponents/RedButton";

//Context
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { selectNotebook, deselectNotebook } from "@/state/notebook/notesSlice";

//Types
type TEditLogicProps = {
  updateUserNotebooks: Function;
  closeModal: React.MouseEventHandler<HTMLElement>;
};

const EditNotebookLogic = ({
  updateUserNotebooks,
  closeModal,
}: TEditLogicProps) => {
  const dispatch = useDispatch();
  const storedNotebook = useSelector(
    (state: RootState) => state.notes.notebook
  );

  const [formData, setFormData] = useState({
    title: storedNotebook ? storedNotebook.title : "",
    description: storedNotebook ? storedNotebook.description : "",
  });

  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      const { title, description } = formData;

      const editedNotebook = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${storedNotebook?.id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.edit.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        dispatch(selectNotebook(editedNotebook.data))
        updateUserNotebooks();
      }, 1000);
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

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteButton = async () => {
    try {
      const token = await getCookies("authToken");

      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${storedNotebook?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );


      handleSnackBarOpening(alertMessages.delete.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        dispatch(deselectNotebook())
        updateUserNotebooks();
      }, 1000);
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
    <>
      <ModalLayout closeModal={closeModal}>
        <NotesForm
          onSubmit={onSubmit}
          onInputChange={onInputChange}
          formData={formData}
        />
        <RedButton
          onClick={handleSnackBarOpening.bind(
            null,
            alertMessages.delete.warning,
            "warning",
            { name: "CHOICE", function: handleDeleteButton, button: "Delete" }
          )}
        >
          Delete notebook
        </RedButton>
      </ModalLayout>
      <CustomSnackbar />
    </>
  );
};

export default EditNotebookLogic;
