import axios from "axios"

const verifyAuthentication = async (cookie: string | undefined) => {
  try {
    const token = cookie?.replace("authToken=", "");

      const userValidation = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      console.log("USER VALIDATION INSIDE ACTION",userValidation.data)
    
      const { id, created_at, name, notebooks } = userValidation.data;
      const user = { id, created_at, name, notebooks };
    

  } catch (error) {
    return false
  }
}





    //   try {

    //     if (!token) {
    //         return false
    //     }

    //     const verification = await fetch(
    //         "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
    //         {
    //           method: "GET",
    //           credentials: "include",
    //           headers: { Authorization: `Bearer ${token}` },
    //         }
    //       );
      
    //       const verificationJson = await verification.json()
    //         console.log("O JSON NA FUNÇAO",verificationJson)
         
    //         if (verificationJson?.code === "ERROR_CODE_UNAUTHORIZED") {
    //             return false
    //         }

    //       return true
    // } catch (error) {
    //     console.log("ERRO AQUI",error)
    //     return false
    // }


export default verifyAuthentication