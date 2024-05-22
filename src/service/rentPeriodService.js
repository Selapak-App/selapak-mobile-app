import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const RentPeriodService = () => {
	const getAll = async () => {
		try {
			const res = await axiosInstance.get("/rent-periods");
			if (res.status == 200) {
				return res.data.data;
			} else {
				throw new Error("Unexpected response status: " + res.status);
			}
		} catch (e) {
			throw e;
		}
	};

	return { getAll };
};
