import { TNotesFormType } from "./types";
import Button from "../Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import FormLabels from "../FormComponents/FormLabels";
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import FormTextarea from "../FormComponents/FormTextarea";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";

const NotesForm = ({ onSubmit, onInputChange, formData }: TNotesFormType) => {
  
  return (
    <>
    <form onSubmit={onSubmit}>
      <CenterElementsContainer>
        <InputLabelContainer>
          <FormLabels htmlFor="title">Title</FormLabels>
          <FormInputBoxes
            onChange={onInputChange}
            value={formData.title}
            name="title"
          />
        </InputLabelContainer>
        <InputLabelContainer>
          <FormLabels htmlFor="description">Description</FormLabels>
          <FormTextarea
            onChange={onInputChange}
            value={formData.description}
            name="description"
            rows={8}
          />
        </InputLabelContainer>
        <Button>Submit</Button>
      </CenterElementsContainer>
    </form>
    </>
  );
};

export default NotesForm;
