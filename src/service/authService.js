import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const AuthService = () => {
	const login = async (payload) => {
		const res = await axiosInstance.post("/auth/login", payload);
		await AsyncStorage.setItem("email", res.data.data.email);
		await AsyncStorage.setItem("id", res.data.data.id);
		await AsyncStorage.setItem("token", res.data.data.token);
		return res.data;
	};

	const register = async (payload) => {
		const res = await axiosInstance.post("/auth/register", payload);
		return res.data;
	};

	const updatePassword = async (payload) => {
		const id = await AsyncStorage.getItem("id");
		console.log("FROM SERVICE: ", payload);
		console.log("FROM SERVICE: ", id);
		const res = await axiosInstance.put(`/update-password/${id}`, payload);
		return res.data;
	}

	const forgetPassword = async (payload) => {
		console.log("FROM SERVICE: ", payload);
		const res = await axiosInstance.put("/send-email", payload);
		return res.data;
	}

	const logout = async () => {
		await AsyncStorage.clear();
	}

	return { login, register, updatePassword, forgetPassword, logout };
};
