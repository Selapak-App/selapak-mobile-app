import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const ProfileService = () => {
    const get = async () => {
        const id = await AsyncStorage.getItem("id");
		const res = await axiosInstance.get(`/customers/${id}`);
		return res.data.data;
	};

	const update = async (payload) => {
		const id = await AsyncStorage.getItem("id");
		const res = await axiosInstance.put(`/customers/${id}`, payload);
		return res.data.data;
	}

	return { get, update };
}