import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionName: string | null;
  participantsNumber: number;
}

const initialState: SessionState = {
  sessionName: null,
  participantsNumber: 0,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionName: (state, action: PayloadAction<string>) => {
      state.sessionName = action.payload;
    },
    setParticipantsNumber: (state, action: PayloadAction<number>) => {
      state.participantsNumber = action.payload;
    },

    resetSession: (state) => initialState,
  },
});

export const { setSessionName, setParticipantsNumber, resetSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
