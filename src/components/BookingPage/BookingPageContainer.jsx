import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Search, Edit, Add } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { Box, CircularProgress, TextField } from '@mui/material';
import { getBookings } from '../../redux/thunks/bookingThunk';
import dayjs from 'dayjs';
import formatCurrency from '../../utils/formatCurrency';
import {
  resetSelectedBooking,
  setSelectedBooking,
} from '../../redux/slices/bookingSlice';
import { getPaymentStatuses } from '../../redux/thunks/paymentStatusThunk';
import { getBookingStatuses } from '../../redux/thunks/bookingStatusThunk';
import UpdateBookingFormModal from './UpdateFormBookingModal';
import ViewBookingDetailModal from './ViewBookingDetailModal';
import { getPets } from '../../redux/thunks/petThunk';
import { getUsers } from '../../redux/thunks/userThunk';
import { Link } from 'react-router-dom';

const paymentStatusColors = {
  'Chờ thanh toán': '#FFA500',
  'Đã đặt cọc': '#FFD700',
  'Đã thanh toán': '#008000',
  'Thanh toán thất bại': '#FF0000',
};

const bookingStatusColors = {
  'Đã hủy': '#808080',
  'Đã xác nhận': '#0000FF',
  'Đã đặt cọc': '#FFD700',
  'Đã hoàn thành': '#008000',
  'Đang xử lý': '#FFA500',
};

// Hàm lấy màu theo trạng thái
function getPaymentStatusColor(paymentStatusName) {
  return paymentStatusColors[paymentStatusName] || '#fff'; // Mặc định màu đen nếu không tìm thấy
}

function getBookingStatusColor(bookingStatusName) {
  return bookingStatusColors[bookingStatusName] || '#fff';
}

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'bookingStartTime',
    headerName: 'Thời gian bắt đầu',
    flex: 2.1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'bookingEndTime',
    headerName: 'Thời gian kết thúc',
    flex: 2.1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalAmount',
    headerName: 'Tổng tiền',
    flex: 1.6,
    align: 'right',
    headerAlign: 'center',
  },
  {
    field: 'bookingStatusName',
    headerName: 'Trạng thái lịch hẹn',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <span
        style={{ backgroundColor: getBookingStatusColor(params.value) }}
        className={`bg-[${getBookingStatusColor(
          params.value
        )}] px-4 py-2 rounded-full text-white font-semibold`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: 'paymentStatusName',
    headerName: 'Trạng thái thanh toán',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <span
        style={{ backgroundColor: getPaymentStatusColor(params.value) }}
        className={`bg-[${getPaymentStatusColor(
          params.value
        )}] px-4 py-2 rounded-full text-white font-semibold`}
      >
        {params.value}
      </span>
    ),
  },
];

const BookingPageContainer = () => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings.bookings);
  const loading = useSelector((state) => state.bookings.loading);

  const pets = useSelector((state) => state.pets.pets);
  const users = useSelector((state) => state.users.users);

  const selectedBooking = useSelector(
    (state) => state.bookings.selectedBooking
  );

  const rows = useMemo(() => {
    return Array.isArray(bookings) && bookings.length !== 0
      ? bookings.map((item, index) => ({
          ...item,
          id: item.bookingId,
          index: index + 1,
          bookingStartTime: dayjs(item.bookingStartTime).format(
            'DD/MM/YYYY HH:mm:ss'
          ),
          bookingEndTime: dayjs(item.bookingEndTime).format(
            'DD/MM/YYYY HH:mm:ss'
          ),
          totalAmount: formatCurrency(item.totalAmount),
          bookingStatusName: item?.bookingStatus?.bookingStatusName,
        }))
      : [];
  }, [bookings]);

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

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
    // Pre-fetch customers
    dispatch(getUsers({ pageIndex: 1, pageSize: 20 }));
    // setCreateModalOpen(true);
  };

  //   const handleCloseAddModal = useCallback(() => setCreateModalOpen(false), []);
  const handleCloseUpdateModal = useCallback(
    () => {
      setUpdateModalOpen(false);
      dispatch(resetSelectedBooking());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCloseViewModal = useCallback(
    () => {
      setViewModalOpen(false);
      dispatch(resetSelectedBooking());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleUpdate = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error('Vui lòng chọn 1 hàng để cập nhật');
    }

    if (selectedRows.length > 1) {
      return toast.error('Vui lòng chỉ chọn 1 hàng để cập nhật');
    }

    // Pre-fetch data
    dispatch(getPaymentStatuses({ pageIndex: 1, pageSize: 20 }));
    dispatch(getBookingStatuses({ pageIndex: 1, pageSize: 20 }));

    dispatch(setSelectedBooking(selectedRows[0]));
    setUpdateModalOpen(true);
  };

  const handleViewDetail = (params) => {
    dispatch(setSelectedBooking(params.id));
    setViewModalOpen(true);
  };

  const viewingBooking = useMemo(() => {
    const viewingPet =
      Array.isArray(pets) &&
      pets.find((p) => p.petId === selectedBooking?.petId);
    const viewingUser =
      Array.isArray(users) &&
      users.find((p) => p.userId === selectedBooking?.customerId);

    return {
      ...selectedBooking,
      pet: viewingPet,
      user: viewingUser,
    };
  }, [pets, selectedBooking, users]);

  // const handleDelete = async () => {
  //   if (!Array.isArray(selectedRows) || selectedRows.length === 0) return;

  //   try {
  //     //   await Promise.all(
  //     //     selectedRows.map((serviceId) => serviceService.deleteService(serviceId))
  //     //   );

  //     dispatch(getAllRooms({ pageIndex: 1, pageSize: 10 }));

  //     toast.success('Xóa dịch vụ thành công!');
  //   } catch (error) {
  //     toast.error('Xóa thất bại! Vui lòng thử lại.');
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getBookings({ pageIndex: 1, pageSize: 10 }))
      .unwrap()
      .then()
      .catch((error) => {
        toast.error(error);
      });

    dispatch(getPets({ pageIndex: 1, pageSize: 10 }));
    dispatch(getUsers({ pageIndex: 1, pageSize: 10 }));

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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            to={'them-moi'}
            className='bg-primary rounded-lg px-9 py-3 text-white font-medium hover:bg-primary-dark'
            onClick={handleAdd}
          >
            <Add /> Thêm
          </Link>
          <button
            className='bg-blue-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-secondary-light'
            onClick={handleUpdate}
          >
            <Edit /> Cập nhật
          </button>
          {/* <button
            className='bg-red-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-red-700'
            onClick={handleDelete}
          >
            <Delete /> Xóa
          </button> */}
        </Box>
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
      {/* <CreateRoomFormModal
        open={createModalOpen}
        onClose={handleCloseAddModal}
      /> */}

      <UpdateBookingFormModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        booking={selectedBooking}
      />

      {viewModalOpen && (
        <ViewBookingDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          booking={viewingBooking}
        />
      )}
    </Box>
  );
};

export default BookingPageContainer;
