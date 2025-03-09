import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../common/DataTable';

const columns = [
  { field: 'id', headerName: 'STT', flex: 1 },
  { field: 'serviceName', headerName: 'Tên dịch vụ', flex: 1 },
  { field: 'serviceDesc', headerName: 'Mô tả', flex: 2 },
  { field: 'serviceTypeName', headerName: 'Loại dịch vụ', flex: 1 },
  { field: 'isVisible', headerName: 'Trạng thái', flex: 1 },
];

const initialRows = [
  {
    id: '1',
    serviceName: 'Dịch vụ tắm mèo cơ bản',
    serviceDesc:
      'Dịch vụ tắm mèo cơ bản nhất, gồm các bước như tắm diệt khuẩn, sấy khô và chải lông',
    serviceTypeName: 'Dịch vụ chăm sóc',
    isVisible: true,
  },
  {
    id: '1',
    serviceName: 'Dịch vụ tắm mèo cơ bản',
    serviceDesc:
      'Dịch vụ tắm mèo cơ bản nhất, gồm các bước như tắm diệt khuẩn, sấy khô và chải lông',
    serviceTypeName: 'Dịch vụ chăm sóc',
    isVisible: true,
  },
  {
    id: '1',
    serviceName: 'Dịch vụ tắm mèo cơ bản',
    serviceDesc:
      'Dịch vụ tắm mèo cơ bản nhất, gồm các bước như tắm diệt khuẩn, sấy khô và chải lông',
    serviceTypeName: 'Dịch vụ chăm sóc',
    isVisible: true,
  },
];

const ServicePageContainer = () => {
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleAdd = () => {
    const newRow = {
      id: rows.length + 1,
      name: 'Người mới',
      email: 'new@example.com',
    };
    setRows([...rows, newRow]);
  };

  const handleUpdate = () => {
    console.log('Cập nhật hàng đã chọn');
  };

  const handleDelete = () => {
    console.log('Xóa hàng đã chọn');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label='Tìm kiếm'
          variant='outlined'
          value={searchText}
          onChange={handleSearch}
          sx={{ width: '300px' }}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <button
            className='bg-green-500 rounded-lg px-9 py-3 text-white font-medium hover:bg-green-400'
            onClick={handleAdd}
          >
            <Add /> Thêm
          </button>
          <button
            className='bg-blue-500 rounded-lg px-9 py-3 text-white font-medium hover:bg-blue-400'
            onClick={handleUpdate}
          >
            <Edit /> Cập nhật
          </button>
          <button
            className='bg-red-500 rounded-lg px-9 py-3 text-white font-medium hover:bg-red-400'
            onClick={handleDelete}
          >
            <Delete /> Xóa
          </button>
        </Box>
      </Box>
      <DataTable columns={columns} rows={filteredRows} />
    </Box>
  );
};

export default ServicePageContainer;
