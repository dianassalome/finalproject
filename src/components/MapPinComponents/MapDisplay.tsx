
import emotionStyled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

//Conditional rendering
import dynamic from "next/dynamic";


//Types
import { TNotebook } from "../NotebookComponents/types";



const Container = emotionStyled.div`
width: 100%;
@media (max-width: 700px) {
  height: 350px;
}
`;

const PlaceholderContainer = emotionStyled.div`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
font-size: 20px;
border-top: 1px solid rgb(230,230,230);
@media (min-width: 700px) {
  border: none;
  border-left: 1px solid rgb(230,230,230);
}
`;

const MapDisplay = () => {
  const storedNotebook = useSelector(
    (state: RootState) => state.notes.notebook
  );

  const Map = dynamic(() => import("./MapPins"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <Container>
      {storedNotebook ? (
        <Map pins={storedNotebook.pins} />
      ) : (
        <PlaceholderContainer>
          <p>You have no notebooks.</p>
        </PlaceholderContainer>
      )}
    </Container>
  );
};

export default MapDisplay;
