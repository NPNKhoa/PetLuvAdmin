import { DeleteForever } from '@mui/icons-material';
import { MenuItem, TextField } from '@mui/material';
import { CloudUpload } from 'lucide-react';
import { useEffect } from 'react';

const DogWalkingServiceForm = ({
  formik,
  handleClickImgInput,
  handleImageUpload,
  imagePreviews,
  handleClearImages,
}) => {
  useEffect(() => {
    formik.setFieldValue(
      'serviceTypeId',
      'd734146d-3fa5-42cc-bb0b-621c186badb4'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TextField
        label='Tên dịch vụ'
        fullWidth
        {...formik.getFieldProps('serviceName')}
        error={formik.touched.serviceName && Boolean(formik.errors.serviceName)}
        helperText={formik.touched.serviceName && formik.errors.serviceName}
      />

      {/* Mô tả dịch vụ */}
      <TextField
        label='Mô tả dịch vụ'
        fullWidth
        multiline
        rows={3}
        {...formik.getFieldProps('serviceDesc')}
        error={formik.touched.serviceDesc && Boolean(formik.errors.serviceDesc)}
        helperText={formik.touched.serviceDesc && formik.errors.serviceDesc}
      />

      {/* Trạng thái hiển thị */}
      <TextField
        select
        label='Trạng thái'
        fullWidth
        {...formik.getFieldProps('isVisible')}
        error={formik.touched.isVisible && Boolean(formik.errors.isVisible)}
        helperText={formik.touched.isVisible && formik.errors.isVisible}
      >
        <MenuItem value='true'>Hiển thị</MenuItem>
        <MenuItem value='false'>Ẩn</MenuItem>
      </TextField>

      {/* Upload ảnh */}
      <div className='space-y-2'>
        <label className='block font-medium'>Tải lên ảnh</label>

        {/* Ô tải ảnh */}
        <div
          onClick={handleClickImgInput}
          className='border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100'
        >
          <CloudUpload className='text-gray-500 text-4xl' />
          <p className='text-sm text-gray-500'>Nhấn để chọn ảnh</p>
          <input
            id='upload-services-image'
            type='file'
            multiple
            accept='image/*'
            className='hidden'
            onChange={handleImageUpload}
          />
        </div>

        {/* Hiển thị lỗi khi chưa có ảnh */}
        {formik.touched.serviceImageUrls && formik.errors.serviceImageUrls && (
          <p className='text-red-500 text-sm'>
            {formik.errors.serviceImageUrls}
          </p>
        )}

        {/* Hiển thị ảnh preview + nút xóa ảnh */}
        {imagePreviews.length > 0 && (
          <div>
            <div className='flex gap-2 mt-4 items-center'>
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt='Preview'
                  className='w-20 h-20 object-cover rounded-lg shadow-md'
                />
              ))}

              <button
                type='button'
                onClick={handleClearImages}
                className='ms-8 flex items-center gap-1 text-red-500 hover:opacity-80'
              >
                <DeleteForever />
                Xóa tất cả ảnh
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DogWalkingServiceForm;
