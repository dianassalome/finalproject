// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import axios from "axios";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/state/store";
// import { setData, logout } from "@/state/user/userSlice";
// import { useRouter } from "next/router";

// //Functions
// import formatDate from "@/actions/formatDate";

// //Style
// import emotionStyled from "@emotion/styled";

// //Types
// import { TBasicData } from "@/components/NotebookComponents/types";
// import { TPin } from "@/components/NotebookComponents/types";

// //Components
// import MarkersDashboard from "@/components/MapPinComponents/MarkersDashboard";
// import EditMarkerLogic from "@/components/MapPinComponents/unused/EditMarkerLogic";
// import EditNotebookLogic from "@/components/NotebookComponents/EditNotebookLogic";
// import MapDisplay from "@/components/MapPinComponents/MapDisplay";

// const SideBar = emotionStyled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 15px;
//   justify-content: start;
//   gap: 5px;
//   word-wrap: break-word;
//   height: 50vh;
//   overflow: auto;
//   margin-bottom: 10px;
//   @media (min-width: 700px) {
//     width: 320px;
//     // max-width: 320px;
//     height: auto;
//   }
// `;

// const GeneralContainer = emotionStyled.div`
//   display: flex;
//   height: 100vh;
//   width: 100vw;
//   flex-direction: column;
//   @media (min-width: 700px) {
//     flex-direction: row;
//     height: 70vh;
//     width: 100%;
//   }
// `;

// type TNotebook = {
//   id: number;
//   created_at: number;
//   title: string;
//   description: string;
// };

// type TUser = {
//   id: number | null;
//   created_at: number | null;
//   name: string;
//   notebooks: TNotebook[] | [];
// } | null;

// export const getServerSideProps = (async (context) => {
//   try {
//     const cookies = context.req.headers.cookie;

//     const token = cookies?.replace("authToken=", "");

//     const userValidation = await axios.get(
//       "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const { id, created_at, name, notebooks } = userValidation.data;
//     const user = { id, created_at, name, notebooks };

//     console.log(context.query);

//     const { notebookId } = context.query;

//     const notebook = await axios.get(
//       `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`
//     );

//     const markerId =
//       typeof context.query.markerId === "string" &&
//       parseInt(context.query.markerId);

//     return {
//       props: {
//         user,
//         notebook: notebook.data,
//         marker: { id: markerId },
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/login`,
//       },
//     };
//   }
// }) satisfies GetServerSideProps<{
//   marker: { id: number | false };
//   user: TUser;
//   notebook: TNotebook & { pins: TPin[] };
// }>;

// const MarkerPage = ({
//   user,
//   notebook,
//   marker,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   type TFormTypes = "ADD_CONTENT" | "EDIT_MARKER";

//   const dispatch = useDispatch();
//   dispatch(setData(user));

//   const [notebookMarkers, setNotebookMarkers] = useState<TPin[] | []>([]);

//   const [modalType, setModalType] = useState<TFormTypes | false>(false);

//   const selectedMarkerInitialState = notebook.pins.find(
//     ({ id }: TPin) => id === marker.id
//   );
//   const [selectedMarker, setSelectedMarker] = useState<TPin | undefined>(
//     selectedMarkerInitialState
//   );

//   const handleMarkerSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const markerId = parseInt(e.target.value);

//     const marker = notebookMarkers.find(({ id }) => id === markerId);

//     setSelectedMarker(marker);
//   };

//   const setForm = (type: TFormTypes) => {
//     setModalType(type);
//   };

//   const updateNotebookMarkers = (markers: TPin[] | [], marker: TPin) => {
//     setModalType(false);
//     setNotebookMarkers(markers);
//     setSelectedMarker(marker);
//   };

//   const closeModal = (e: React.MouseEvent<HTMLElement>) => {
//     e.target === e.currentTarget && setModalType(false);
//   };

//   return (
//     <GeneralContainer>
//       <SideBar>
//         <MarkersDashboard
//           notebookTitle={notebook.title}
//           markers={notebookMarkers}
//           handleMarkerSelection={handleMarkerSelection}
//           setForm={setForm}
//           selectedMarker={selectedMarker}
//         />
//         {selectedMarker && (
//           <div>
//             <h3>{selectedMarker.title}</h3>
//             <i
//               onClick={setForm.bind(null, "EDIT_MARKER")}
//               className="fi fi-rr-edit"
//             />
//             <p>{formatDate(selectedMarker.created_at)}</p>
//             <p>{selectedMarker.description}</p>
//           </div>
//         )}
//       </SideBar>
//       {selectedMarker && modalType === "EDIT_MARKER" && (
//         <EditMarkerLogic
//           markerId={selectedMarker.id}
//           updateNotebookMarkers={updateNotebookMarkers}
//           closeModal={closeModal}
//           initialData={{
//             title: selectedMarker.title,
//             description: selectedMarker.description,
//             location: {
//               lng: selectedMarker.location.data.lng,
//               lat: selectedMarker.location.data.lat,
//             },
//           }}
//         />
//       )}
//     </GeneralContainer>
//   );
// };

// export default MarkerPage;
