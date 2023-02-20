import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "api";

export const getStaffList = createAsyncThunk("staff/getStaffList", async () => {
  const { data } = await api.get("staff");
  return data;
});
