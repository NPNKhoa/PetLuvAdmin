import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPayments } from '../../redux/thunks/paymentThunk';
import ViewPaymentDetailModal from './ViewPaymentDetailModal';

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'transactionRef',
    headerName: 'Mã giao dịch',
    flex: 1.8,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    flex: 1.8,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleString('vi-VN');
    },
  },
  {
    field: 'amount',
    headerName: 'Số tiền',
    flex: 1.5,
    align: 'right',
    headerAlign: 'center',
    renderCell: (params) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(params.value);
    },
  },
  {
    field: 'paymentMethodName',
    headerName: 'Phương thức thanh toán',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'paymentStatusName',
    headerName: 'Trạng thái',
    flex: 2.1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      let bgColor = 'bg-gray-500';

      if (params.value.toLowerCase().includes('đã thanh toán')) {
        bgColor = 'bg-green-500';
      } else if (params.value.toLowerCase().includes('đặt cọc')) {
        bgColor = 'bg-secondary-light';
      } else if (params.value.toLowerCase().includes('thất bại')) {
        bgColor = 'bg-red-600';
      } else if (params.value.toLowerCase().includes('chờ')) {
        bgColor = 'bg-yellow-500';
      }

      return (
        <span className={`px-6 py-2 rounded-full text-white ${bgColor}`}>
          {params.value}
        </span>
      );
    },
  },
];

const PaymentPageContainer = () => {
  const dispatch = useDispatch();

  const payments = useSelector((state) => state.payments.payments);
  const loading = useSelector((state) => state.payments.loading);

  const rows = useMemo(() => {
    return Array.isArray(payments) && payments.length !== 0
      ? payments.map((item, index) => ({
          id: item.paymentId,
          index: index + 1,
          ...item,
          paymentMethodName: item.paymentMethod?.paymentMethodName || 'N/A',
          paymentStatusName: item.paymentStatus?.paymentStatusName || 'N/A',
        }))
      : [];
  }, [payments]);

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectRow = useCallback((selectionModel) => {
    setSelectedRows(selectionModel);
  }, []);

  const handleViewDetail = (params) => {
    const payment = payments.find((p) => p.paymentId === params.id);
    setSelectedPayment(payment);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = useCallback(() => {
    setViewModalOpen(false);
    setSelectedPayment(null);
  }, []);

  const filteredRows = useMemo(() => {
    return rows?.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  useEffect(() => {
    dispatch(getPayments())
      .unwrap()
      .then()
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

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

      {/* View Detail Modal */}
      {viewModalOpen && selectedPayment && (
        <ViewPaymentDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          payment={selectedPayment}
        />
      )}
    </Box>
  );
};

export default PaymentPageContainer;
