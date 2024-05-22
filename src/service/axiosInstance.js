import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
	baseURL: "https://dc7d-125-166-12-126.ngrok-free.app/api",
	headers: {
		"Content-Type": "application/json",
	},
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
