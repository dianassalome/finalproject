// import { NextRequest, NextResponse } from "next/server";
// import verifyAuthentication from "./src/actions/auth";


// const middleware = async (req: NextRequest) => {
//   const cookie = req.cookies.get("authToken");
//   const url = req.url;

//   console.log("URL",url)

//     const token = await verifyAuthentication(cookie?.value)

//     if (
//       token &&
//       (url.includes("/login") || url.includes("/sign") ||
//         url === "http://localhost:3000/")
//     ) {
//       return NextResponse.redirect("http://localhost:3000/notes");
//     }

//     if (!token && (url.includes("/notes") || url.includes("/account"))) {
//       return NextResponse.redirect("http://localhost:3000/login");
//     }
// };

// export default middleware;

