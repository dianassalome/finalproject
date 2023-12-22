import emotionStyled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";

//Functions
import formatDate from "@/actions/formatDate";
import { getCookies } from "@/actions/cookies";

//Components
import CreateNotebookLogic from "./CreateNotebookLogic";
import EditNotebookLogic from "./EditNotebookLogic";

//Context
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { selectNotebook } from "@/state/notebook/notesSlice";

const Container = emotionStyled.div`
  display-flex;
  flex-direction: column;
  justify-content: start;
`;

const Icon = emotionStyled.i`
font-size: 30px;
`;

const SelectionContainer = emotionStyled.div`
display: flex;
gap: 2px;
min-width: 290px;
width: auto;
@media (min-width: 700px) {
  min-width: auto;
}
`;
const SelectElement = emotionStyled.select`
border: 2px solid rgb(0, 0, 0);
border-radius: 5px;
height: 30px;
width: 100%;
padding: 5px;
`;

type TBasicData = {
  id: number;
  created_at: number;
  title: string;
  description: string;
};

type TNotebook = TBasicData & {
  user_id: number;
  pins: [] | TPin[];
};

type TLog = TBasicData & {
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

type TPin = TBasicData & {
  location: {
    type: string;
    data: {
      lng: number;
      lat: number;
    };
  };
  notebook_id: number;
  logs: [] | TLog[];
};

type TFormTypes = "CREATE_NOTEBOOK" | "EDIT_NOTEBOOK";

const NotebooksDashboard = () => {
  const dispatch = useDispatch();

  const [userNotebooks, setUserNotebooks] = useState([]);

  useEffect(() => {
    fetchNotebooks()
  } ,[])

  const [modalType, setModalType] = useState<TFormTypes | false>(false);

  const storedNotebook = useSelector(
    (state: RootState) => state.notes.notebook
  );

  !storedNotebook && dispatch(selectNotebook(userNotebooks[0]));

  const handleNotebookSelection = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const notebookId = parseInt(e.target.value);

      const notebook = userNotebooks.find(
        ({ id }: TNotebook) => id === notebookId
      );

      notebook && dispatch(selectNotebook(notebook));
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.target === e.currentTarget && setModalType(false);
  };

  const fetchNotebooks = async () => {
    try {
      const token = await getCookies("authToken");

      const notebooks = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserNotebooks(notebooks.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserNotebooks = async () => {
    setModalType(false);
    fetchNotebooks();
  };

  return (
    <>
      <Container>
        <h1>My notebooks</h1>
        <SelectionContainer>
          <SelectElement
            onChange={handleNotebookSelection}
            value={storedNotebook?.id}
          >
            {userNotebooks.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </SelectElement>
          <Icon
            onClick={() => setModalType("CREATE_NOTEBOOK")}
            className="fi fi-sr-square-plus"
          />
        </SelectionContainer>
        {storedNotebook && (
          <div>
            <h3>{storedNotebook.title}</h3>
            <i
              onClick={() => setModalType("EDIT_NOTEBOOK")}
              className="fi fi-rr-edit"
            />
            <p>{formatDate(storedNotebook.created_at)}</p>
            <p>{storedNotebook.description}</p>
          </div>
        )}
      </Container>
      {modalType === "CREATE_NOTEBOOK" && (
        <CreateNotebookLogic
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
        />
      )}
      {storedNotebook && modalType === "EDIT_NOTEBOOK" && (
        <EditNotebookLogic
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default NotebooksDashboard;
