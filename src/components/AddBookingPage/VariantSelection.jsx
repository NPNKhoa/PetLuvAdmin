import { Card, CardContent } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';

const VariantSelection = ({ variants, onSelectVariant, setFieldValue }) => {
  return (
    <div className='p-4'>
      <h2 className='text-lg font-bold mb-3'>Biến thể phù hợp</h2>
      <div className='grid grid-cols-2 gap-4'>
        {variants?.map((variant, index) => (
          <Card
            key={index}
            className='shadow-md cursor-pointer hover:scale-105'
            onClick={() => onSelectVariant(variant, setFieldValue)}
          >
            <CardContent>
              <h3 className='text-xl text-primary font-semibold'>
                {variant.breedName}, {variant?.petWeightRange}
              </h3>
              <p>
                {variant?.estimateTime ? (
                  <>
                    <span className='text-lg font-semibold'>Ước tính:</span>{' '}
                    <span>{variant?.estimateTime} giờ</span>
                  </>
                ) : (
                  <>
                    <span className='text-lg font-semibold'>
                      T/gian thực hiện:
                    </span>{' '}
                    <span>{variant?.period} giờ</span>
                  </>
                )}
              </p>
              <p>
                <span className='text-lg font-semibold'>Giá:</span>{' '}
                {formatCurrency(
                  variant.price ? variant.price : variant.pricePerPeriod
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VariantSelection;
