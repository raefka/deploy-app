import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.findAllUsers();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, age } = req.body;
    const user = await userService.createUser({ name, email, age });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, age } = req.body;
    const user = await userService.updateUserById(req.params.id, {
      name,
      email,
      age,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
