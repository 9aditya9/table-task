import React, { useEffect } from "react";
import TableContainer from "../features/Table/Container/TableContainer";
import "./analytics.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDate,
  setStartDate,
} from "../features/datepicker/dateRangeSlice";
import { setVisibleColumns } from "../features/Table/tableSlice";

const Analytics = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cols = useSelector((state) => state.tableData.columns);
  useEffect(() => {
    document.title = "Analytics";
    const searchParams = new URLSearchParams(location.search);
    const columns = JSON.parse(searchParams.get("columns"));
    console.log(columns);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    if (!columns || !startDate || !endDate) {
      return;
    }
    const updatedColumns = cols.map((column) => {
      if (columns.includes(column.id)) {
        return {
          ...column,
          isHidden: false,
        };
      }
      return {
        ...column,
        isHidden: true,
      };
    });

    // Dispatch the start and end dates to the store
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));

    // Set the visible columns based on the extracted columns data
    dispatch(setVisibleColumns(updatedColumns));
  }, [dispatch]);

  // Extract the start and end dates from the search parameter
  return (
    <div>
      <div className="analytics-nav">
        <h1>Analytics</h1>
      </div>
      <TableContainer />
    </div>
  );
};

export default Analytics;
