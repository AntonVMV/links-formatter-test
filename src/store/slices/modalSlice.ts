import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  modal: string | null;
}

const initialState: IState = {
  modal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string | null>) => {
      state.modal = action.payload;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
