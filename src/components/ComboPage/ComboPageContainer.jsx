import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import DataTable from '../common/DataTable';
import { Box, CircularProgress, TextField } from '@mui/material';
import { setSelectedBooking } from '../../redux/slices/bookingSlice';
import { getComboById, getCombos } from '../../redux/thunks/comboThunk';
import { getServices } from '../../redux/thunks/serviceThunk';
import CreateComboFormModal from './CreateComboFormModal';
import UpdateComboFormModal from './UpdateComboFormModal';
import comboService from '../../services/combo.service';
import ViewComboDetailModal from './ViewComboDetailModal';
import {
  resetSelectedCombo,
  setSelectedCombo,
} from '../../redux/slices/comboSlice';

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'serviceComboName',
    headerName: 'Tên combo',
    flex: 2,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'serviceComboDesc',
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

const ComboPageContainer = () => {
  const dispatch = useDispatch();

  const combos = useSelector((state) => state.combos.combos);
  const loading = useSelector((state) => state.combos.loading);

  const services = useSelector((state) => state.services.services);

  const combo = useSelector((state) => state.combos.combo);
  const selectedCombo = useSelector((state) => state.combos.selectedCombo);

  const rows = useMemo(() => {
    return Array.isArray(combos) && combos.length !== 0
      ? combos.map((item, index) => ({
          ...item,
          id: item.serviceComboId,
          index: index + 1,
        }))
      : [];
  }, [combos]);

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

  const handleCloseAddModal = useCallback(() => setCreateModalOpen(false), []);
  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModalOpen(false);
  }, []);

  const handleCloseViewModal = useCallback(
    () => {
      setViewModalOpen(false);
      dispatch(resetSelectedCombo());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleAdd = () => {
    // Pre-fetch room type
    !Array.isArray(services) ||
      (services.length === 0 &&
        dispatch(getServices({ pageIndex: 1, pageSize: 10 })));

    setCreateModalOpen(true);
  };

  const handleUpdate = () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.warn('Vui lòng chọn 1 hàng để cập nhật');
    }

    if (selectedRows.length > 1) {
      return toast.warn('Vui lòng chỉ chọn 1 hàng để cập nhật');
    }

    // Pre-fetch
    !Array.isArray(services) ||
      (services.length === 0 &&
        dispatch(getServices({ pageIndex: 1, pageSize: 10 })));

    dispatch(getComboById(selectedRows[0]))
      .unwrap()
      .then(() => setUpdateModalOpen(true))
      .catch((error) => {
        console.log('Lỗi khi get combo by id', error);
        toast.error(error || 'Có lỗi xảy ra. Vui lòng thử lại sau');
      });
  };

  const handleDelete = async () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) return;

    try {
      await Promise.all(
        selectedRows.map((comboId) => comboService.deleteAsync(comboId))
      );

      dispatch(getCombos({ pageIndex: 1, pageSize: 10 }));

      toast.success('Xóa dịch vụ thành công!');
    } catch (error) {
      toast.error('Xóa thất bại! Vui lòng thử lại.');
      console.log(error);
    }
  };

  const handleViewDetail = (params) => {
    combo && dispatch(getComboById(params.id));
    setViewModalOpen(true);
  };

  useEffect(() => {
    dispatch(getCombos({ pageIndex: 1, pageSize: 10 }))
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
            className='bg-blue-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-secondary-light'
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
      <CreateComboFormModal
        open={createModalOpen}
        onClose={handleCloseAddModal}
        services={services}
      />

      {updateModalOpen && (
        <UpdateComboFormModal
          open={updateModalOpen}
          onClose={handleCloseUpdateModal}
          comboData={selectedCombo}
          services={services}
        />
      )}

      {viewModalOpen && (
        <ViewComboDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          combo={combo}
        />
      )}
    </Box>
  );
};

export default ComboPageContainer;
