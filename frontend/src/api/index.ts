import axios from 'axios'
import { User } from './types';

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export async function createUser(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await httpClient.post<File>("/load", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function listUsers(name?: string, city?: string, country?: string, favorite_sport?: string) {
  const response = await httpClient.get<User[]>('/users', {
    params: {
      name: name,
      city: city,
      country: country,
      favorite_sport: favorite_sport
    }
  });
  return response.data;
}