import { configureStore } from '@reduxjs/toolkit';
import dateRangeReducer from '../features/datepicker/dateRangeSlice';
import tableDataReducer from '../features/Table/tableSlice';

export const store = configureStore({
  reducer: {
    dateRange: dateRangeReducer,
    tableData: tableDataReducer,
  },
});
