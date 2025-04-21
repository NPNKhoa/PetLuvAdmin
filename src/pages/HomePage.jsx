import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBreedRatio,
  getBreedsBookedRatio,
  getRevenue,
  getServicesBookedRatio,
} from '../redux/thunks/statisticThunk';
import dayjs from 'dayjs';
import {
  BookedBreedStatistic,
  BookedServiceStatistic,
  BreedRatioStatistic,
  RevenueStatistic,
  SelectDateRange,
} from '../components';
import { MenuItem, Select } from '@mui/material';
import {
  FiCalendar,
  FiFilter,
  FiRefreshCw,
  FiPieChart,
  FiBarChart2,
  FiDollarSign,
  FiChevronDown,
} from 'react-icons/fi';
import formatCurrency from '../utils/formatCurrency';

const validRatioTypes = [
  { value: 'services', label: 'Dịch vụ' },
  { value: 'room', label: 'Phòng' },
  { value: 'combo', label: 'Combo' },
];

const validTimeTypes = [
  { value: 'date', label: 'Khoảng thời gian' },
  { value: 'month', label: 'Tháng' },
  { value: 'year', label: 'Năm' },
];

const validPetTypes = [
  { value: 'all', label: 'Tất cả' },
  { value: 'mèo', label: 'Mèo' },
  { value: 'chó', label: 'Chó' },
];

const validMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HomePage = () => {
  const currentDate = dayjs();
  const dispatch = useDispatch();

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const toggleFilterExpanded = useCallback(() => {
    setIsFilterExpanded((prev) => !prev);
  }, []);

  // State for filters
  const [typeOfStatisticTime, setTypeOfStatisticTime] = useState('year');
  const [typeOfRatioStatistic, setTypeOfRatioStatistic] = useState('services');
  const [petType, setPetType] = useState('all');
  const [statisticRange, setStatisticRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(currentDate.year());

  // Handlers for filter changes
  const handleChangeRatioType = useCallback((e) => {
    setTypeOfRatioStatistic(e.target.value);
  }, []);

  const handleChangePetType = useCallback((e) => {
    setPetType(e.target.value);
  }, []);

  const handleChangeTimeType = useCallback((e) => {
    setTypeOfStatisticTime(e.target.value);
  }, []);

  const handleChangeStartDate = useCallback((newValue) => {
    setStatisticRange((prev) => ({ ...prev, startDate: newValue }));
  }, []);

  const handleChangeEndDate = useCallback((newValue) => {
    setStatisticRange((prev) => ({ ...prev, endDate: newValue }));
  }, []);

  const handleChangeMonth = useCallback((e) => {
    setMonth(e.target.value);
  }, []);

  const handleChangeYear = useCallback((e) => {
    setYear(e.target.value);
  }, []);

  const query = useMemo(
    () => ({ ...statisticRange, month, year }),
    [month, statisticRange, year]
  );

  const refreshFilter = useCallback(() => {
    setTypeOfStatisticTime('year');
    setTypeOfRatioStatistic('services');
    setPetType('all');
    setStatisticRange({ startDate: null, endDate: null });
    setMonth('');
    setYear(currentDate.year());
  }, [currentDate]);

  // BOOKED SERVICES
  const bookedServices = useSelector(
    (state) => state.statistics.bookedServices
  );
  const bookedServicesLoading = useSelector(
    (state) => state.statistics.loading
  );

  const bookedServicesLabels = useMemo(
    () =>
      bookedServices?.map((service) =>
        service?.serviceName ? service?.serviceName : service?.roomName
      ) || [],
    [bookedServices]
  );
  const bookedServicesData = useMemo(
    () => bookedServices?.map((service) => service.count) || [],
    [bookedServices]
  );

  // BOOKED BREEDS
  const bookedBreeds = useSelector((state) => state.statistics.bookedBreeds);
  const bookedBreedsLoading = useSelector((state) => state.statistics.loading);

  const bookedBreedsLabels = useMemo(
    () => bookedBreeds?.map((breed) => breed.breedName) || [],
    [bookedBreeds]
  );
  const bookedBreedsData = useMemo(
    () => bookedBreeds?.map((breed) => breed.count) || [],
    [bookedBreeds]
  );

  // REVENUE
  const revenue = useSelector((state) => state.statistics.revenue);
  const revenueLoading = useSelector((state) => state.statistics.loading);

  const revenueLabels = useMemo(
    () => revenue?.map((revenue) => revenue.month || revenue.day) || [],
    [revenue]
  );
  const revenueData = useMemo(
    () => revenue?.map((revenue) => revenue.revenue) || [],
    [revenue]
  );

  // BREED RATIO
  const breedRatio = useSelector((state) => state.statistics.breedRatio);
  const breedRatioLoading = useSelector((state) => state.statistics.loading);

  const totalPets = useMemo(
    () => breedRatio?.reduce((sum, breed) => sum + breed.count, 0) || 0,
    [breedRatio]
  );

  const breedRatioLabels = useMemo(
    () => breedRatio?.map((breedRatio) => breedRatio.breed) || [],
    [breedRatio]
  );

  const breedRatioData = useMemo(
    () =>
      totalPets > 0
        ? breedRatio.map((breed) =>
            ((breed.count / totalPets) * 100).toFixed(2)
          )
        : [],
    [breedRatio, totalPets]
  );

  useEffect(() => {
    // Fix this later, allowing choose type of ratio statistics
    if (typeOfRatioStatistic)
      dispatch(
        getServicesBookedRatio({ ...query, serviceType: typeOfRatioStatistic })
      );

    // ===========================================================
    dispatch(getBreedsBookedRatio(query));
    dispatch(getRevenue(query));
    dispatch(getBreedRatio({ typeName: petType === 'all' ? '' : petType }));
  }, [dispatch, query, typeOfRatioStatistic, petType]);

  //UTILITIES
  const lastTenYears = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => currentDate.year() - (9 - i));
  }, [currentDate]);

  return (
    <div className='mx-auto px-4 py-6'>
      {/* Header Section */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl text-primary font-cute tracking-wider mb-2'>
          Chào mừng đến với Dashboard!
        </h1>
        <p className='text-gray-600 max-w-3xl mx-auto'>
          Xem tổng quan về hoạt động kinh doanh, dịch vụ được đặt nhiều nhất, và
          các thống kê khác để đưa ra quyết định tốt hơn.
        </p>
      </div>

      {/* Filter Section */}
      <div className='bg-white rounded-lg shadow-md mb-8 overflow-hidden'>
        <div
          className='flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer'
          onClick={toggleFilterExpanded}
        >
          <div className='flex items-center'>
            <FiFilter className='text-primary mr-2' size={20} />
            <h2 className='text-xl text-secondary font-bold'>
              Bộ lọc thống kê
            </h2>
          </div>
          <div className='flex items-center'>
            <button
              onClick={(e) => {
                // e.stopPropagation();
                refreshFilter();
              }}
              className='mr-4 flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors'
            >
              <FiRefreshCw size={16} />
              <span>Làm mới</span>
            </button>
            <FiChevronDown
              className={`text-gray-500 transition-transform duration-300 ${
                isFilterExpanded ? 'transform rotate-180' : ''
              }`}
              size={20}
            />
          </div>
        </div>

        {isFilterExpanded && (
          <div className='p-4 bg-white'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Thống kê theo thời gian
                </label>
                <div className='flex items-center'>
                  <FiCalendar className='text-gray-400 mr-2' size={18} />
                  <Select
                    className='w-full'
                    value={typeOfStatisticTime}
                    onChange={handleChangeTimeType}
                  >
                    {validTimeTypes?.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              {typeOfStatisticTime === 'date' ? (
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Khoảng thời gian
                  </label>
                  <SelectDateRange
                    startDate={statisticRange.startDate}
                    endDate={statisticRange.endDate}
                    onChangeStart={handleChangeStartDate}
                    onChangeEnd={handleChangeEndDate}
                  />
                </div>
              ) : typeOfStatisticTime === 'month' ? (
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Chọn tháng
                  </label>
                  <Select
                    className='w-full'
                    value={month}
                    onChange={handleChangeMonth}
                    displayEmpty
                  >
                    <MenuItem value={''}>-- Tháng --</MenuItem>
                    {validMonth?.map((item) => (
                      <MenuItem key={item} value={item}>
                        Tháng {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              ) : (
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Chọn năm
                  </label>
                  <Select
                    className='w-full'
                    value={year}
                    onChange={handleChangeYear}
                  >
                    {lastTenYears?.map((item) => (
                      <MenuItem key={item} value={item}>
                        Năm {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}

              {/* <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Loại thú cưng
                </label>
                <div className='flex items-center'>
                  <FiPieChart className='text-gray-400 mr-2' size={18} />
                  <Select
                    className='w-full'
                    value={petType}
                    onChange={handleChangePetType}
                  >
                    {validPetTypes?.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-500 mr-4'>
              <FiBarChart2 size={24} />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Tổng số dịch vụ</p>
              <h3 className='text-xl font-bold'>
                {bookedServicesLabels.length}
              </h3>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-500 mr-4'>
              <FiPieChart size={24} />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Tổng số giống thú cưng</p>
              <h3 className='text-xl font-bold'>{breedRatioLabels.length}</h3>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-amber-100 text-amber-500 mr-4'>
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Tổng doanh thu</p>
              <h3 className='text-xl font-bold'>
                {/* {revenueData.length > 0
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(revenueData.reduce((a, b) => a + b, 0))
                  : '0 ₫'} */}
                {formatCurrency(2710000)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className='mb-8'>
        <h2 className='text-2xl text-secondary font-bold tracking-wide mb-4 flex items-center'>
          <FiBarChart2 className='mr-2' />
          Thống kê hệ thống
        </h2>

        {/* Revenue Chart - Full Width */}
        <div className='mb-6'>
          <RevenueStatistic
            loading={revenueLoading}
            data={revenueData} // revenueData
            labels={revenueLabels}
            typeOfStatisticTime={typeOfStatisticTime}
            title={'Tổng doanh thu'}
          />
        </div>

        {/* Two-column charts */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <BookedServiceStatistic
            loading={bookedServicesLoading}
            data={bookedServicesData}
            labels={bookedServicesLabels}
            title={'Tỉ lệ dịch vụ được đặt'}
            validRatioTypes={validRatioTypes}
            ratioType={typeOfRatioStatistic}
            handleChangeRatioType={handleChangeRatioType}
          />

          <BookedBreedStatistic
            loading={bookedBreedsLoading}
            data={bookedBreedsData}
            labels={bookedBreedsLabels}
            title={'Tỉ lệ loài thú cưng được đặt'}
          />
        </div>

        {/* Breed Ratio Chart */}
        <div className='mb-6'>
          <BreedRatioStatistic
            data={breedRatioData}
            labels={breedRatioLabels}
            loading={breedRatioLoading}
            title={'Tỉ lệ giống thú cưng theo loài'}
            validPetTypes={validPetTypes}
            petType={petType}
            handleChangePetType={handleChangePetType}
          />
        </div>
      </section>

      {/* System Management Section */}
      <section className='mb-8'>
        <h2 className='text-2xl text-secondary font-bold tracking-wide mb-4 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          Quản lý hệ thống
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Quick Access Cards */}
          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='p-3 rounded-full bg-indigo-100 text-indigo-600 mr-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>
                Quản lý người dùng
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Xem và quản lý tài khoản người dùng, phân quyền và thông tin cá
              nhân.
            </p>
            <a
              href='/users'
              className='text-indigo-600 font-medium hover:text-indigo-800 flex items-center'
            >
              Truy cập
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='p-3 rounded-full bg-green-100 text-green-600 mr-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>
                Quản lý dịch vụ
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Thêm, sửa, xóa các dịch vụ và cập nhật thông tin chi tiết.
            </p>
            <a
              href='/services'
              className='text-green-600 font-medium hover:text-green-800 flex items-center'
            >
              Truy cập
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='p-3 rounded-full bg-amber-100 text-amber-600 mr-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>Lịch đặt</h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Xem và quản lý các lịch đặt dịch vụ, phòng và combo.
            </p>
            <a
              href='/bookings'
              className='text-amber-600 font-medium hover:text-amber-800 flex items-center'
            >
              Truy cập
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className='mt-auto pt-8 pb-4 text-center text-gray-500 text-sm'>
        <p>
          © {new Date().getFullYear()} PetLuv Admin Dashboard. All rights
          reserved.
        </p>
        <p className='mt-1'>Version 1.0.0</p>
      </footer>
    </div>
  );
};

export default HomePage;
