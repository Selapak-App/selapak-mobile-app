import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const transactionService = () => {
	const create = async (payload) => {
		const res = await axiosInstance.post("/transactions", payload);
		return res.data;
	};

	const getAll = async () => {
		const id = await AsyncStorage.getItem("id");
		const res = await axiosInstance.get(`/transactions/customer/${id}`);
		return res.data.data;
	};

	const acceptDealing = async (payload) => {
		const res = await axiosInstance.put(`/transactions/accept/${payload}`);
		return res.data.data;
	};

	const declineDealing = async (payload) => {
		const res = await axiosInstance.put(`/transactions/decline/${payload}`);
		return res.data.data;
	};

	return { create, getAll, acceptDealing, declineDealing };
};
