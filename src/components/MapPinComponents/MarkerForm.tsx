import Button from "../Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import FormLabels from "../FormComponents/FormLabels";
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import FormTextarea from "../FormComponents/FormTextarea";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";
import emotionStyled from "@emotion/styled";

import EditMapCoordinates from "./EditMap";

import { TPin } from "../NotebookComponents/types";

const MarkerInfoContainer = emotionStyled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row
  }
`;

const FormContainer = emotionStyled.div`
display: flex;
flex-direction: column;
`;

type TNotesFormType = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  formData: TPin;
  onLocationChange: Function;
};

const MarkerForm = ({
  onSubmit,
  onInputChange,
  formData,
  onLocationChange,
}: TNotesFormType) => {
  return (
    <>
      <MarkerInfoContainer>
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
        <EditMapCoordinates
          location={formData.location.data}
          onLocationChange={onLocationChange}
        />
      </MarkerInfoContainer>
    </>
  );
};

export default MarkerForm;
