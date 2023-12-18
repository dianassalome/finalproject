import axios from "axios"

const verifyAuthentication = async (cookie: string | undefined) => {
  try {
    const token = cookie?.replace("authToken=", "");

      const userValidation = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      const { id, created_at, name, notebooks } = userValidation.data;
      const user = { id, created_at, name, notebooks };
    

  } catch (error) {
    console.log(error)
    return false
  }
}

export default verifyAuthentication