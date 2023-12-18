import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "@/state/user/userSlice";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import NotesForm from "./NotesForm";
import ModalLayout from "../ModalComponents/ModalLayout";
import { TBasicData } from "./types";
import { RedButton } from "../FormComponents/RedButton";

//Types
type TEditLogicProps = {
  notebookId: number;
  updateUserNotebooks: Function;
  closeModal: React.MouseEventHandler<HTMLElement>;
  initialData: { title: string; description: string };
};

const EditNotebookLogic = ({
  notebookId,
  updateUserNotebooks,
  closeModal,
  initialData,
}: TEditLogicProps) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialData);
  const {handleSnackBarOpening, CustomSnackbar} = useSnackbar()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      const { title, description } = formData;

      const user = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id, created_at, name, notebooks } = user.data;

      dispatch(setData({ id, created_at, name, notebooks }));

      const editedNotebook = notebooks.find(
        ({ id }: TBasicData) => notebookId === id
      );

      handleSnackBarOpening(
        alertMessages.edit.success,
        "success",
        {name: "INFO"}
      );

      setTimeout(() => {
        updateUserNotebooks(editedNotebook);
      }, 1000);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", {name: "INFO"});
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

      const user = await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id, created_at, name, notebooks } = user.data;

      dispatch(setData({ id, created_at, name, notebooks }));

      handleSnackBarOpening(
        alertMessages.delete.success,
        "success",
        {name: "INFO"}
      )

      setTimeout(() => {
        updateUserNotebooks(notebooks[0]);
      }, 1000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", {name: "INFO"});
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
            {name: "CHOICE", function: handleDeleteButton, button: "Delete"}
          )}
        >
          Delete notebook
        </RedButton>
      </ModalLayout>
      <CustomSnackbar/>
    </>
  );
};

export default EditNotebookLogic;
