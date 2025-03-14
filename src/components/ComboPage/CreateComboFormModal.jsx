import React, { useState } from 'react';
import { TextField, MenuItem, Checkbox, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomModal from '../common/CustomModal';
import MyAlrt from '../../configs/alert/MyAlrt';
import { useDispatch } from 'react-redux';
import { toggleServiceVisiblility } from '../../redux/thunks/serviceThunk';
import { createCombo } from '../../redux/thunks/comboThunk';
import { toast } from 'react-toastify';

// Schema kiểm tra đầu vào
const validationSchema = yup.object({
  serviceComboName: yup.string().required('Vui lòng nhập tên combo'),
  serviceComboDesc: yup.string().required('Vui lòng nhập mô tả combo'),
  isVisible: yup.string().required('Vui lòng chọn trạng thái'),
});

const CreateComboFormModal = ({ open, onClose, services }) => {
  const dispatch = useDispatch();

  const [validServices, setValidServices] = useState(services);
  const [selectedServices, setSelectedServices] = useState([]);

  // Formik xử lý form
  const formik = useFormik({
    initialValues: {
      serviceComboName: '',
      serviceComboDesc: '',
      isVisible: true,
    },
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        isVisible: values.isVisible === 'true',
        serviceId:
          Array.isArray(selectedServices) && selectedServices.length > 0
            ? selectedServices?.map((service) => service.serviceId)
            : [],
      };

      dispatch(createCombo(body))
        .unwrap()
        .then(() => toast.success('Thêm mới combo thành công'))
        .catch((e) => {
          console.log(e);
          toast.error(e);
        });
      onClose();
    },
  });

  const handleChooseInvisibleService = (service) => {
    console.log(
      `Dịch vụ ${service.serviceName} sẽ được chuyển thành hiển thị.`
    );
    dispatch(toggleServiceVisiblility(service));
  };

  const handleSelectService = (service) => {
    if (!service.isVisible) {
      MyAlrt.Warning(
        'Dịch vụ đang bị ẩn!',
        'Nếu thêm dịch vụ này vào combo, trạng thái của nó sẽ được chuyển thành "Hiển thị". Bạn có muốn tiếp tục?',
        'Tiếp tục',
        true,
        () => {
          handleChooseInvisibleService(service);
          addOrRemoveService(service);
        }
      );
      return;
    }
    addOrRemoveService(service);
  };

  // Hàm thêm/bỏ dịch vụ vào danh sách chọn
  const addOrRemoveService = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.serviceId === service.serviceId);
      const updatedServices = isSelected
        ? prev.filter((s) => s.serviceId !== service.serviceId)
        : [...prev, service];

      // Nếu không còn dịch vụ nào được chọn, reset về danh sách ban đầu
      if (updatedServices.length === 0) {
        setValidServices(services);
      } else {
        const formattedService = service.serviceName.trim().toLowerCase();
        const filteringKeyWord = formattedService.includes('chó')
          ? 'chó'
          : formattedService.includes('mèo')
          ? 'mèo'
          : '';

        if (filteringKeyWord) {
          setValidServices((prev) =>
            prev.filter((item) =>
              item.serviceName.trim().toLowerCase().includes(filteringKeyWord)
            )
          );
        }
      }

      return updatedServices;
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Tạo Combo Dịch Vụ'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        {/* Nhập thông tin combo */}
        <section className='space-y-4 pb-4'>
          <h3 className='font-cute tracking-wide text-2xl mb-4 text-primary'>
            Nhập thông tin
          </h3>
          <TextField
            label='Tên Combo'
            fullWidth
            name='serviceComboName'
            value={formik.values.serviceComboName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.serviceComboName &&
              Boolean(formik.errors.serviceComboName)
            }
            helperText={
              formik.touched.serviceComboName && formik.errors.serviceComboName
            }
          />
          <TextField
            label='Mô tả Combo'
            fullWidth
            multiline
            rows={3}
            name='serviceComboDesc'
            value={formik.values.serviceComboDesc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.serviceComboDesc &&
              Boolean(formik.errors.serviceComboDesc)
            }
            helperText={
              formik.touched.serviceComboDesc && formik.errors.serviceComboDesc
            }
          />
          <TextField
            select
            label='Trạng thái'
            fullWidth
            name='isVisible'
            value={formik.values.isVisible}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.isVisible && Boolean(formik.errors.isVisible)}
            helperText={formik.touched.isVisible && formik.errors.isVisible}
          >
            <MenuItem value='true'>Hiển thị</MenuItem>
            <MenuItem value='false'>Đã ẩn</MenuItem>
          </TextField>
        </section>

        <Divider sx={{ bgcolor: 'primary' }} />

        {/* Danh sách dịch vụ để chọn */}
        <section className='pt-6 mb-4'>
          <h3 className='font-cute tracking-wide text-2xl mb-4 text-primary'>
            Thêm Dịch Vụ
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            {validServices.map((service) => (
              <div
                key={service.serviceId}
                className='border p-4 rounded-lg shadow-md flex items-start justify-between cursor-pointer hover:bg-gray-100'
                onClick={() => handleSelectService(service)}
              >
                <div>
                  <p className='font-semibold'>{service.serviceName}</p>
                  <p className='text-sm text-gray-500 line-clamp-2 mb-2'>
                    {service.serviceDesc}
                  </p>
                  <p
                    className={
                      service.isVisible ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {service.isVisible ? 'Hiển thị' : 'Đã ẩn'}
                  </p>
                </div>
                <Checkbox
                  checked={selectedServices.some(
                    (s) => s.serviceId === service.serviceId
                  )}
                />
              </div>
            ))}
          </div>
        </section>
      </form>
    </CustomModal>
  );
};

export default CreateComboFormModal;
