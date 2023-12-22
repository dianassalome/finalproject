import { useState } from "react";
import axios from "axios";

//Context
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import NotesForm from "../NotebookComponents/NotesForm";
import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";

//Types
import { TMarkerCreation } from "./types";
import { selectNotebook } from "@/state/notebook/notesSlice";

const CreateMarkerLogic = ({
  location,
  closeModal,
  updateNotebookMarkers,
}: TMarkerCreation) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();
  const initialFormData = {
    title: "",
    description: "",
  };

  const dispatch = useDispatch()
  const storedNotebook = useSelector(
    (state: RootState) => state.notes.notebook
  );

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

      const notebook_id = storedNotebook?.id

      const notebook = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin",
        { title, description, notebook_id, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.create.success, "success", {name: "INFO"});

      setTimeout(() => {
        dispatch(selectNotebook(notebook.data))
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
      <MarkerModalLayout closeModal={closeModal}>
        <NotesForm
          onSubmit={onSubmit}
          onInputChange={onInputChange}
          formData={formData}
        />
      </MarkerModalLayout>
      <CustomSnackbar />
    </>
  );
};

export default CreateMarkerLogic;
