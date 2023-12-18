import { useEffect, useState } from "react";
import axios from "axios";
import emotionStyled from "@emotion/styled";

//Conditional rendering
import dynamic from "next/dynamic";

//Functions
import { getCookies } from "@/actions/cookies";

//Types
import { TNotebook } from "../NotebookComponents/types";

type TNotebookProps = {
  notebook: TNotebook;
};

const Container = emotionStyled.div`
width: 100%;
@media (max-width: 700px) {
  height: 350px;
}
`;

const MapDisplay = ({ notebook }: TNotebookProps) => {

  // const [notebook, setNotebook] = useState<TNotebook | undefined>();

  // useEffect(() => {
  //   const fetchNotebook = async () => {
  //     try {
  //       if (id) {
  //         const token = await getCookies("authToken");

  //         const notebook = await axios.get(
  //           `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${id}`,
  //           { headers: { Authorization: `Bearer ${token}` } }
  //         );

  //         setNotebook(notebook.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchNotebook();
  // }, [id]);

  const Map = dynamic(() => import("./MapPins"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <Container>
       <Map pins={notebook.pins} notebook_id={notebook.id} />
      {/* {notebook && (
       
      )} */}
    </Container>
  );
};

export default MapDisplay;
