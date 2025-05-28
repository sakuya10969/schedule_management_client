import axios from 'axios';

import { FormData, SubmitSchedulePayload } from '@/features/appointment/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormData = async (cosmos_db_id: string): Promise<FormData> => {
  try {
    const { data } = await axios.get(`${apiUrl}/retrieve_form_data`, {
      params: { cosmos_db_id },
    });
    return data;
  } catch (error) {
    console.error('Error retrieving form data:', error);
    throw new Error('データの取得に失敗しました。');
  }
};

export const submitSchedule = async (payload: SubmitSchedulePayload) => {
  try {
    const { data } = await axios.post(`${apiUrl}/appointment`, payload);
    return data;
  } catch (error) {
    console.error('日程の確定に失敗しました:', error);
    throw new Error('日程の確定に失敗しました。');
  }
};
