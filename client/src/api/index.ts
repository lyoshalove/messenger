import axios from "axios";
import { API_URL } from "../constants/api";
import { IAuthAndLogin } from "../types/authAndLogin";

export const registration = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IAuthAndLogin> => {
  return await axios.post(`${API_URL}/auth/registration`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = async (email: string, password: string): Promise<IAuthAndLogin> => {
  return await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
};
