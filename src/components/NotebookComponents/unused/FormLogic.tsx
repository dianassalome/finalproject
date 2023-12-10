// import NotesForm from "@/components/NotebookComponents/NotesForm";
// import { useState } from "react";
// import { INotesFormData } from "@/components/NotebookComponents/types";
// // import { useRouter } from "next/router";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/state/store";
// import axios from "axios";
// import { setData } from "@/state/user/userSlice";

// interface IFormLogicParams {
//   fetchType: string;
//   url: string;
//   customFormData: { title: string; description: string };
//   resetModal: Function;
//   setUserNotebooks: Function;
// }

// const FormLogic = ({
//   fetchType,
//   url,
//   customFormData,
//   resetModal,
//   setUserNotebooks,
// }: IFormLogicParams) => {
//   const [formData, setFormData] = useState<INotesFormData>(customFormData);
//   //   const router = useRouter();
//   const userToken = useSelector((state: RootState) => state.user.token);
//   const dispatch = useDispatch();

//   let customFetch: Function;

//   switch (fetchType) {
//     case "post":
//       customFetch = axios.post;
//       break;
//     case "patch":
//       customFetch = axios.patch;
//       break;
//     default:
//       console.log("wtf");
//   }

//   const onInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     try {
//       e.preventDefault();

//       const { title, description } = formData;

//       const user = await customFetch(
//         `${url}`,
//         { title, description },
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );

//       //tem de ser uma cookie
//       const { id, created_at, name, notebooks } = user.data;

//       dispatch(setData({ id, created_at, name, notebooks }));
//       setUserNotebooks(notebooks);
//       console.log(user.data);

//       resetModal();

//       //   router.push("/notebooks");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <NotesForm
//       onSubmit={onSubmit}
//       onInputChange={onInputChange}
//       formData={formData}
//     />
//   );
// };

// export default FormLogic;
