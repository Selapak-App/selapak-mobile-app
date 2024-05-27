import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const LandService = () => {
	const getAll = async () => {
		const res = await axiosInstance.get("/lands/available");
		return res.data.data;
	};

	return { getAll };
};
