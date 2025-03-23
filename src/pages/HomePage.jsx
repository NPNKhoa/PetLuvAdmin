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

const validRatioTypes = [
  {
    value: 'services',
    label: 'Dịch vụ',
  },
  {
    value: 'room',
    label: 'Phòng',
  },
  {
    value: 'combo',
    label: 'Combo',
  },
];

const validTimeTypes = [
  {
    value: 'date',
    label: 'Khoảng thời gian',
  },
  {
    value: 'month',
    label: 'Tháng',
  },
  {
    value: 'year',
    label: 'Năm',
  },
];

const validPetTypes = [
  {
    value: 'all',
    label: 'Tất cả',
  },
  {
    value: 'mèo',
    label: 'Mèo',
  },
  {
    value: 'chó',
    label: 'Chó',
  },
];

const validMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HomePage = () => {
  const dispatch = useDispatch();
  const currentDate = dayjs();

  const [typeOfRatioStatistic, setTypeOfRatioStatistic] = useState('services');
  const [typeOfStatisticTime, setTypeOfStatisticTime] = useState('year');
  const [petType, setPetType] = useState('all');

  const handleChangeRatioType = useCallback((e) => {
    setTypeOfRatioStatistic(e.target.value);
  }, []);
  const handleChangeTimeType = useCallback((e) => {
    setTypeOfStatisticTime(e.target.value);
  }, []);
  const handleChangePetType = useCallback((e) => {
    setPetType(e.target.value);
  }, []);

  const [statisticRange, setStatisticRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(currentDate.year());

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

  // BOOKED SERVICES
  const bookedServices = useSelector(
    (state) => state.statistics.bookedServices
  );
  const bookedServicesLoading = useSelector(
    (state) => state.statistics.loading
  );

  const bookedServicesLabels = useMemo(
    () => bookedServices?.map((service) => service.serviceName) || [],
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
    typeOfRatioStatistic === 'services' &&
      dispatch(getServicesBookedRatio(query));

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
    <div>
      <h1 className='text-4xl text-primary text-center font-cute tracking-wider my-4'>
        Chào mừng đến với Dashboard!
      </h1>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl text-secondary font-bold tracking-wide my-2'>
          Thống kê hệ thống
        </h2>
        <div className='flex items-center justify-end gap-2'>
          <h2 className='text-lg text-secondary font-semibold'>
            Thống kê theo
          </h2>
          <Select
            label='Thời gian'
            value={typeOfStatisticTime}
            onChange={handleChangeTimeType}
          >
            {validTimeTypes?.map((item) => (
              <MenuItem value={item?.value}>{item?.label}</MenuItem>
            ))}
          </Select>
          {typeOfStatisticTime === 'date' ? (
            <SelectDateRange
              startDate={statisticRange.startDate}
              endDate={statisticRange.endDate}
              onChangeStart={handleChangeStartDate}
              onChangeEnd={handleChangeEndDate}
            />
          ) : typeOfStatisticTime === 'month' ? (
            <Select
              label='Tháng'
              value={month}
              onChange={handleChangeMonth}
              displayEmpty
            >
              <MenuItem value={''}>-- Tháng --</MenuItem>
              {validMonth?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          ) : (
            <Select label='Năm' value={year} onChange={handleChangeYear}>
              {lastTenYears?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          )}
        </div>
      </div>
      <section className='mb-8'>
        <div className='grid grid-cols-2 gap-4 my-4'>
          <div className='p-4 bg-slate-200 rounded-xl'>
            <BookedServiceStatistic
              loading={bookedServicesLoading}
              data={bookedServicesData}
              labels={bookedServicesLabels}
              title={'Tỉ lệ dịch vụ được đặt'}
              validRatioTypes={validRatioTypes}
              ratioType={typeOfRatioStatistic}
              handleChangeRatioType={handleChangeRatioType}
            />
          </div>

          <div className='p-4 bg-slate-200 rounded-xl'>
            <BookedBreedStatistic
              loading={bookedBreedsLoading}
              data={bookedBreedsData}
              labels={bookedBreedsLabels}
              title={'Tỉ lệ loài thú cưng được đặt'}
            />
          </div>
        </div>

        <div className='p-4 my-4 bg-slate-200 rounded-xl'>
          <RevenueStatistic
            loading={revenueLoading}
            data={revenueData}
            labels={revenueLabels}
            typeOfStatisticTime={typeOfStatisticTime}
            title={'Tổng doanh thu'}
          />
        </div>

        <div className='grid grid-cols-2 gap-4 my-4'>
          <div className='p-4 bg-slate-200 rounded-xl'>
            <BreedRatioStatistic
              data={breedRatioData}
              labels={breedRatioLabels}
              loading={breedRatioLoading}
              title={'Tỉ lệ thú cưng theo loài'}
              validPetTypes={validPetTypes}
              petType={petType}
              handleChangePetType={handleChangePetType}
            />
          </div>

          {/* <div className='p-4 bg-slate-200 rounded-xl'>
            <BookedBreedStatistic
              loading={bookedBreedsLoading}
              data={bookedBreedsData}
              labels={bookedBreedsLabels}
              title={'Tỉ lệ loài thú cưng được đặt'}
            />
          </div> */}
        </div>
      </section>
      <h2 className='text-2xl text-secondary font-bold tracking-wide my-2'>
        Quản lý hệ thống
      </h2>
    </div>
  );
};

export default HomePage;
