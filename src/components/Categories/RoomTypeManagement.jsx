import { useCallback, useMemo, useState } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../../components/common/DataTable';
import { toast } from 'react-toastify';

// Mock data for room types
const mockRoomTypes = [
  {
    roomTypeId: 1,
    roomTypeName: 'Phòng VIP',
    roomTypeDesc: 'Phòng cao cấp với đầy đủ tiện nghi cho thú cưng',
    isVisible: true,
  },
  {
    roomTypeId: 2,
    roomTypeName: 'Phòng Standard',
    roomTypeDesc: 'Phòng tiêu chuẩn với các tiện nghi cơ bản',
    isVisible: true,
  },
  {
    roomTypeId: 3,
    roomTypeName: 'Phòng Deluxe',
    roomTypeDesc:
      'Phòng sang trọng với không gian rộng rãi và tiện nghi cao cấp',
    isVisible: true,
  },
  {
    roomTypeId: 4,
    roomTypeName: 'Phòng Cách ly',
    roomTypeDesc: 'Phòng dành cho thú cưng cần được cách ly vì lý do sức khỏe',
    isVisible: false,
  },
  {
    roomTypeId: 5,
    roomTypeName: 'Phòng Tập thể',
    roomTypeDesc: 'Phòng chung cho nhiều thú cưng nhỏ cùng loại',
    isVisible: true,
  },
];

const RoomTypeManagement = () => {
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
      field: 'roomTypeName',
      headerName: 'Tên loại phòng',
      flex: 2,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'roomTypeDesc',
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
    return mockRoomTypes.map((item, index) => ({
      id: item.roomTypeId,
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
    toast.info('Chức năng thêm loại phòng sẽ được triển khai sau');
  };

  const handleUpdate = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn 1 hàng để cập nhật');
    }

    if (selectedRows.length > 1) {
      return toast.error('Vui lòng chỉ chọn 1 hàng để cập nhật');
    }

    // Will be implemented later
    toast.info('Chức năng cập nhật loại phòng sẽ được triển khai sau');
  };

  const handleDelete = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn ít nhất 1 hàng để xóa');
    }

    // Will be implemented later
    toast.info('Chức năng xóa loại phòng sẽ được triển khai sau');
  };

  const handleViewDetail = (params) => {
    // Will be implemented later
    toast.info(`Xem chi tiết loại phòng ID: ${params.id}`);
  };

  return (
    <div className='p-3'>
      <h2 className='text-3xl font-cute tracking-wider mb-6 text-secondary'>
        Quản Lý Loại Phòng
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

export default RoomTypeManagement;
