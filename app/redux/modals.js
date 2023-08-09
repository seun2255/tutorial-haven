import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModal: false,
  succesModal: false,
  succesModalText: "",
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setWalletModal: (state, action) => {
      state.walletModal = action.payload;
    },
    openSuccesModal: (state, action) => {
      state.succesModalText = action.payload.text;
      state.succesModal = true;
    },
    closeSuccesModal: (state, action) => {
      state.succesModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWalletModal, openSuccesModal, closeSuccesModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;
