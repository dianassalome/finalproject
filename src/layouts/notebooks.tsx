// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import { getCookies } from "@/actions/cookies";
// import axios from "axios";
// import { useEffect } from "react";

// const NotebooksPage = () => {
//   useEffect(() => {
//     const getToken = async () => {
//       const authToken = await getCookies("authToken");
//       console.log("AUTHTOKEN DO getCookies", authToken);
//       const user = await axios.get(
//         "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       console.log("RESULTADO DO XANO", user.data);
//     };
//     getToken();
//   }, []);

//   return <h1>notebooks list</h1>;
// };

// export default NotebooksPage;

// type Repo = {
//   id: number | null;
//   created_at: number | null;
//   name: string;
//   notebooks:
//     | {
//         id: number;
//         created_at: number;
//         title: string;
//         description: string;
//       }[]
//     | [];
// } | null;

// export const getServerSideProps = (async (context) => {
//   try {
//     const cookies = context.req.headers.cookie;

//   console.log("COOKIES FUNCIONA?", cookies);

//   const authToken = await getCookies("authToken");

//   console.log("AUTHTOKEN DO getCookies", authToken);

//   const user = await axios.get(
//     "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
//     { headers: { Authorization: `Bearer ${authToken}` } }
//   );

//   console.log("RESULTADO DO XANO", user.data);

//   const { id, created_at, name, notebooks } = user.data;

//   const repo = { id, created_at, name, notebooks };

//   return { props: { repo } };
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error);

//     return { props: { repo: null } }

//   }
// }) satisfies GetServerSideProps<{
//   repo: Repo;
// }>;

// export const getServerSideProps = (async (context) => {
//     try {
//       const cookies = context.req.headers.cookie;
//       console.log("COOKIES FUNCIONA?", cookies);

//       const authToken = await getCookies("authToken");
//       console.log("AUTHTOKEN DO getCookies", authToken);

//       const user = await axios.get(
//         "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       console.log("RESULTADO DO XANO", user.data);

//       const { id, created_at, name, notebooks } = user.data;
//       const repo = { id, created_at, name, notebooks };

//       console.log("Repo:", repo);

//       return { props: { repo } };
//     } catch (error) {
//       console.error("Error in getServerSideProps:", error);
//       return {
//         props: {
//           repo: null, // or handle error state
//         },
//       };
//     }
//   }) satisfies GetServerSideProps<{
// repo: Repo;
// }>;

// const NotebooksPage = ({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//     console.log("Repo:", repo);
//     if (!repo) {
//         console.log("Repo is undefined");
//         return <h1>Loading...</h1>;
//       }

//   return <h1>{repo.name} notebooks list</h1>;
// };

// export default NotebooksPage;

// import { useDispatch } from "react-redux";
// import { login, setData } from "@/state/user/userSlice";

//   const dispatch = useDispatch();
//   dispatch(login(authToken));
//   dispatch(setData({ id, created_at, name, notebooks }));
