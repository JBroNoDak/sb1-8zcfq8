import { API_CONFIG } from '../config/constants';

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

export async function postData(url: string, data: any): Promise<ApiResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}