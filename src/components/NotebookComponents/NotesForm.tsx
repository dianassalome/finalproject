// Types
import { TNotesFormType } from "./types";

// Components
import Button from "../GeneralComponents/Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import FormTextarea from "../FormComponents/FormTextarea";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";

const NotesForm = ({ onSubmit, onInputChange, formData }: TNotesFormType) => {
  return (
    <>
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
          <InputLabelContainer>
            <label htmlFor="description">Description</label>
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
