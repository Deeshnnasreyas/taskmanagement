import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      Email: "",
      userId: "",
      token: "",
      accessToken: "",
      islogged: false,
    },
    registerUser: {
      Email: "",
      userId: "",
    },
    login_back: {
      type: "",
      Id: 0,
    },

    pending: false,
    error: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.error = null;
      state.errorMessage = null;
    },
    registerUser: (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.error = null;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.user = {
        Email: "",
        userId: "",
        token: "",
        accessToken: "",
      };
      state.pending = false;
      state.error = null;
      state.errorMessage = null;
      localStorage.clear();
      // window.location.reload("/");
    },
    setLogback: (state, action) => {
      state.login_back = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, registerUser, logout, setLogback, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
