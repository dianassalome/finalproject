import { useState } from "react";
import axios from "axios";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import NotesForm from "../NotebookComponents/NotesForm";
import ModalLayout from "../ModalComponents/ModalLayout";

//Types
import { TMarkerCreation } from "./types";

const CreateMarkerLogic = ({
  location,
  notebook_id,
  closeModal,
  updateNotebookMarkers,
}: TMarkerCreation) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();
  const initialFormData = {
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      const { title, description } = formData;

      const notebook = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin",
        { title, description, notebook_id, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.create.success, "success", {name: "INFO"});

      setTimeout(() => {
        updateNotebookMarkers(notebook.data.pins);
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
      </ModalLayout>
      <CustomSnackbar />
    </>
  );
};

export default CreateMarkerLogic;
