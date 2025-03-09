import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, TextField } from '@mui/material';

const DataTable = ({
  columns,
  rows,
  pageSize = 10,
  checkboxSelection = true,
  disableSelectionOnClick = false,
  autoHeight = true,
  density = 'standard',
}) => {
  console.log(columns);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .MuiDataGrid-root': {
          backgroundColor: '#fff',
          borderRadius: '8px',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          backgroundColor: '#fff',
          color: '#f79400',
          fontWeight: '600 !important',
          fontSize: '1.15rem',
        },
        '& .MuiDataGrid-cell': {
          color: '#333',
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: '#efefef',
          color: '#fff',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize } } }}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        autoHeight={autoHeight}
        density={density}
        slots={{ toolbar: GridToolbar }}
        experimentalFeatures={{
          columnGrouping: true,
          columnResizing: true,
          columnAutosizing: true,
          filtering: true,
          multiFilters: true,
          headerFilters: true,
          sorting: true,
          multiSorting: true,
          rowSelection: true,
          cellSelection: true,
          columnVirtualization: true,
          rowVirtualization: true,
          rowGrouping: true,
          aggregation: true,
          excelExport: true,
          columnPinning: true,
          rowPinning: true,
        }}
      />
    </Box>
  );
};

export default DataTable;
