import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./datepicker.css";
import {
  setStartDate,
  setEndDate,
  setReportData,
  setAppData,
} from "./dateRangeSlice";
import { useLocation, useNavigate } from "react-router-dom";

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateRange.startDate);
  const endDate = useSelector((state) => state.dateRange.endDate);
  const [isLoading, setIsLoading] = useState(false);
  const visibleColumns = useSelector((state) => state.tableData.visibleColumns);
  const location = useLocation();
  const navigate = useNavigate();

  const handleStartDateChange = (event) => {
    if (event.target.value > endDate) {
      alert("Start date cannot be greater than end date");
      return;
    }
    dispatch(setStartDate(event.target.value));
  };

  const handleEndDateChange = (event) => {
    if (event.target.value < startDate) {
      alert("End date cannot be less than start date");
      return;
    }
    dispatch(setEndDate(event.target.value));
  };

  useEffect(() => {
    dispatch(setAppData())
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect");

    const pushToUrl = () => {
      const cols = visibleColumns
        .filter((column) => !column.isHidden)
        .map((column) => column.id);
      const searchParams = new URLSearchParams();
      searchParams.set("columns", JSON.stringify(cols));
      searchParams.set("start_date", startDate);
      searchParams.set("end_date", endDate);

      const updatedLocation = {
        state: {
          ...location.state,
        },
        search: searchParams.toString(),
      };
      //   navigate(`?${searchParams.toString()}`, { replace: true });
      navigate(updatedLocation);
      console.log(location);
      console.log("updatedLocation", updatedLocation);
    };
    pushToUrl();
    dispatch(setReportData({ startDate: startDate, endDate: endDate }))
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [startDate, endDate, dispatch, visibleColumns, navigate]);

  return (
    <form className="date-picker-form-container">
      <div>
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
      />
      </div>
      <div>
      <label htmlFor="end-date">End Date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      </div>
    </form>
  );
};

export default DateRangePicker;
