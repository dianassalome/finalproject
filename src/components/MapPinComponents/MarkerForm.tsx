import emotionStyled from "@emotion/styled";
import dynamic from "next/dynamic";

// Components
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import FormTextarea from "../FormComponents/FormTextarea";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";
import Button from "../GeneralComponents/Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";

// Types
import { TPin } from "../NotebookComponents/types";

const MarkerInfoContainer = emotionStyled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row
  }
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
  const EditMap = dynamic(() => import("./EditMapCoordinates"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <>
      <MarkerInfoContainer>
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
        <EditMap
          location={formData.location.data}
          onLocationChange={onLocationChange}
        />
      </MarkerInfoContainer>
    </>
  );
};

export default MarkerForm;
