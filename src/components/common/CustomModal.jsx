import { Modal, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const CustomModal = ({
  open,
  onClose,
  title,
  children,
  onConfirm,
  confirmTextButton = 'OK',
  cancelTextButton = 'Hủy',
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-2/3 bg-white rounded-lg shadow-lg flex flex-col max-h-[80vh]'>
          <header className='bg-primary text-white flex justify-between items-center p-4 rounded-t-lg'>
            <h1 className='text-2xl text-secondary font-cute tracking-wide'>
              {title}
            </h1>
            <IconButton onClick={onClose} className='text-white'>
              <Close />
            </IconButton>
          </header>

          <section className='p-4 overflow-y-auto flex-grow'>
            {children}
          </section>

          <footer className='flex justify-end gap-3 p-4 border-t'>
            {onConfirm && (
              <button
                type='submit'
                className='text-white bg-primary px-12 py-3 rounded-xl hover:bg-primary-light hover:cursor-pointer'
                onClick={onConfirm}
              >
                {confirmTextButton}
              </button>
            )}
            <button
              className='text-secondary bg-tertiary-dark px-12 py-3 rounded-xl hover:bg-tertiary-light hover:cursor-pointer'
              onClick={onClose}
            >
              {cancelTextButton}
            </button>
          </footer>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
