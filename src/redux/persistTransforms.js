import { createTransform } from 'redux-persist';

// This transform strips out `loading` and `error`
const stripLoadingAndError = createTransform(
  // Before saving to storage
  (inboundState) => {
    if (inboundState && typeof inboundState === 'object') {
      const { loading, error, ...rest } = inboundState; // Remove loading and error
      return rest;
    }
    return inboundState;
  },
  // After loading from storage (re-initialize loading/error)
  (outboundState) => {
    return {
      ...outboundState,
      loading: false, // Reset loading
      error: null, // Reset error
    };
  }
);

export default stripLoadingAndError;
