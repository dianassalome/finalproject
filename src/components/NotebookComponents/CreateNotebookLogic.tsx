import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectNotebook } from "@/state/notebook/notesSlice";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import NotesForm from "./NotesForm";
import ModalLayout from "../ModalComponents/ModalLayout";


type TCreateLogicProps = {
  updateUserNotebooks: Function;
  closeModal: React.MouseEventHandler<HTMLElement>;
};

const CreateNotebookLogic = ({
  updateUserNotebooks,
  closeModal,
}: TCreateLogicProps) => {
  
  const {handleSnackBarOpening, CustomSnackbar} = useSnackbar()
  const dispatch = useDispatch();

  const initialData = { title: "", description: "" };

  const [formData, setFormData] = useState(initialData);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      const { title, description } = formData;

      const createdNotebook = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      handleSnackBarOpening(alertMessages.create.success, "success", {name: "INFO"})

      setTimeout(() => {
        dispatch(selectNotebook(createdNotebook.data))
        updateUserNotebooks();
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

  return (
    <>
    <ModalLayout closeModal={closeModal}>
      <NotesForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
      />
    </ModalLayout>
    <CustomSnackbar/>
    </>
  );
};

export default CreateNotebookLogic;
