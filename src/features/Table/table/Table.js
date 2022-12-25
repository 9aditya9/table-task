import React from "react";
import "../Table.css";

const Table = ({
  visibleColumns,
  handleSort,
  sortedColumn,
  sortDirection,
  filteredData,
}) => {
  const columnsToShow = visibleColumns.filter((col) => !col.isHidden);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {
              columnsToShow.map((column, index) => (
                <th key={column.id} onClick={() => handleSort(column)}>
                  {column.label}
                  {sortedColumn === column.id && (
                    <span>{sortDirection === "asc" ? "⬆️" : "⬇️"}</span>
                  )}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((row, index) => (
              <tr key={index}>
                {
                  columnsToShow.map((column) => (
                    // striping date to only show the date in form of dd name of month yyyy
                    column.id === "date" ? (
                      <td key={column.id}>
                        {new Date(row[column.id]).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                    ) : (
                    <td key={column.id}>{row[column.id]}</td>
                    )
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
