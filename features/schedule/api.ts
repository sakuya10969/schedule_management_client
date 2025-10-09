import axios from 'axios';

import {
  GetAvailabilityParams,
  StoreFormDataParams,
} from '@/features/schedule/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getEmployeeDirectory = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/employee_directory`);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch employee directory');
  }
};

export const getAvailability = async (params: GetAvailabilityParams) => {
  try {
    const { data } = await axios.post(`${apiUrl}/availability`, params);
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
    return data.cosmos_db_id;
  } catch (error) {
    console.error('Error storing form data:', error);
    return null;
  }
};
