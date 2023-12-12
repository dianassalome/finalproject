import emotionStyled from "@emotion/styled";

//Types
import { TBasicData } from "../NotebookComponents/types";
import { TPin } from "../NotebookComponents/types";

//Components
import Title1 from "../Titles/Title1";
import Button from "../Button";
import OptionElement from "../NotebookComponents/OptionElement";
import SelectElement from "../NotebookComponents/SelectElement";

const Container = emotionStyled.div`
  display-flex;
  flex-direction: column;
  justify-content: start;
`;

const Icon = emotionStyled.i`
font-size: 30px;
`

const SelectionContainer = emotionStyled.div`
display: flex;
gap: 2px;
min-width: 290px;
width: auto;
@media (min-width: 700px) {
  min-width: auto;
}
`

type TDashBoardProps = {
  notebookTitle: string;
  markers: [] | TPin[];
  handleMarkerSelection: React.ChangeEventHandler<HTMLSelectElement>;
  setForm: Function;
  selectedMarker: TPin | undefined,
};

const MarkersDashboard = ({
  notebookTitle,
  markers,
  handleMarkerSelection,
  setForm,
  selectedMarker
}: TDashBoardProps) => {

  return (
    <Container>
      <h1>{notebookTitle}</h1>
      <SelectionContainer>
      <SelectElement onChange={handleMarkerSelection}>
        {markers.map(({ id, title }) => (
          <OptionElement key={id} id={id} title={title} selected={selectedMarker?.id === id ? true : false}/>
        ))}
      </SelectElement>
      </SelectionContainer>
    </Container>
  );
};

export default MarkersDashboard;
