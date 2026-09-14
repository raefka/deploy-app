export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  age: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
}
