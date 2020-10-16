import axios, { AxiosInstance } from 'axios';
import { Item } from '../types';
import { EmptyData } from './types';

const axiosInstace = axios.create({
  baseURL: 'https://private-anon-281b316356-note10.apiary-mock.com',
  timeout: 1000
});

const makeApi = (axios: AxiosInstance) => {
  return {
    getNotes: (): Promise<Item[]> =>
      axios.get('/notes').then((response) => response.data),
    postNote: (payload: Item): Promise<Item> =>
      axios.post('/notes', payload).then((response) => response.data),
    getNote: (payload: { id: string }): Promise<Item> =>
      axios.get(`/notes/${payload.id}`).then((response) => response.data),
    putNote: (payload: Item): Promise<Item> =>
      axios
        .put(`/notes/${payload.id}`, payload)
        .then((response) => response.data),
    deleteNote: (payload: { id: string }): Promise<EmptyData> =>
      axios.delete(`/notes/${payload.id}`).then((response) => response.data)
  };
};

export const Api = makeApi(axiosInstace);
