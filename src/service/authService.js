import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const AuthService = () => {
	const login = async (payload) => {
		const res = await axiosInstance.post("/auth/login", payload);
		return res.data;
	};

	const register = async (payload) => {
		const res = await axiosInstance.post("/auth/register", payload);
		return res.data;
	};

	return { login, register };
};
