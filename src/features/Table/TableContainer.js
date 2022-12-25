import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "./table/Table";
import ColumnContainer from "./ColumnContainer";
import DateRangePicker from "../datepicker/DateRangePicker";
import "./TableContainer.css";

const TableContainer = () => {
  const reportData = useSelector((state) => state.dateRange.reportData);
  const appData = useSelector((state) => state.dateRange.appData);
  const columns = useSelector((state) => state.tableData.visibleColumns);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filteredData, setFilteredData] = useState(reportData);

  useEffect(() => {
    // merge appData and reportData into one array of objects and set it to filteredData state where the appData.id matches reportData.appId
    const mergedData = reportData.map((report) => {
      const app = appData.find((app) => app.id === report.appId);
      // add Fill Rate ( = Ad Request / AD Response * 100%)
      const fillRate = (report.requests / report.responses) * 100;
      const fillRateRounded = Math.round(fillRate * 100) / 100;

      // add CTR ( = Clicks / Impression * 100%)
      const ctr = (report.clicks / report.impressions) * 100;
      const ctrRounded = Math.round(ctr * 100) / 100;
      return { ...report, ...app, fill_rate: fillRateRounded, ctr: ctrRounded };
    });
    setFilteredData(mergedData);
    setVisibleColumns(columns);
  }, [appData, reportData, columns]);

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setFilteredData(sortedData);
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    console.log("value", value);
  };

  const [showColumn, setShowColumn] = useState(false);

  return (
    <div>
      <div className="table-handlers">
        <div>
          <DateRangePicker />
        </div>
        <div>
          <button className="table-settings-btn" onClick={() => setShowColumn(!showColumn)}>
            Settings
          </button>
        </div>
      </div>
      <div className="columns">{showColumn ? <ColumnContainer showColumn={showColumn} setShowColumn={setShowColumn} /> : null}</div>
      {filteredData.length === 0 ? (
        <div className="no-data">No Data</div>
      ) : (
        <Table
          visibleColumns={visibleColumns}
          filteredData={filteredData}
          handleSort={handleSort}
          handleFilter={handleFilter}
        />
      )}
    </div>
  );
};

export default TableContainer;
