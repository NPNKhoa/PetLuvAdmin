import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextField, MenuItem, Checkbox, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomModal from '../common/CustomModal';
import MyAlrt from '../../configs/alert/MyAlrt';
import { useDispatch } from 'react-redux';
import { toggleServiceVisiblility } from '../../redux/thunks/serviceThunk';
import { updateCombo } from '../../redux/thunks/comboThunk';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Schema kiểm tra đầu vào
const validationSchema = yup.object({
  serviceComboName: yup.string().required('Vui lòng nhập tên combo'),
  serviceComboDesc: yup.string().required('Vui lòng nhập mô tả combo'),
  isVisible: yup.string().required('Vui lòng chọn trạng thái'),
});

const UpdateComboFormModal = ({ open, onClose, services }) => {
  const dispatch = useDispatch();

  const combo = useSelector((state) => state.combos.combo);

  const validServices = useRef([]);
  const [selectedServices, setSelectedServices] = useState(
    combo.services || []
  );

  useEffect(() => {
    if (combo) {
      filterServices(combo?.services);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo, services, validServices]);

  const filterServices = useCallback(
    (selected) => {
      if (!selected || selected.length === 0) {
        // setValidServices(services);
        validServices.current = services;
      } else {
        const formattedService = selected[0]?.serviceName.trim().toLowerCase();

        const filteringKeyWord = formattedService.includes('chó')
          ? 'chó'
          : formattedService.includes('mèo')
          ? 'mèo'
          : '';

        if (filteringKeyWord) {
          validServices.current = services.filter((item) =>
            item.serviceName.trim().toLowerCase().includes(filteringKeyWord)
          );
        } else {
          validServices.current = services;
        }
      }
    },
    [services]
  );

  // Formik xử lý form
  const formik = useFormik({
    initialValues: {
      serviceComboName: combo?.serviceComboName || '',
      serviceComboDesc: combo?.serviceComboDesc || '',
      isVisible: combo?.isVisible ? 'true' : 'false',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const body = {
        ...values,
        isVisible: values.isVisible === 'true',
        serviceId: selectedServices.map((service) => service.serviceId),
      };

      dispatch(updateCombo({ comboId: combo.serviceComboId, body }))
        .unwrap()
        .then(() => toast.success('Cập nhật combo thành công'))
        .catch((e) => toast.error(e));

      onClose();
    },
  });

  const handleChooseInvisibleService = (service) => {
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

  const addOrRemoveService = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.serviceId === service.serviceId);
      const updatedServices = isSelected
        ? prev.filter((s) => s.serviceId !== service.serviceId)
        : [...prev, service];

      filterServices(updatedServices);
      return updatedServices;
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Cập nhật Combo Dịch Vụ'
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
            {validServices.current.map((service) => (
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

export default UpdateComboFormModal;
