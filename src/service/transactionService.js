import axiosInstance from "./axiosInstance";

export const transactionService = () => {
    const create = async (payload) => {
        const res = await axiosInstance.post("/transactions", payload);
		return res.data;
    }

	return { create };
}