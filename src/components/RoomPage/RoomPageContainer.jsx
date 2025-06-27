import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllRooms } from '../../redux/thunks/roomThunk';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { Box, CircularProgress, TextField } from '@mui/material';
import CreateRoomFormModal from './CreateRoomFormModal';
import { getRoomTypes } from '../../redux/thunks/roomTypeThunk';
import UpdateRoomFormModal from './UpdateRoomFormModal';
import { setSelectedRoom } from '../../redux/slices/roomSlice';
import ViewRoomDetailModal from './ViewRoomDetailModal';
import roomService from '../../services/room.service';

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'roomName',
    headerName: 'Tên phòng',
    flex: 2,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'roomDesc',
    headerName: 'Mô tả',
    flex: 3,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'roomTypeName',
    headerName: 'Loại phòng',
    flex: 2,
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

const RoomPageContainer = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);

  const userRole = useMemo(() => loggedInUser?.staffType, [loggedInUser]);

  const rooms = useSelector((state) => state.rooms.rooms);
  const loading = useSelector((state) => state.rooms.loading);

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);

  const rows = useMemo(() => {
    return Array.isArray(rooms) && rooms.length !== 0
      ? rooms.map((item, index) => ({
          id: item.roomId,
          index: index + 1,
          ...item,
        }))
      : [];
  }, [rooms]);

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectRow = useCallback((selectionModel) => {
    setSelectedRows(selectionModel);
  }, []);

  const filteredRows = useMemo(() => {
    return rows?.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  const handleAdd = () => {
    // Pre-fetch room type
    dispatch(getRoomTypes({ pageIndex: 1, pageSize: 10 }));

    setCreateModalOpen(true);
  };

  const handleCloseAddModal = useCallback(() => setCreateModalOpen(false), []);
  const handleCloseUpdateModal = useCallback(
    () => setUpdateModalOpen(false),
    []
  );
  const handleCloseViewModal = useCallback(() => setViewModalOpen(false), []);

  const handleUpdate = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn 1 hàng để cập nhật');
    }

    if (selectedRows.length > 1) {
      return toast.error('Vui lòng chỉ chọn 1 hàng để cập nhật');
    }

    // Pre-fetch
    dispatch(getRoomTypes({ pageIndex: 1, pageSize: 20 }));

    dispatch(setSelectedRoom(selectedRows[0]));
    setUpdateModalOpen(true);
  };

  const handleDelete = async () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) return;

    try {
      await Promise.all(
        selectedRows.map((roomId) => roomService.deleteRoom(roomId))
      );

      dispatch(getAllRooms({ pageIndex: 1, pageSize: 10 }));

      toast.success('Xóa phòng thành công!');
    } catch (error) {
      toast.error('Xóa thất bại! Vui lòng thử lại.');
      console.log(error);
    }
  };

  const handleViewDetail = (params) => {
    // Pre-fetch
    dispatch(getRoomTypes({ pageIndex: 1, pageSize: 20 }));

    dispatch(setSelectedRoom(params?.id));

    setViewModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllRooms({ pageIndex: 1, pageSize: 10 }))
      .unwrap()
      .then()
      .catch((error) => {
        toast.error(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Content */}
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
        {userRole === 'admin' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <button
              className='bg-primary rounded-lg px-9 py-3 text-white font-medium hover:bg-primary-dark'
              onClick={handleAdd}
            >
              <Add /> Thêm
            </button>
            <button
              className='bg-secondary-supper-light rounded-lg px-9 py-3 text-white font-medium hover:bg-secondary-light'
              onClick={handleUpdate}
            >
              <Edit /> Cập nhật
            </button>
            <button
              className='bg-red-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-red-700'
              onClick={handleDelete}
            >
              <Delete /> Xóa
            </button>
          </Box>
        )}
      </Box>
      {/* Data Table */}
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
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

      {/* Modal */}
      {createModalOpen && (
        <CreateRoomFormModal
          open={createModalOpen}
          onClose={handleCloseAddModal}
        />
      )}

      {updateModalOpen && (
        <UpdateRoomFormModal
          open={updateModalOpen}
          onClose={handleCloseUpdateModal}
          room={selectedRoom}
        />
      )}

      {viewModalOpen && (
        <ViewRoomDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          room={selectedRoom}
        />
      )}
    </Box>
  );
};

export default RoomPageContainer;
