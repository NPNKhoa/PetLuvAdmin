import { Card, CardContent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PetSelection = ({
  pets,
  selectedPetId,
  onSelectPet,
  onAddNewPet,
  setFieldValue,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl'>
      {Array.isArray(pets) && pets.length !== 0 ? (
        pets.map((pet) => (
          <Card
            key={pet.petId}
            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
              selectedPetId === pet.petId
                ? 'border-primary border-[3px]'
                : 'border-gray-200'
            }`}
            onClick={() => onSelectPet(pet?.petId, setFieldValue)}
          >
            <img
              src={pet.petImagePaths[0]?.petImagePath || '/logo.png'}
              alt={pet.petName}
              className='w-full h-40 object-cover rounded-md'
            />
            <CardContent>
              <h2 className='font-bold text-primary text-xl mb-1'>
                {pet.petName}
              </h2>
              <p className='text-secondary text-start'>
                <span className='text-primary font-semibold text-sm'>
                  Loài:
                </span>{' '}
                {pet.breedName}
              </p>
              <p className='text-secondary text-start'>
                <span className='text-primary font-semibold text-sm'>
                  Cân nặng:
                </span>{' '}
                {pet.petWeight} kg
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className='my-8 text-xl text-primary font-cute tracking-wider'>
          Không tìm thấy thú cưng
        </p>
      )}

      <button
        type='button'
        onClick={onAddNewPet}
        className='p-4 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary transition-all duration-300 rounded-lg'
      >
        <AddCircleOutlineIcon fontSize='large' color='primary' />
        <p>Thêm thú cưng mới</p>
      </button>
    </div>
  );
};

export default PetSelection;
