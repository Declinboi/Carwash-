import { createSlice } from "@reduxjs/toolkit";

const getUserInfo = () => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("userInfo");
    const expirationTime = localStorage.getItem("expirationTime");

    if (data && expirationTime) {
      const now = new Date().getTime();
      if (now > parseInt(expirationTime, 10)) {
        console.warn("User session expired. Clearing storage.");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expirationTime");
        return null;
      }
      return JSON.parse(data);
    }

    return null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    return null;
  }
};

const initialState = {
  userInfo: getUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
        localStorage.setItem("expirationTime", expirationTime.toString());
      }
    },
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expirationTime");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
