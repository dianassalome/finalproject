import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "@/state/user/userSlice";

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

  console.log("I'M RENDERING _ EditNotebook")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      console.log("ID TO EDIT", notebookId);

      const { title, description } = formData;

      const user = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id, created_at, name, notebooks } = user.data;

      dispatch(setData({ id, created_at, name, notebooks }));

      const editedNotebook = notebooks.find(({id}: TBasicData) => notebookId === id)

      console.log("EDITED NOTEBOOK ID",editedNotebook.id)

      updateUserNotebooks(notebooks, editedNotebook);
    } catch (error) {
      console.log(error);
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
    const token = await getCookies("authToken");

      console.log("ID TO EDIT", notebookId);
      const user = await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id, created_at, name, notebooks } = user.data;

      dispatch(setData({ id, created_at, name, notebooks }));
      updateUserNotebooks(notebooks, notebooks[0]);
  } 

  return (
    <ModalLayout closeModal={closeModal}>
      <NotesForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
      />
      <RedButton onClick={handleDeleteButton}>Delete notebook</RedButton>
    </ModalLayout>
  );
};

export default EditNotebookLogic;
