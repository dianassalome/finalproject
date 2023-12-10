import emotionStyled from "@emotion/styled";

//Types
import { TBasicData } from "./types";

//Components
import Title1 from "../Titles/Title1";
import Button from "../Button";
import OptionElement from "./OptionElement";
import SelectElement from "./SelectElement";

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
  notebooks: [] | TBasicData[];
  handleNotebookSelection: React.ChangeEventHandler<HTMLSelectElement>;
  setForm: Function;
  selectedNotebook: TBasicData | undefined,
};

const NotebooksDashboard = ({
  notebooks,
  handleNotebookSelection,
  setForm,
  selectedNotebook
}: TDashBoardProps) => {

  return (
    <Container>
      <h1>My notebooks</h1>
      <SelectionContainer>
      <SelectElement onChange={handleNotebookSelection}>
        {notebooks.map(({ id, title }) => (
          <OptionElement key={id} id={id} title={title} selected={selectedNotebook?.id === id ? true : false}/>
        ))}
      </SelectElement>
      <Icon onClick={setForm.bind(null, "CREATE_NOTEBOOK")} className="fi fi-sr-square-plus" />
      </SelectionContainer>
    </Container>
  );
};

export default NotebooksDashboard;
