import axios from 'axios'
import type { IUser, IFilters } from '../types';

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export async function loadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await httpClient.post<File>("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function listUsers(filters?: IFilters) {
  const response = await httpClient.get<IUser[]>('/users', {
    params: {
      ...filters
    }
  });
  return response.data;
}