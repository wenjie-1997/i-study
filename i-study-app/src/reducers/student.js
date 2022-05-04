import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "student",
  initialState: { timetable: [] },
  reducers: {
    GET_STUDENT_TIMETABLE_REQUEST: () => {},
    GET_STUDENT_TIMETABLE_SUCCESS: (state, action) => {
      state.timetable = action.payload;
    },
    GET_STUDENT_TIMETABLE_FAILED: () => {},
  },
});

export const {
  GET_STUDENT_TIMETABLE_REQUEST,
  GET_STUDENT_TIMETABLE_SUCCESS,
  GET_STUDENT_TIMETABLE_FAILED,
} = slice.actions;
export default slice.reducer;
