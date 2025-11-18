export const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('Error response:', error.response.data);
    return error.response.data?.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response received
    console.error('No response received:', error.request);
    return 'No response from server';
  } else {
    // Error in request setup
    console.error('Error:', error.message);
    return error.message;
  }
};

export const showErrorNotification = (error) => {
  const message = handleError(error);
  // Can be integrated with a notification library
  console.error('Error:', message);
  return message;
};

export const showSuccessNotification = (message) => {
  // Can be integrated with a notification library
  console.log('Success:', message);
};
