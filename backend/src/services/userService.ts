import { User, IUser } from "../models/User";

export const findAllUsers = (): Promise<IUser[]> => {
  return User.find().sort({ createdAt: -1 });
};

export const findUserById = (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const createUser = (data: {
  name: string;
  email: string;
  age: number;
}): Promise<IUser> => {
  const user = new User(data);
  return user.save();
};

export const updateUserById = (
  id: string,
  data: { name?: string; email?: string; age?: number }
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserById = (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};
