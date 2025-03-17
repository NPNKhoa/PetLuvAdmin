import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem } from '@mui/material';
import { CloudUpload, DeleteForever } from '@mui/icons-material';
import CustomModal from '../common/CustomModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createService } from '../../redux/thunks/serviceThunk';
import { toast } from 'react-toastify';
import CareServiceForm from './CareServiceForm';
import DogWalkingServiceForm from './DogWalkingServiceForm';
import { getPetBreeds } from '../../redux/thunks/petBreedThunk';
import MyAlrt from '../../configs/alert/MyAlrt';

const CreateServiceFormModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const serviceTypes = useSelector((state) => state.serviceTypes.serviceTypes);
  const petBreeds = useSelector((state) => state.petBreeds.petBreeds);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedType, setSelectedType] = useState('care');

  const handleChangeType = (e) => {
    if (
      e.target.value === 'walking' &&
      Array.isArray(petBreeds) &&
      petBreeds.length === 0
    ) {
      dispatch(getPetBreeds({ pageIndex: 1, pageSize: 500 }));
    }

    setSelectedType(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      serviceName: '',
      serviceDesc: '',
      isVisible: 'true',
      serviceTypeId:
        selectedType === 'walking'
          ? '3f2c2956-993d-4445-a305-109f172b54fe'
          : '',
      serviceImageUrls: [],
    },
    validationSchema: Yup.object({
      serviceName: Yup.string().required('Tên dịch vụ là bắt buộc'),
      serviceDesc: Yup.string().required('Mô tả không được để trống'),
      isVisible: Yup.string().required('Trạng thái là bắt buộc'),
      serviceTypeId:
        selectedType === 'walking'
          ? Yup.string()
          : Yup.string().required('Chọn loại dịch vụ'),
      serviceImageUrls: Yup.array().min(1, 'Vui lòng tải lên ít nhất một ảnh'),
    }),
    onSubmit: (values) => {
      dispatch(createService(values))
        .unwrap()
        .then(() =>
          MyAlrt.Success(
            'Thêm dịch vụ thành công',
            'Vui lòng thêm biến thể cho các này. Nếu không có biến thể nào được thêm sau 30p, hệ thống sẽ xóa dịch vụ này!',
            'OK'
          )
        )
        .catch((e) => toast.error(e));

      onClose();
    },
  });

  // Xử lý chọn ảnh & tạo preview
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue('serviceImageUrls', files);

    // Tạo URL ảnh preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Xóa tất cả ảnh đã tải lên
  const handleClearImages = () => {
    formik.setFieldValue('serviceImageUrls', []);
    setImagePreviews([]);
  };

  const handleClickImgInput = useCallback(() => {
    document.getElementById('upload-services-image').click();
  }, []);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Thêm dịch vụ mới'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <form className='space-y-4 px-4 py-8'>
        <TextField
          select
          label='Chọn loại dịch vụ'
          fullWidth
          value={selectedType}
          onChange={handleChangeType}
        >
          <MenuItem value='care'>Dịch vụ chăm sóc</MenuItem>
          <MenuItem value='walking'>Dịch vụ dắt chó</MenuItem>
        </TextField>

        {selectedType === 'care' ? (
          <CareServiceForm
            formik={formik}
            serviceTypes={serviceTypes}
            handleClickImgInput={handleClickImgInput}
            handleImageUpload={handleImageUpload}
            imagePreviews={imagePreviews}
            handleClearImages={handleClearImages}
          />
        ) : (
          <DogWalkingServiceForm
            formik={formik}
            handleClickImgInput={handleClickImgInput}
            handleImageUpload={handleImageUpload}
            imagePreviews={imagePreviews}
            handleClearImages={handleClearImages}
          />
        )}
      </form>
    </CustomModal>
  );
};

export default CreateServiceFormModal;
