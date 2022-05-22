import React, { useState, useEffect } from "react";
import DateTimePicker from 'react-datetime-picker';
import "react-table/react-table.css";
import ReactTable from "react-table";
import { fetchJSONData } from "./Utils/StockDataFetcher";

function Interface() {
  const [currDate, onDateChange] = useState(new Date());
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJSONData(currDate).then(resp => {
      handleDataChange(resp.data);
    }).catch(err => {
      console.error("ERROR in fetching stock data: ", err);
    });
  }, [currDate]);


  useEffect(() => {
    if (data.length && columns.length) setLoading(false);
  }, [data, columns]);

  const makeColumns = firstRowData => {
    return Object.keys(firstRowData).map(colName => ({
      Header: colName,
      accessor: colName
    }))
  };

  const handleDataChange = rawData => {
    setData(rawData);
    setColumns(makeColumns(rawData[0]));
  };

  return (
    <div>
      <DateTimePicker onChange={onDateChange} value={currDate} />
      {!loading && (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      )}
    </div>
  );
}

export default Interface;
