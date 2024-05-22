import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const AuthService = () => {
	const login = async (payload) => {
		try {
			const res = await axiosInstance.post("/auth/login", payload);
			if (res.status == 200) {
				const resData = res.data.data;
				await AsyncStorage.setItem("token", resData.token);
                await AsyncStorage.setItem("customerId", resData.id);
                await AsyncStorage.setItem("email", resData.email);
				return res.data.data;
			} else {
				throw new Error("Unexpected response status: " + res.status);
			}
		} catch (e) {
			throw e;
		}
	};

    const register = async (payload) => {
        try {
            const res = await axiosInstance.post("/auth/register", payload);
            if (res.status == 201) {
                return res.data.data;
            } else {
                throw new Error("Unexpected response status: ", res.status);
            }
        } catch (e) {
            throw e;
        }
    }

	return { login, register };
};
