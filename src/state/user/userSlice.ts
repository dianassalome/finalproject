import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Functions
import { deleteCookies } from "@/actions/cookies";

type TData = {
  id: number | null;
  created_at: number | null;
  name: string;
  notebooks:
    | {
        id: number;
        created_at: number;
        title: string;
        description: string;
      }[]
    | [];
}

type TUserState = {
  token: string;
  data: TData;
}

const initialState: TUserState = {
  token: "",
  data: { id: null, created_at: null, name: "", notebooks: [] },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setData: (state, action: PayloadAction<TData>) => {
      state.data = action.payload
    },
    logout: (state) => {
      deleteCookies("authToken");
      return initialState
    },
  },
});

export const { login, logout, setData } = userSlice.actions;

export default userSlice.reducer;
