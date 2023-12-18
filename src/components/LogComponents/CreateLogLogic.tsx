import { TBasicData } from "../NotebookComponents/types";

import { useState } from "react";
import { TNotesFormData } from "../NotebookComponents/types";
import { getCookies } from "@/actions/cookies";
import axios from "axios";
import { PickerFileMetadata } from "filestack-js";
import { PickerOverlay } from "filestack-react";
import formatDate from "@/actions/formatDate";
import NotesForm from "../NotebookComponents/NotesForm";
import Button from "../Button";
import useSnackbar from "../CustomHooks/useSnackbar";
import ModalLayout from "../ModalComponents/ModalLayout";
import alertMessages from "@/assets/alertMessages";
import { useRouter } from "next/router";

const CreateLogLogic = ({
  id,
  closeModal,
  onLogCreation,
  notebookId
}: {
  id: number;
  closeModal: React.MouseEventHandler<HTMLElement>;
  onLogCreation: Function
  notebookId: number
}) => {

  const router = useRouter()
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();
  const [showPicker, setShowPicker] = useState(false);
  // const [mediaContent, setMediaContent] = useState([]);

  type TLogFormData = TNotesFormData & {
    file?: JSON | {};
  };

  const initialFormData = {
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState<TLogFormData>(initialFormData);

  const handleClick = () => {
    formData.title && formData.description
      ? setShowPicker((prevState) => !prevState)
      : handleSnackBarOpening("Insert title and description.", "warning", {
          name: "INFO",
        });
  };

  const handleUploadDone = async (res: PickerFileMetadata | any) => {
    try {
      //ele não reconhece o tipo de ficheiro
      const file = res.filesUploaded[0];


      setFormData({
        ...formData,
        file: file,
      });
      setShowPicker(false);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!formData.file) {
        handleSnackBarOpening("Upload a file.", "warning", { name: "INFO" });
        return;
      }

      const token = await getCookies("authToken");

      const { title, description, file } = formData;

      console.log("FILE AQUI", file);

      const log = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log",
        { title, description, pin_id: id, file },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // const pin = await axios.get(
      //   `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${id}`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // console.log("FETCHED PIN", pin.data);
      // setMarkerLogs(pin.data.logs);
      // await fetchPin()

      console.log("RESULTADO DO CREATE LOG", log.data);
      setFormData(initialFormData);
      setShowPicker(false);
      onLogCreation();
      handleSnackBarOpening(alertMessages.create.success, "success", {name: "INFO"})

      setTimeout(() => {
        router.push(`/notes/${notebookId}/marker/${id}`);
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
    <ModalLayout closeModal={closeModal}>
      <NotesForm
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        formData={formData}
      />
      <Button onClick={handleClick}>Choose File</Button>
      {showPicker && (
        <PickerOverlay
          apikey="AA78siPu2RB3s5YtiioQZz"
          onUploadDone={(res) => handleUploadDone(res)}
        />
      )}
      <CustomSnackbar />
    </ModalLayout>
  );
};

export default CreateLogLogic;
