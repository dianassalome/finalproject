import { TBasicData } from "../NotebookComponents/types";

import { useState } from "react";
import { TNotesFormData } from "../NotebookComponents/types";
import { getCookies } from "@/actions/cookies";
import axios from "axios";
import { PickerFileMetadata } from "filestack-js";
import { PickerOverlay } from "filestack-react";
import formatDate from "@/actions/formatDate";
import NotesForm from "../NotebookComponents/NotesForm";
import Button from "../GeneralComponents/Button";
import useSnackbar from "../CustomHooks/useSnackbar";
import ModalLayout from "../ModalComponents/ModalLayout";
import alertMessages from "@/assets/alertMessages";
import { useRouter } from "next/router";

import FormInputBoxes from "../FormComponents/FormInputBoxes";
import InputLabelContainer from "../FormComponents/InputLabelContainer";

import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";

//Context
import { useDispatch } from "react-redux";

const CreateLogLogic = ({
  markerId,
  closeModal,
  onLogCreation,
}: {
  markerId: number;
  closeModal: React.MouseEventHandler<HTMLElement>;
  onLogCreation: Function;
}) => {
  const router = useRouter();
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();
  const [showPicker, setShowPicker] = useState(false);
  // const [mediaContent, setMediaContent] = useState([]);

  type TLogFormData = {
    title: string;
    file?: JSON | {};
  };

  const initialFormData = {
    title: "",
  };

  const [formData, setFormData] = useState<TLogFormData>(initialFormData);

  const handleClick = () => {
    formData.title
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

      const { title, file } = formData;

      console.log("FILE AQUI", file);

      const log = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/log",
        { title, pin_id: markerId, file },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("RESULTADO DO CREATE LOG", log.data);
      setFormData(initialFormData);
      setShowPicker(false);
      onLogCreation();

      handleSnackBarOpening(alertMessages.create.success, "success", {
        name: "INFO",
      });

      setTimeout(() => {
        // dispatch(select)
        // router.push(`/notes/marker/`);
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
      <form onSubmit={onSubmit}>
        <CenterElementsContainer>
          <InputLabelContainer>
            <label htmlFor="title">Title</label>
            <FormInputBoxes
              onChange={onInputChange}
              value={formData.title}
              name="title"
            />
          </InputLabelContainer>
          <Button>Submit</Button>
        </CenterElementsContainer>
      </form>
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
