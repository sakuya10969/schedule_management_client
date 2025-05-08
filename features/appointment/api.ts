import axios from 'axios';

import { FormData } from '@/features/appointment/type';

export const fetchFormData = async (
  apiUrl: string,
  token: string
): Promise<FormData> => {
  try {
    const { data } = await axios.get(`${apiUrl}/retrieve_form_data`, {
      params: { token },
    });
    return data;
  } catch (error) {
    console.error('Error retrieving form data:', error);
    throw new Error('データの取得に失敗しました。');
  }
};

export const submitSchedule = async (apiUrl: string, payload: any) => {
  try {
    const { data } = await axios.post(`${apiUrl}/appointment`, payload);
    return data;
  } catch (error) {
    console.error('日程の確定に失敗しました:', error);
    throw new Error('日程の確定に失敗しました。');
  }
};
