import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: "date", label: "Date", minWidth: 170, isHidden: false },
    { id: "app_name", label: "App Name", minWidth: 100, isHidden: false },
    { id: "requests", label: "Requests", minWidth: 170, isHidden: false },
    { id: "responses", label: "Responses", minWidth: 170, isHidden: false },
    { id: "impressions", label: "Impressions", minWidth: 170, isHidden: false },
    { id: "clicks", label: "Clicks", minWidth: 170,  isHidden: false },
    { id: "revenue", label: "Revenue", minWidth: 170, isHidden: false },
    { id: "fill_rate", label: "Fill Rate", minWidth: 170,   isHidden: false },
    { id: "ctr", label: "CTR", minWidth: 170, isHidden: false },
  ],
  visibleColumns: [
    { id: "date", label: "Date", minWidth: 170, isHidden: false },
    { id: "app_name", label: "App Name", minWidth: 100, isHidden: false },
    { id: "requests", label: "Requests", minWidth: 170, isHidden: false },
    { id: "responses", label: "Responses", minWidth: 170, isHidden: false },
    { id: "impressions", label: "Impressions", minWidth: 170, isHidden: false },
    { id: "clicks", label: "Clicks", minWidth: 170,  isHidden: false },
    { id: "revenue", label: "Revenue", minWidth: 170, isHidden: false },
    { id: "fill_rate", label: "Fill Rate", minWidth: 170,   isHidden: false },
    { id: "ctr", label: "CTR", minWidth: 170, isHidden: false },
  ],
  loading: false,
  error: null,
};

const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setVisibleColumns: (state, action) => {
      state.visibleColumns = action.payload;
    },
    toggleColumn: (state, action) => {
      const { id } = action.payload;
      const index = state.visibleColumns.findIndex((col) => col.id === id);
      if (index === -1) {
        state.visibleColumns.push(action.payload);
      } else {
        state.visibleColumns.splice(index, 1);
      }
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    }

  },
  extraReducers: {},
});

export const { setVisibleColumns, toggleColumn, setColumns } = tableDataSlice.actions;
export default tableDataSlice.reducer;
