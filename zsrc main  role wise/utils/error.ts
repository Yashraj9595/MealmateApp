import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handle Axios error responses
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}; 