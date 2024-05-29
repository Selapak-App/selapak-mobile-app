import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import variables from "../../assets/variables";

const axiosInstance = axios.create({
	baseURL: variables.BASE_API,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
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

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				return Promise.reject(
					new Error(
						error.response.data.message || "Unauthorized Access"
					)
				);
			} else if (error.response.status === 409) {
				return Promise.reject(
					new Error(error.response.data.message || "Conflict")
				);
			} else if (error.response.status === 400) {
				return Promise.reject(
					new Error(error.response.data.message || "Bad Request")
				);
			} else if (error.response.status === 404) {
				return Promise.reject(
					new Error(error.response.data.message || "Not Found")
				);
			}
		}
		return Promise.reject(new Error("Network Error"));
	}
);

export default axiosInstance;
