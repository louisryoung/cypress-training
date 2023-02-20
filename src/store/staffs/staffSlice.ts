import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getStaffList } from "./actions";
import { Staff } from "constants/types";

interface StaffState {
  staffs: Staff[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: StaffState = {
  staffs: [],
  loading: false,
  error: null,
};

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaffList.pending, (state) => {
        state.loading = true;
        state.staffs = [];
        state.error = null;
      })
      .addCase(getStaffList.fulfilled, (state, action) => {
        const { results: staffs } = action.payload;
        state.loading = false;
        state.staffs = staffs;
      })
      .addCase(getStaffList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectStaffs = (state: RootState) => state.staff.staffs;
export const selectLoading = (state: RootState) => state.staff.loading;

export default staffSlice.reducer;
