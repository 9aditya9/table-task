import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleColumns } from "./tableSlice";
import "./Column.css";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  setStartDate,
  setEndDate,
} from "../datepicker/dateRangeSlice";

const initialState = {
  dragFrom: null,
  draggedTo: null,
  isDragging: false,
  firstOrder: [],
  changeOrder: [],
};

const ColumnContainer = ({ showColumn, setShowColumn }) => {
  const dispatch = useDispatch();
  const [dragAndDrop, setDragAndDrop] = useState(initialState);
  // const columns = useSelector((state) => state.tableData.columns);
  const visibleColumns = useSelector((state) => state.tableData.visibleColumns);
  const [selectedColumns, setSelectedColumns] = useState(visibleColumns);
  const startDate = useSelector((state) => state.dateRange.startDate);
  const endDate = useSelector((state) => state.dateRange.endDate);

  const location = useLocation();
  const navigate = useNavigate();

  const onDragStart = (e) => {
    const startPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      dragFrom: startPosition,
      isDragging: true,
      firstOrder: selectedColumns,
    });
  };
  const onDrop = (e) => {
    setSelectedColumns(dragAndDrop.changeOrder);
    setDragAndDrop({
      ...dragAndDrop,
      dragFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragover = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.firstOrder;
    let draggedFrom = dragAndDrop.dragFrom;
    let draggedTo = Number(e.currentTarget.dataset.position);
    let itemDragged = newList[draggedFrom];
    let leftOver = newList.filter((item, index) => index !== draggedFrom);
    newList = [
      ...leftOver.slice(0, draggedTo),
      itemDragged,
      ...leftOver.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        changeOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const handleClick = (column) => {
    console.log(column);
    // change the isHidden property of the column that was clicked without mutating the original array
    const newColumns = selectedColumns.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          isHidden: !col.isHidden,
        };
      }
      return col;
    });
    console.log(newColumns);
    setSelectedColumns(newColumns);
  };

  const handleSubmit = () => {
    dispatch(setVisibleColumns(selectedColumns));
    console.log(visibleColumns);
    const cols = selectedColumns.filter((column) => !column.isHidden).map((column) => column.id);
    const searchParams = new URLSearchParams();
    searchParams.set('columns', JSON.stringify(cols));
    searchParams.set('start_date', JSON.stringify(startDate));
    searchParams.set('end_date', JSON.stringify(endDate));

    const updatedLocation = {
      state: {
        ...location.state,
        filters: visibleColumns
      },
      search: searchParams.toString()
    };
    // navigate function to update the URL with the updated location object
    navigate(updatedLocation);
    console.log(location);
    console.log("updatedLocation", updatedLocation);
  };


  useEffect(() => {
    // Parse the search string to extract the columns data
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const start_date = JSON.parse(searchParams.get('start_date'));
    const end_date = JSON.parse(searchParams.get('end_date'));
    const columns = JSON.parse(searchParams.get('columns'));
    if (!columns) {
      return;
    }
    const updatedColumns = selectedColumns.map((column) => {
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
    dispatch(setVisibleColumns(updatedColumns));
    dispatch(setStartDate(start_date));
    dispatch(setEndDate(end_date));
  }, [dispatch, location, selectedColumns]);

  return (
    <div className="col-container">
      <div className="col-container-items">
        {selectedColumns.map((column, index) => (
          <div
            draggable="true"
            data-position={index}
            key={index}
            onDragStart={onDragStart}
            onDragOver={onDragover}
            onDrop={onDrop}
          >
            <button
              key={column.id}
              style={{
                borderLeft: !column.isHidden && "5px solid #136FED",
              }}
              className="col-button"
              onClick={() => handleClick(column)}
            >
              {column.label}
            </button>
          </div>
        ))}
      </div>
      <div className="col-handlers">
        <button className="col-handlers-item close-btn" onClick={() => setShowColumn(!showColumn)}>Close</button>
        <button className="col-handlers-item" onClick={handleSubmit}>Apply Changes</button>
      </div>
    </div>
  );
};

export default ColumnContainer;
