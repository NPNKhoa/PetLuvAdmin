import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { viVN } from '@mui/x-data-grid/locales';

const DataTable = ({
  columns,
  rows,
  handleRowSelection,
  onView,
  pageSize = 10,
  checkboxSelection = true,
  disableSelectionOnClick = false,
  autoHeight = true,
  density = 'standard',
}) => {
  const finalColumns = onView
    ? [
        ...columns,
        {
          field: 'actions',
          headerName: 'Chức năng',
          flex: 1.5,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            return (
              <IconButton onClick={() => onView(params)}>
                <VisibilityIcon className='text-secondary' />
              </IconButton>
            );
          },
        },
      ]
    : columns;

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
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
          bgcolor: '#f7aa2d !important',
          color: '#ffffff !important',
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: '#efefef',
          color: '#fff',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={finalColumns}
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
        onRowSelectionModelChange={handleRowSelection}
        sx={{
          boxShadow: 2,
          padding: '1rem',
          '& .MuiDataGrid-selectedRowCount': {
            color: 'primary.main',
            fontWeight: 500,
          },
        }}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};

export default DataTable;
