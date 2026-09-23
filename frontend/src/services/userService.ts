import axios from "axios";
import type { User, CreateUserData, UpdateUserData } from "../types";

const api = axios.create({
  baseURL:  "/api",
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<{ users: User[] }>("/users");
  return response.data.users;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get<{ user: User }>(`/users/${id}`);
  return response.data.user;
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await api.post<{ user: User }>("/users", data);
  return response.data.user;
};

export const updateUser = async (
  id: string,
  data: UpdateUserData
): Promise<User> => {
  const response = await api.put<{ user: User }>(`/users/${id}`, data);
  return response.data.user;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
