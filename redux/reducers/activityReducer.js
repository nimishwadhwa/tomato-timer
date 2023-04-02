import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    value: 10,
  },
  reducers: {
    pomodoro: (state) => {
      state.value = 10;
    },
    shortBreak: (state) => {
      state.value = 1;
    },
    longBreak: (state, action) => {
      state.value = 5;
      //   state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pomodoro, shortBreak, longBreak } = activitySlice.actions;

export default activitySlice.reducer;
