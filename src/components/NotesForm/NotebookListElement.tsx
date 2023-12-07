import styled from "@emotion/styled";

//Components
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";

//Functions
import formatDate from "@/actions/formatDate";

const RowAligmentContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Container = styled(CenterElementsContainer)`
min-width: 300px;
  width: 100%;
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

const Text = styled.p`
  padding: 0;
  margin: 0;
  text-align: left;
  color: rgb(70, 70, 70);
  font-size: 12px;
`;

const Icon = styled.i`
  font-size: 15px;
`;

const DescriptionText = styled(Text)`
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type TNotebookTileProps = {
  handleEditButton: Function;
  title: string;
  created_at: number;
  description: string;
};

const NotebookListElement = ({
  handleEditButton,
  title,
  created_at,
  description,
}: TNotebookTileProps) => {
  return (
    <Container>
      <RowAligmentContainer>
        <h3>{title}</h3>
        <span onClick={handleEditButton.bind(null, title, description)}>
          <Icon className="fi fi-rr-edit"></Icon>
        </span>
      </RowAligmentContainer>
      <Text>{formatDate(created_at)}</Text>
      <DescriptionText>{description}</DescriptionText>
    </Container>
  );
};

export default NotebookListElement;

// {handleEditButton, id, title, created_at, description}
// onClick={handleEditButton.bind(null, id, title, description)}
