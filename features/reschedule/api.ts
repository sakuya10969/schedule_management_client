import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getRescheduleData = async (cosmos_db_id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/reschedule`, {
            params: { cosmos_db_id },
        });
        return data;
    } catch (error) {
        console.error('Error getting reschedule data:', error);
        throw new Error('データの取得に失敗しました。');
    }
}

export const submitRescheduleData = async (cosmos_db_id: string) => {
    try {
        const { data } = await axios.post(`${apiUrl}/reschedule`, {
            params: { cosmos_db_id },
        });
        return data;
    } catch (error) {
        console.error('Error submitting reschedule data:', error);
        throw new Error('データの送信に失敗しました。');
    }
}
