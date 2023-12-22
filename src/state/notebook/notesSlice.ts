import { createSlice, PayloadAction } from "@reduxjs/toolkit";


  type TBasicData = {
    id: number;
    created_at: number;
    title: string;
    description: string;
  };
  
  type TNotebook = TBasicData & {
    user_id: number;
    pins: [] | TPin[]
  }

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
    logs: [] | TLog[]
  };

type TNotebookState = {
  notebook: TNotebook | null;
  marker: TPin | null;
  log: TLog | null
};

const initialState: TNotebookState = {
  notebook: null,
  marker: null,
  log: null
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    selectNotebook: (state, action: PayloadAction<TNotebook>) => {
      state.notebook = action.payload;
    },
    deselectNotebook: (state) => {
      state.notebook = null;
    },
    selectMarker : (state, action: PayloadAction<TPin>) => {
      state.marker = action.payload;
    },
    deselectMarker: (state) => {
      state.marker = null;
    },
    selectLog : (state, action: PayloadAction<TLog>) => {
      state.log = action.payload;
    },
    deselectLog: (state) => {
      state.log = null;
    },
    deselectAll: (state) => {
      return initialState
    }
  },
});

export const { selectNotebook, deselectNotebook, selectMarker, deselectMarker, selectLog, deselectLog, deselectAll } = notesSlice.actions;

export default notesSlice.reducer;
