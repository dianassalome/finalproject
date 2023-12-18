// import emotionStyled from "@emotion/styled";

// import { TPin } from "../NotebookComponents/types";
// import formatDate from "@/actions/formatDate";

// import { useState } from "react";
// import EditMarkerLogic from "./EditMarkerLogic";
// import Button from "../Button";
// import CreateLogLogic from "../LogComponents/CreateLogLogic";

// import axios from "axios";
// import { TNotesFormData } from "../NotebookComponents/types";
// import LogMap from "../LogComponents/LogMap";
// import { GetServerSideProps } from "next";
// import { TNotebook } from "../NotebookComponents/types";
// import NextLink from "../NextLink";

// const MarkerDescriptionContainer = emotionStyled.div`
// width: 80%;
// `;

// const LogsGrid = emotionStyled.div`
// display: grid;
// width: 80%;
// grid-template-columns: repeat(3, 1fr);
// // gap: 3%;
// // justify-content: center;
// `;

// type TMarkerDisplayProps = {
//   notebook: TNotebook;
//   marker: TPin & { logs: TLogFormData[] | [] };
//   // closeModal: React.MouseEventHandler<HTMLElement>;
//   // updateNotebookMarkers: Function;
// };

// type TLogFormData = TNotesFormData & {
//   id: number;
//   created_at: number;
//   file: { url: string; mimetype: string };
//   pin_id: number;
//   user_id: number;
// };

// const logInitialData = [
//   {
//     id: 0,
//     created_at: 0,
//     title: "",
//     description: "",
//     pin_id: 0,
//     user_id: 0,
//   },
// ];

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const markerId = context.query.markerId;
//     const notebookId = context.query.notesId;

//     const cookies = context.req.headers.cookie;

//     const token = cookies?.replace("authToken=", "");

//     const userValidation = await axios.get(
//       "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const { id, created_at, name, notebooks } = userValidation.data;
//     // const user = { id, created_at, name, notebooks};

//     const marker = await axios.get(
//       `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${markerId}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (typeof notebookId === "string") {
//       const notebook = notebooks.find(
//         ({ id }: { id: number }) => id === parseInt(notebookId)
//       );

//       return { props: { notebook, marker: marker.data } };
//     }

//     return { props: { marker: marker.data } };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/notes`,
//       },
//     };
//   }
// };

// const MarkerDisplay = ({ marker, notebook }: TMarkerDisplayProps) => {
//   const [editMode, setEditMode] = useState(false);

//   const [addFile, setAddFile] = useState(false);

//   const [markerLogs, setMarkerLogs] = useState<TLogFormData[] | []>(
//     marker.logs
//   );

//   const closeModal = () => {
//     setEditMode(false);
//   };

//   return (
//     <>
//       <MarkerDescriptionContainer>
//       <NextLink href={`/notes/${notebook.id}`}>{notebook.title}</NextLink>
//         <h2>{marker.title}</h2>
//         <i onClick={() => setEditMode(true)} className="fi fi-rr-edit" />
//         <p>{formatDate(marker.created_at)}</p>
//         <p>{marker.description}</p>
//       </MarkerDescriptionContainer>
//       {editMode && (
//         <EditMarkerLogic
//           notebookId={notebook.id}
//           initialData={marker}
//           closeModal={closeModal}
//         />
//       )}
//       <LogsGrid>
//         {markerLogs.length > 0 && <LogMap markerLogs={markerLogs} />}
//       </LogsGrid>
//       <Button onClick={() => setAddFile(!addFile)}>Add file</Button>
//       {addFile && (
//         <CreateLogLogic
//           id={marker.id}
//           setAddFile={setAddFile}
//           // fetchPin={fetchPin}
//         />
//       )}
//     </>
//   );
// };

// export default MarkerDisplay;
