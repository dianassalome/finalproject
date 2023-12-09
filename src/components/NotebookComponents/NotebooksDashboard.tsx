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
max-width: 290px;
`

type TDashBoardProps = {
  notebooks: [] | TBasicData[];
  handleNotebookSelection: React.ChangeEventHandler<HTMLSelectElement>;
  setForm: Function;
};

const NotebooksDashboard = ({
  notebooks,
  handleNotebookSelection,
  setForm,
}: TDashBoardProps) => {
  console.log("I'M RENDERING _ Dashboard");

  return (
    <Container>
      <h1>My notebooks</h1>
      <SelectionContainer>
      <SelectElement onChange={handleNotebookSelection}>
        {notebooks.map(({ id, title }) => (
          <OptionElement key={id} id={id} title={title} />
        ))}
      </SelectElement>
      <Icon onClick={setForm.bind(null, "CREATE_NOTEBOOK")} className="fi fi-sr-square-plus" />
      </SelectionContainer>
    </Container>
  );
};

export default NotebooksDashboard;
