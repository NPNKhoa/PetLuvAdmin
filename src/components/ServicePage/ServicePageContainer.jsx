import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { useDispatch } from 'react-redux';
import { deleteService, getServices } from '../../redux/thunks/serviceThunk';
import { getServiceVairantByService } from '../../redux/thunks/serviceVariantThunk';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CreateServiceFormModal from './CreateServiceFormModal';
import { getServiceTypes } from '../../redux/thunks/serviceTypeThunk';
import serviceService from '../../services/service.service';
import { setSelectedService } from '../../redux/slices/serviceSlice';
import UpdateServiceFormModal from './UpdateServiceFormModal';
import ViewServiceDetailModal from './ViewServiceDetailModal';

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'serviceName',
    headerName: 'Tên dịch vụ',
    flex: 2,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'serviceDesc',
    headerName: 'Mô tả',
    flex: 3,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'serviceTypeName',
    headerName: 'Loại dịch vụ',
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

const ServicePageContainer = () => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services.services);
  const loading = useSelector((state) => state.services.loading);

  const selectedService = useSelector(
    (state) => state.services.selectedService
  );

  const rows = useMemo(() => {
    return Array.isArray(services) && services.length !== 0
      ? services.map((item, index) => ({
          id: item.serviceId,
          index: index + 1,
          ...item,
        }))
      : [];
  }, [services]);

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
    // Pre-fetch service type
    dispatch(getServiceTypes());

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

    dispatch(setSelectedService(selectedRows[0]));
    setUpdateModalOpen(true);
  };

  const handleDelete = async () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) return;

    try {
      await Promise.all(
        selectedRows.map((serviceId) => serviceService.deleteService(serviceId))
      );

      dispatch(getServices());

      toast.success('Xóa dịch vụ thành công!');
    } catch (error) {
      toast.error('Xóa thất bại! Vui lòng thử lại.');
      console.log(error);
    }
  };

  const handleViewDetail = (params) => {
    dispatch(setSelectedService(params.id));
    dispatch(getServiceVairantByService(params.id));
    setViewModalOpen(true);
  };

  useEffect(() => {
    dispatch(getServices())
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
        <CreateServiceFormModal
          open={createModalOpen}
          onClose={handleCloseAddModal}
        />
      )}

      {updateModalOpen && (
        <UpdateServiceFormModal
          open={updateModalOpen}
          onClose={handleCloseUpdateModal}
          service={selectedService}
        />
      )}

      {viewModalOpen && (
        <ViewServiceDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          service={selectedService}
        />
      )}
    </Box>
  );
};

export default ServicePageContainer;
