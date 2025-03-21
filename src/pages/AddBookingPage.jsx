import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { resetSelectedUser, setSelectedUser } from '../redux/slices/userSlice';
import { getUsers } from '../redux/thunks/userThunk';
import CustomerSelection from '../components/AddBookingPage/CustomerSelection';
import ServiceSelection from '../components/AddBookingPage/ServiceSelection';
import { toast } from 'react-toastify';
import { getPetByUser } from '../redux/thunks/petThunk';
import PetSelection from '../components/AddBookingPage/PetSelection';
import { getServices } from '../redux/thunks/serviceThunk';
import SelectedServiceContainer from '../components/AddBookingPage/SelectedServiceContainer';
import { getServiceVairantById } from '../redux/thunks/serviceVariantThunk';
import { resetVariants } from '../redux/slices/serviceVariantSlice';
import { getWalkDogVariantByServiceId } from '../redux/thunks/walkDogVariantThunk';
import { resetWDVariants } from '../redux/slices/walkDogVariantSlice';
import { getBookingTypes } from '../redux/thunks/bookingTypeThunk';
import { createBooking } from '../redux/thunks/bookingThunk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

// Yup validation schema
const validationSchema = Yup.object().shape({
  bookingStartTime: Yup.date().required('Start time is required'),
  bookingNote: Yup.string(),
  roomRentalTime: Yup.number().integer().optional(),
  bookingTypeId: Yup.string().required('Booking type is required'),
  customerId: Yup.string().required('Customer is required'),
  petId: Yup.string().required('Pet is required'),
  breedId: Yup.string().required('Breed is required'),
  petWeightRange: Yup.string(),
  roomId: Yup.string().nullable(),
  serviceId: Yup.array().nullable(),
  serviceComboIds: Yup.array().nullable(),
});

