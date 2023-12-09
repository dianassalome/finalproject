import { useState } from "react";
import axios from "axios";

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
  updateUserMarkers,
}: TMarkerCreation) => {
  const initialFormData = {
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  console.log("I'M RENDERING _ CreateNotebook")

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

      const marker = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin",
        { title, description, notebook_id, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("RESULTADO DO CREATE MARKER", marker.data);

      updateUserMarkers(marker.data.pins);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalLayout closeModal={closeModal}>
      <NotesForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
      />
    </ModalLayout>
  );
};

export default CreateMarkerLogic;
