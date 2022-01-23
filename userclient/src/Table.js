import axios from "axios";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useTable } from 'react-table'

export default function Table({ columns}) {
  const [filterLastName, setFilterLastName] = useState("");
  const [filterAge, setFilterAge] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const dataRef = useRef();
  const pageSizes = [2, 10, 20, 50];
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    }
  )
  dataRef.current = data;
  const onChangeLastName = (e) => {
    setFilterLastName(e.target.value);
  };
  const onChangeAge = (e) => {
    setFilterAge(e.target.value);
  };

  const filterTable = () =>{
    setPage(1);
    retrieveUserData();
  }
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const getRequestParams = (lastName, age, page, pageSize) => {
    let params = {};

    if (lastName) {
      params["lastname"] = lastName;
    }
    if (age) {
      params["age"] = age;
    }
    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveUserData = () => {
    const params = getRequestParams(filterLastName, filterAge, page, pageSize);

    axios.get('http://localhost:8080/api/users',{params})
      .then((response) => {
        const data = response.data;
        const totalCount = response.headers['X-Total-Count'];

        setData(data);
        setCount(Math.ceil(totalCount/pageSize));

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  useEffect(retrieveUserData, [page, pageSize]);

  const reloadTable = () => {
    retrieveUserData();
  };
  // Render the UI for your table
  return (
    <>
    <div className="filterform">
          <input
            type="text"
            placeholder="Last Name"
            value={filterLastName}
            onChange={onChangeLastName}
          />
          <input
            type="number"
            placeholder="Age"
            onChange={onChangeAge}
          />
          <div >
            <button
              type="button"
              onClick={filterTable}
            >
              Search
            </button>
          </div>
      </div>

      <div className="pagination">
        <div >
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      </div>
    </>
  )
}