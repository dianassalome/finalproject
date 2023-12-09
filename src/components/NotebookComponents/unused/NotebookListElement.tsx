import emotionStyled from "@emotion/styled";

//Types
import { TBasicData } from "../types";

//Components
import CenterElementsContainer from "../../GeneralContainers/CenterElementsContainer";

//Functions
import formatDate from "@/actions/formatDate";

const Container = emotionStyled(CenterElementsContainer)`
  width: auto;
  align-items: start;
  box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:hover {
    border-left: 5px solid rgb(255, 204, 0);
    border-right: 5px solid rgb(255, 204, 0);
  }
`;

const Text = emotionStyled.p`
  padding: 0;
  margin: 0;
  text-align: left;
  color: rgb(70, 70, 70);
  font-size: 12px;
`;

const DescriptionText = emotionStyled(Text)`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type TProps = TBasicData & {
  handleNotebookSelection: Function;
};

const NotebookListElement = ({
  id,
  title,
  created_at,
  description,
  handleNotebookSelection,
}: TProps) => {
  return (
    <Container onClick={handleNotebookSelection.bind(null, id)}>
      <h3>{title}</h3>
      <Text>{formatDate(created_at)}</Text>
      <DescriptionText>{description}</DescriptionText>
    </Container>
  );
};

export default NotebookListElement;
