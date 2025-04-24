import { useCallback, useMemo, useState } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../../components/common/DataTable';
import { toast } from 'react-toastify';

// Mock data for pet breeds
const mockPetBreeds = [
  {
    breedId: 1,
    breedName: 'Corgi',
    breedDesc: 'Giống chó chân ngắn, thân dài, rất thông minh và năng động',
    illustrationImage: 'https://example.com/corgi.jpg',
    isVisible: true,
  },
  {
    breedId: 2,
    breedName: 'Husky',
    breedDesc: 'Giống chó to, lông dày, thường có màu xám trắng hoặc đen trắng',
    illustrationImage: 'https://example.com/husky.jpg',
    isVisible: true,
  },
  {
    breedId: 3,
    breedName: 'Mèo Anh lông ngắn',
    breedDesc: 'Giống mèo có khuôn mặt tròn, lông ngắn, dày và mềm',
    illustrationImage: 'https://example.com/british-shorthair.jpg',
    isVisible: false,
  },
  {
    breedId: 4,
    breedName: 'Mèo Ba Tư',
    breedDesc: 'Giống mèo lông dài, mặt tẹt, tính cách điềm đạm',
    illustrationImage: 'https://example.com/persian.jpg',
    isVisible: true,
  },
  {
    breedId: 5,
    breedName: 'Golden Retriever',
    breedDesc: 'Giống chó lông vàng, thân thiện, thông minh và dễ huấn luyện',
    illustrationImage: 'https://example.com/golden.jpg',
    isVisible: true,
  },
];

const PetBreedManagement = () => {
  // State for search and selected rows
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Table columns definition
  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'breedName',
      headerName: 'Tên giống',
      flex: 2,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'breedDesc',
      headerName: 'Mô tả',
      flex: 3,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'isVisible',
      headerName: 'Trạng thái',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <span
            className={`px-6 py-2 rounded-full text-white
              ${params.value ? 'bg-secondary-light' : 'bg-primary-dark'}`}
          >
            {params.value ? 'Hiển thị' : 'Đã ẩn'}
          </span>
        );
      },
    },
  ];

  // Prepare rows for data table
  const rows = useMemo(() => {
    return mockPetBreeds.map((item, index) => ({
      id: item.breedId,
      index: index + 1,
      ...item,
    }));
  }, []);

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    return rows?.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  // Handlers
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectRow = useCallback((selectionModel) => {
    setSelectedRows(selectionModel);
  }, []);

  const handleAdd = () => {
    // Will be implemented later
    toast.info('Chức năng thêm giống thú cưng sẽ được triển khai sau');
  };

  const handleUpdate = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn 1 hàng để cập nhật');
    }

    if (selectedRows.length > 1) {
      return toast.error('Vui lòng chỉ chọn 1 hàng để cập nhật');
    }

    // Will be implemented later
    toast.info('Chức năng cập nhật giống thú cưng sẽ được triển khai sau');
  };

  const handleDelete = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn ít nhất 1 hàng để xóa');
    }

    // Will be implemented later
    toast.info('Chức năng xóa giống thú cưng sẽ được triển khai sau');
  };

  const handleViewDetail = (params) => {
    // Will be implemented later
    toast.info(`Xem chi tiết giống thú cưng ID: ${params.id}`);
  };

  return (
    <div className='p-3'>
      <h2 className='text-3xl font-cute tracking-wider mb-8 text-secondary'>
        Quản Lý Giống Thú Cưng
      </h2>

      {/* Top Content */}
      <div className='flex justify-between mb-6 items-center'>
        <TextField
          label='Tìm kiếm'
          variant='outlined'
          value={searchText}
          onChange={handleSearch}
          sx={{ width: '300px' }}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        />
        <div className='flex gap-2'>
          <button
            className='bg-primary rounded-lg px-9 py-3 text-white font-medium hover:bg-primary-dark flex items-center gap-2'
            onClick={handleAdd}
          >
            <Add /> Thêm
          </button>
          <button
            className='bg-secondary-supper-light rounded-lg px-9 py-3 text-white font-medium hover:bg-secondary-light flex items-center gap-2'
            onClick={handleUpdate}
          >
            <Edit /> Cập nhật
          </button>
          <button
            className='bg-red-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-red-700 flex items-center gap-2'
            onClick={handleDelete}
          >
            <Delete /> Xóa
          </button>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className='w-full h-full flex justify-center items-center py-12'>
          <CircularProgress size={'4rem'} />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredRows}
          handleRowSelection={handleSelectRow}
          onView={handleViewDetail}
        />
      )}
    </div>
  );
};

export default PetBreedManagement;
