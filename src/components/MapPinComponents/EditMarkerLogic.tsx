import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

//Context
import { deselectMarker, selectMarker } from "@/state/notebook/notesSlice";
import { useDispatch } from "react-redux";

//Alerts
import useSnackbar from "../CustomHooks/useSnackbar";
import alertMessages from "@/assets/alertMessages";

//Functions
import { getCookies } from "@/actions/cookies";

//Components
import MarkerForm from "./MarkerForm";
import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";

//Types
import { TPin } from "../NotebookComponents/types";
import { RedButton } from "../FormComponents/RedButton";

type TEditMarkerLogicProps = {
  storedMarker: TPin;
  closeModal: React.MouseEventHandler<HTMLElement>;
  updateNotebookMarkers: Function;
};

const EditMarkerLogic = ({
  storedMarker,
  closeModal,
  updateNotebookMarkers,
}: TEditMarkerLogicProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

  const [formData, setFormData] = useState(storedMarker);

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

      const editedMarker = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker.id}`,
        {
          title,
          description,
          location,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.edit.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        dispatch(selectMarker(editedMarker.data));
        updateNotebookMarkers();
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

  const handleDeleteButton = async () => {
    try {
      const token = await getCookies("authToken");

      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleSnackBarOpening(alertMessages.delete.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        dispatch(deselectMarker());
        router.push(`/notes`);
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
    <MarkerModalLayout closeModal={closeModal}>
      <MarkerForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
        onLocationChange={onLocationChange}
      />
      <RedButton
        onClick={handleSnackBarOpening.bind(
          null,
          alertMessages.delete.warning,
          "warning",
          { name: "CHOICE", function: handleDeleteButton, button: "Delete" }
        )}
      >
        Delete marker
      </RedButton>
      <CustomSnackbar />
    </MarkerModalLayout>
  );
};

export default EditMarkerLogic;
