import React, { useMemo} from "react";

import Table from "./Table";
import "./App.css";


function App() {
  const columns = useMemo(
    () =>  [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          },
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Address 1",
            accessor: "address1"
          },
          {
            Header: "Address 2",
            accessor: "address2"
          }
        ],
    []
  );


  return (
    <div className="App">
      <Table columns={columns}/>
    </div>
  );
}

export default App;