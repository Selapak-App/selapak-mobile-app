import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const AuthService = () => {
	const login = async (payload) => {
		try {
			const res = await axiosInstance.post("/login", payload);
			if (res.status == 200) {
				const token = res.data.data.token;
				await AsyncStorage.setItem("token", token);
				return res.data.data;
			} else {
				throw new Error("Unexpected response status: " + res.status);
			}
		} catch (e) {
			throw e;
		}
	};
	return { login };
};
