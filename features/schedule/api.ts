import axios from 'axios';

import { GetAvailabilityParams, StoreFormDataParams } from '@/features/schedule/type';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAvailability = async (params: GetAvailabilityParams) => {
  try {
    const { data } = await axios.post(`${apiUrl}/get_availability`, params);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch schedule');
  }
};

export const storeFormData = async (
  params: StoreFormDataParams
): Promise<string | null> => {
  try {
    const { data } = await axios.post(`${apiUrl}/store_form_data`, params);
    return data.token;
  } catch (error) {
    console.error('Error storing form data:', error);
    return null;
  }
};
