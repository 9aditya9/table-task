import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = ({ visibleColumns, filteredData }) => {
  const columnsToShow = visibleColumns.filter((col) => !col.isHidden);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [sortedData, setSortedData] = useState(filteredData);

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  // sort the columns which is clicked
  const handleSort = (column) => {
    if (!sortedColumn || sortedColumn.id !== column.id) {
      setSortedColumn(column);
      setSortDirection("asc");
    } else {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column.id] > b[column.id] ? 1 : -1;
      } else {
        return a[column.id] < b[column.id] ? 1 : -1;
      }
    });

    setSortedData(sortedData);
  };

  return (
    <div className="table-container">
      <table className="table-section">
        <thead className="table-head">
          <tr className="table-head-row">
            {columnsToShow.map((column, index) => (
              <th
                key={column.id}
                onClick={() => handleSort(column)}
                className="table-head-data"
              >
                {column.label}
                {sortedColumn?.id === column.id && (
                  <span>{sortDirection === "asc" ? "⬆️" : "⬇️"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {sortedData.map((row, index) => (
            <tr className="table-body-row" key={index}>
              {columnsToShow.map((column) =>
                // striping date to only show the date in form of dd name of month yyyy
                column.id === "date" ? (
                  <td key={column.id} className="table-body-data">
                    {new Date(row[column.id]).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                ) : (
                  <td key={column.id}>{row[column.id]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
