import { useCallback, useEffect, useMemo, useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import { FaSearch, FaUserTimes } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import DataTable from '../common/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ViewUserDetailModal from './ViewUserDetailModal';
import AddUserModal from './AddUserModal';
import {
  getUserById,
  getUsers,
  togleAccountStatus,
} from '../../redux/thunks/userThunk';
import MyAlrt from '../../configs/alert/MyAlrt';

const columns = [
  {
    field: 'index',
    headerName: 'STT',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    flex: 2,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    flex: 1.5,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    flex: 3,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'isActive',
    headerName: 'Trạng thái',
    flex: 1.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <span
          className={`px-6 py-2 rounded-full text-white
            ${params.value ? 'bg-green-500' : 'bg-red-600'}`}
        >
          {params.value ? 'Hoạt động' : 'Bị khóa'}
        </span>
      );
    },
  },
];

const UserPageContainer = () => {
  const dispatch = useDispatch();

  // This would be replaced with actual Redux state once you create the user slice
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [selectedUser, setSelectedUser] = useState(null);

  const rows = useMemo(() => {
    return Array.isArray(users) && users.length !== 0
      ? users.map((item, index) => ({
          id: item.userId,
          index: index + 1,
          ...item,
        }))
      : [];
  }, [users]);

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

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

  const handleViewDetail = (params) => {
    dispatch(getUserById(params?.id));
    setSelectedUser(params?.id);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = useCallback(() => setViewModalOpen(false), []);
  const handleOpenAddModal = useCallback(() => setAddModalOpen(true), []);
  const handleCloseAddModal = useCallback(() => setAddModalOpen(false), []);

  const statusText = useMemo(() => {
    const selectedUsers = rows.filter((row) => selectedRows.includes(row.id));
    return selectedUsers.some((user) => user.isActive) ? 'khóa' : 'kích hoạt';
  }, [rows, selectedRows]);

  const handleToggleStatus = async () => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      return toast.error(
        'Vui lòng chọn ít nhất 1 người dùng để thay đổi trạng thái'
      );
    }

    // Get the selected users' current status
    MyAlrt.Warning(
      `Xác nhận thay đổi trạng thái`,
      `Bạn có chắc chắn muốn ${statusText} ${
        selectedRows.length > 1 ? 'các' : ''
      } tài khoản đã chọn?`,
      'Xác nhận',
      true,
      async () => {
        Promise.all(
          selectedRows.map(async (userId) => {
            dispatch(togleAccountStatus(userId));
          })
        )
          .then(() => {
            toast.success(
              `${
                statusText.charAt(0).toUpperCase() + statusText.slice(1)
              } tài khoản thành công!`
            );
          })
          .catch((error) => {
            toast.error('Cập nhật thất bại! Vui lòng thử lại.');
            console.log(error);
          });
      }
    );
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className='p-6'>
      <div className='flex justify-between mb-4 items-center'>
        <TextField
          label='Tìm kiếm'
          variant='outlined'
          value={searchText}
          onChange={handleSearch}
          sx={{ width: '50%' }}
          InputProps={{
            startAdornment: <FaSearch className='mr-2 text-gray-500' />,
          }}
        />
        <div className='flex gap-2'>
          {Array.isArray(selectedRows) && selectedRows.length > 0 && (
            <button
              className='bg-red-600 rounded-lg px-9 py-3 text-white font-medium hover:bg-red-700 flex items-center gap-2'
              onClick={handleToggleStatus}
            >
              <FaUserTimes />{' '}
              {statusText === 'khóa' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
            </button>
          )}
          <button
            className='bg-primary rounded-lg px-9 py-3 text-white font-medium hover:bg-primary-dark flex items-center gap-2'
            onClick={handleOpenAddModal}
          >
            <IoAdd size={'1.5rem'} /> Thêm người dùng
          </button>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className='w-full h-full flex justify-center items-center py-10'>
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

      {/* Modals will be added here later */}
      {viewModalOpen && (
        <ViewUserDetailModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          userId={selectedUser}
        />
      )}

      {addModalOpen && (
        <AddUserModal open={addModalOpen} onClose={handleCloseAddModal} />
      )}
    </div>
  );
};

export default UserPageContainer;
