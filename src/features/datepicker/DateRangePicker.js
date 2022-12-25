import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './datepicker.css';
import {
  setStartDate,
  setEndDate,
  setReportData,
  setAppData,
} from "./dateRangeSlice";


const DateRangePicker = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateRange.startDate);
  const endDate = useSelector((state) => state.dateRange.endDate);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDateChange = (event) => {
    dispatch(setStartDate(event.target.value));
  };

  const handleEndDateChange = (event) => {
    dispatch(setEndDate(event.target.value));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(startDate, endDate);
    dispatch(setReportData({ startDate: startDate, endDate: endDate }))
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(setAppData())
    .then(() => {
      console.log("done")
      })
    .catch((error) => {
      console.log(error);
    });
  }, [dispatch]);

  return (
    <form className="date-picker-form-container">
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <br />
      <label htmlFor="end-date">End Date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <br />
      <button type="button" onClick={handleSubmit} disabled={isLoading}>
        Fetch Data
      </button>
    </form>
  );
};

export default DateRangePicker;