const AddBookingPage = () => {
  const dispatch = useDispatch();

  // State for search customer
  const [customerSearching, setCustomerSearching] = useState('');
  const [serviceSearching, setServiceSearching] = useState('');

  // Get users from redux and filter customers
  const users = useSelector((state) => state.users.users);
  const customers = useMemo(
    () =>
      Array.isArray(users) && users.length !== 0
        ? users.filter((user) => user?.staffType === '')
        : [],
    [users]
  );

  // User's pets
  const userPets = useSelector((state) => state.pets.userPets);

  const [selectedPetId, setSelectedPetId] = useState();

  // customer filtered from search result
  const filteredCustomers = useMemo(() => {
    if (!Array.isArray(customers)) return [];

    const searchTerm = customerSearching.toLowerCase().trim();

    return customers.filter(({ fullName, phoneNumber }) => {
      return (
        fullName.toLowerCase().includes(searchTerm) ||
        phoneNumber.includes(searchTerm)
      );
    });
  }, [customers, customerSearching]);

  // Selected customer
  const selectedCustomer = useSelector((state) => state.users.selectedUser);

  // Services
  const services = useSelector((state) => state.services.services);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const filterdServices = useMemo(() => {
    if (!Array.isArray(services) || services.length === 0) return [];

    if (serviceSearching === '') return services;

    let result = services;

    if (selectedType) {
      result = result.filter((s) =>
        s.serviceTypeName?.serviceTypeName
          ?.toLowerCase()
          ?.includes(selectedType)
      );
    }

    result = result.filter((service) =>
      service.serviceName
        .toLowerCase()
        .includes(serviceSearching.toLowerCase().trim())
    );

    if (selectedServices) {
      console.log('filtering slecetd');
      result = result.filter(
        (service) =>
          !selectedServices.some((selected) => selected.id === service.id)
      );
    }

    return result;
  }, [services, serviceSearching, selectedType, selectedServices]);

  // Variants
  const variants = useSelector(
    (state) => state.serviceVariants.serviceVariants
  );

  const walkDogVariants = useSelector(
    (state) => state.walkDogVariants.walkDogVariants
  );

  const [selectedItems, setSelectedItems] = useState([]);

  // Booking Types
  const bookingType = useSelector((state) => state.bookingTypes.bookingTypes);

  // featch users if redux store is empty
  useEffect(() => {
    if (Array.isArray(users) && users.length === 0) {
      dispatch(getUsers({ pageIndex: 1, pageSize: 20 }));
    }
  }, [dispatch, users]);

  // HANDLERS

  // Handler for search customers
  const handleSearchCustomer = (e) => {
    setCustomerSearching(e.target.value);
  };

  const handleSearchService = (e) => {
    setServiceSearching(e.target.value);
  };

  // Handler for select customer
  const handleCustomerSelect = (customerId, setFieldValue) => {
    dispatch(resetSelectedUser());
    const customer = customers.find((c) => c?.userId === customerId);

    dispatch(setSelectedUser(customerId));

    dispatch(getPetByUser(customerId))
      .unwrap()
      .then()
      .catch((e) => toast.error(e));

    setFieldValue('customerId', customer.userId);
    setFieldValue('customerEmail', customer.email);
  };

  const handleSelectPet = (petId, setFieldValue) => {
    const selectedPet =
      Array.isArray(userPets) && userPets.length !== 0
        ? userPets.find((pet) => pet.petId === petId)
        : [];
    setSelectedPetId(petId);
    setFieldValue('petId', petId);
    setFieldValue('breedId', selectedPet?.breedId);

    console.log(selectedPet);
    dispatch(
      getServices({
        breedId: selectedPet?.breedId,
        petWeight: selectedPet?.petWeight,
      })
    );
  };

  const handleAddNewPet = () => {
    console.log('add pet');
  };

  const handleSelectService = (serviceId) => {
    const service = filterdServices.find(
      (item) => item.serviceId === serviceId
    );

    dispatch(resetVariants());
    dispatch(resetWDVariants());

    if (service?.serviceTypeName?.toLowerCase()?.includes('dắt chó')) {
      dispatch(getWalkDogVariantByServiceId(serviceId));
    } else {
      dispatch(getServiceVairantById(serviceId));
    }

    setSelectedService(service);
  };

  const handleSelectServices = (serviceId) => {
    const selectedService = filterdServices.find(
      (item) => item.serviceId === serviceId
    );

    setSelectedType(
      selectedService?.serviceTypeName?.toLowerCase()?.includes('chăm sóc')
        ? 'chăm sóc'
        : selectedService?.serviceTypeName?.toLowerCase()?.includes('dắt chó')
        ? 'dắt chó'
        : 'khách sạn'
    );

    setSelectedServices((prev) => {
      const result = new Set(prev);

      result.add(selectedService);

      return Array.from(result);
    });
  };

  const handleSelectVariant = (variant, setFieldValue) => {
    const {
      serviceId,
      breedId,
      breedName,
      petWeightRange,
      price,
      estimateTime,
      pricePerPeriod,
      period,
    } = variant;

    const item = {
      serviceName: selectedService?.serviceName,
      breedName,
      petWeightRange: petWeightRange ? petWeightRange : 'N/A',
      price: price ? price : pricePerPeriod,
      estimateTime: estimateTime ? estimateTime : period,
    };

    setSelectedItems((prev) => {
      const result = new Set(prev);

      result.add(item);

      return Array.from(result).map((item, index) => ({
        ...item,
        index: index + 1,
      }));
    });

    setSelectedServices((prev) =>
      prev.filter((service) => service.serviceId !== serviceId)
    );

    dispatch(resetVariants());
    dispatch(resetWDVariants());

    dispatch(getBookingTypes({ typeName: selectedType }))
      .unwrap()
      .then((value) => {
        console.log(value);
        setFieldValue('bookingTypeId', value?.bookingTypeId);
      });
    setFieldValue('petWeightRange', petWeightRange);
    setFieldValue('breedId', breedId);
    setFieldValue(
      'serviceId',
      selectedServices.map((item) => item.serviceId)
    );
  };

  const filterdVariants = useMemo(() => {
    const selectedPet =
      Array.isArray(userPets) && userPets.length !== 0
        ? userPets.find((item) => item.petId === selectedPetId)
        : null;

    if (!selectedPet) return [];

    if (!Array.isArray(variants) || !Array.isArray(walkDogVariants)) {
      throw new Error('Invalid input: variants should be an array.');
    }

    if (
      typeof selectedPet?.petWeight !== 'number' ||
      isNaN(selectedPet?.petWeight)
    ) {
      throw new Error('Invalid input: weight should be a valid number.');
    }

    const result = [
      ...variants.filter((item) => {
        if (!item.petWeightRange || typeof item.petWeightRange !== 'string') {
          return false;
        }

        const match = item.petWeightRange.match(/(\d+)\s*-\s*(\d+)kg/);
        if (!match) {
          return false;
        }

        const minWeight = parseFloat(match[1]);
        const maxWeight = parseFloat(match[2]);

        return (
          selectedPet?.petWeight >= minWeight &&
          selectedPet?.petWeight <= maxWeight
        );
      }),
      ...walkDogVariants,
    ];

    return result;
  }, [selectedPetId, userPets, variants, walkDogVariants]);

  return (
    <div className='px-4'>
      <h1 className='text-3xl text-primary font-cute tracking-wider mt-4 mb-8'>
        Tạo lịch hẹn
      </h1>

      <Formik
        initialValues={{
          bookingStartTime: dayjs().tz('Asia/Ho_Chi_Minh'),
          bookingNote: '',
          roomRentalTime: 0,
          bookingTypeId: '',
          customerId: '',
          customerEmail: '',
          petId: '',
          breedId: '',
          petWeightRange: '',
          roomId: null,
          serviceId: [],
          serviceComboIds: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(selectedType);
          console.log('Booking Submitted:', values);
          console.log(selectedItems);
          let totalTime = 0;
          selectedItems.forEach((item) => {
            totalTime += item.estimateTime;
          });
          dispatch(
            createBooking({
              ...values,
              bookingEndTime: values.bookingStartTime.add(totalTime, 'hour'),
            })
          )
            .then(() => toast.success('Tạo booking thành công'))
            .catch((e) => toast.error(e));
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <Form className='space-y-4'>
            {/* Customer Selection */}
            <CustomerSelection
              search={customerSearching}
              customers={filteredCustomers}
              onSearch={handleSearchCustomer}
              onSelect={handleCustomerSelect}
              selectedCustomer={selectedCustomer}
              setFieldValue={setFieldValue}
            />

            <hr />

            {/* Showing selected customer's pets */}
            <h3 className='text-2xl text-secondary font-semibold'>
              Chọn thú cưng
            </h3>
            {selectedCustomer && userPets ? (
              <PetSelection
                pets={userPets}
                selectedPetId={selectedPetId}
                onSelectPet={handleSelectPet}
                onAddNewPet={handleAddNewPet}
                setFieldValue={setFieldValue}
              />
            ) : (
              <p className='my-8 text-2xl text-primary font-cute tracking-wider'>
                Chọn một khách hàng để xem thú cưng của họ!
              </p>
            )}

            <hr />

            <ServiceSelection
              services={filterdServices}
              onChooseService={handleSelectServices}
              search={serviceSearching}
              onSearch={handleSearchService}
            />

            <hr />

            <SelectedServiceContainer
              services={selectedServices}
              selectedService={selectedService}
              onSelectService={handleSelectService}
              variants={filterdVariants}
              onSelectVariant={handleSelectVariant}
              selectedItems={selectedItems}
              setFieldValue={setFieldValue}
            />

            <hr />
            <h3 className='text-2xl text-secondary font-semibold'>
              Thông tin khác
            </h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label='Thời gian hẹn'
                value={values.bookingStartTime}
                onChange={(newValue) => {
                  console.log(newValue);
                  setFieldValue('bookingStartTime', newValue);
                }}
                className='w-full'
              />
            </LocalizationProvider>

            <Field
              name='bookingNote'
              as={TextField}
              multiline
              rows={3}
              label='Booking Note'
              fullWidth
            />
            <ErrorMessage
              name='bookingNote'
              component='p'
              className='text-red-500'
            />

            <button
              type='submit'
              className='w-1/2 mx-auto p-2 rounded-full bg-primary text-white translate-x-1/2 mt-16'
            >
              Tạo
            </button>
            <button
              type='button'
              onClick={() => {
                console.log(values);
                console.log(selectedType);
              }}
              className='w-1/2 mx-auto p-2 rounded-full bg-primary text-white translate-x-1/2 mt-16 block'
            >
              Log Values
            </button>
            <button
              type='button'
              onClick={() => console.log('Validation Errors:', errors)}
              className='w-1/2 mx-auto p-2 rounded-full bg-primary text-white translate-x-1/2 mt-16 block'
            >
              Log Error
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBookingPage;
