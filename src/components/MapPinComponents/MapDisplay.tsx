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
  id: number | undefined;
};

const Container = emotionStyled.div`
width: 100vw;
@media (max-width: 700px) {
  height: 350px;
}
`

const MapDisplay = ({ id }: TNotebookProps) => {
  console.log("ID NO NOTEBOOKDISPLAY", id);

  const [notebook, setNotebook] = useState<TNotebook | undefined>();

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        if (id) {
          const token = await getCookies("authToken");

          const notebook = await axios.get(
            `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(notebook.data);

          setNotebook(notebook.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotebook();
  }, [id]);

  const Map = dynamic(() => import("./MapPins"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <Container>
      {notebook ? (
        <Map pins={notebook.pins} notebook_id={notebook.id} />
      ) : (
        <p>Create your first notebook.</p>
      )}
    </Container>
  );
};

export default MapDisplay;
