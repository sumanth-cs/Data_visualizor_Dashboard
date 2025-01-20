import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const DataTable = () => {

  const columns = [
    { field: 'sector', headerName: 'Sector', width: 150 },
    { field: 'topic', headerName: 'Topic', width: 150 },
    { field: 'region', headerName: 'Region', width: 150 },
    { field: 'pestle', headerName: 'PEST', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'country', headerName: 'Country', width: 200 },
    { field: 'end_year', headerName: 'End Year', width: 100 },
    { field: '_id', headerName: 'user id', width: 150 },
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://data-visualizor-dashboard.onrender.com/api/v1/getdata`);
        setTableData(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    tableData && tableData.length > 0 ?
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        sx={{
          height: "40rem", width: "70rem", marginLeft: "40px", padding: "10px",
          boxShadow: "2px 1px 22px rgb(0, 0, 0, 0.2)",
          border:"none",

          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#CFA76D',
            color: 'var(--blackColor)',
            fontSize: 16,
            fontWeight: "bold"
          },
          '& .MuiDataGrid-withBorderColor': {
            border: "1px solid grey"
          },
          '& .css-1v5yu7u-MuiDataGrid-root': {
            borderRadius: "30px"
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'var(--lightBlue)',
          },
          '&.css-1vqhuuf-MuiDataGrid-root':{
            maxWidth:"75rem"
          }
        }}
      />
      : <div>No Data Found</div>
  );
}

export default DataTable;
