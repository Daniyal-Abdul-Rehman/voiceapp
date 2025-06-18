import axios from 'axios';

const api = axios.create({
  baseURL: 'https://audioversebackend.vercel.app',
});

export const getAudios = async () => {
  try {
    const response = await api.get('/audios');
    return response.data;
  } catch (error) {
    console.error('Error fetching audios:', error);
    throw error;
  }
};

export const deleteAudio = async (id) => {
  try {
    await api.delete(`/audios/${id}`);
  } catch (error) {
    console.error('Error deleting audio:', error);
    throw error;
  }
};
export const getAudioById = async (id: string) => {
  try {
    const response = await api.get(`/audios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching audio with ID ${id}:`, error);
    throw error;
  }
};