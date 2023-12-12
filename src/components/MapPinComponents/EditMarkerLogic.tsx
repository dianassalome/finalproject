import { useState } from "react";
import axios from "axios";
import emotionStyled from "@emotion/styled";

//Alerts
import useSnackbar from "../CustomHooks/useSnackbar";
import alertMessages from "@/assets/alertMessages";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import MarkerForm from "./MarkerForm";
import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";
import EditMapCoordinates from "./EditMap";

//Types
import { TPin } from "../NotebookComponents/types";

type TEditMarkerLogicProps = {
  notebookId: number;
  initialData: TPin;
  closeModal: React.MouseEventHandler<HTMLElement>;
  updateNotebookMarkers: Function;
};

const EditMarkerLogic = ({
  notebookId,
  initialData,
  closeModal,
  updateNotebookMarkers,
}: TEditMarkerLogicProps) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  const [formData, setFormData] = useState(initialData);

  const onLocationChange = (data: { lat: number; lng: number }) => {
    setFormData({
      ...formData,
      location: { type: "point", data },
    });
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const token = await getCookies("authToken");

      const { title, description, location } = formData;

      console.log("LOCATION", location);

      //atualizar
      const notebook = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${initialData.id}`,
        {
          title,
          description,
          location,
          notebook_id: notebookId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // const { id, created_at, name, pins } = user.data;

      // dispatch(setData({ id, created_at, name, notebooks }));

      //   const editedMarker = notebook.data.pins.find(
      //     ({ id }: TPin) => initialData.id === id
      //   );

      handleSnackBarOpening(alertMessages.edit.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        updateNotebookMarkers(notebook.data.pins);
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
  console.log("AQUI ESTOU EU");

  return (
    <MarkerModalLayout closeModal={closeModal}>
      <MarkerForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
        onLocationChange={onLocationChange}
      />
      <CustomSnackbar />
    </MarkerModalLayout>
  );
};

export default EditMarkerLogic;
