import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: "2021-01-01",
  endDate: "2021-01-31",
  reportData: [],
  appData: [],
};

export const setReportData = createAsyncThunk(
  'dateRange/setReportData',
  async (dates) => {
    console.log(dates);
    const res = await fetch(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${dates.startDate}&endDate=${dates.endDate}`).then(
      (data) => data.json()
    );
    console.log(res.data);
    return res.data;
  }
);

export const setAppData = createAsyncThunk(
  'dateRange/setAppData',
  async () => {
    const res = await fetch('https://go-dev.greedygame.com/v3/dummy/apps').then(
      (data) => data.json()
    );
    return res.data;
  }
);

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(setReportData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setReportData.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData= action.payload;
      })
      .addCase(setReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setAppData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAppData.fulfilled, (state, action) => {
        state.loading = false;
        state.appData= action.payload;
      })
      .addCase(setAppData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setStartDate, setEndDate } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
