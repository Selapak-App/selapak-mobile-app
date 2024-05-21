import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../../service/authService";

const { login } = AuthService();

export const loginAction = createAsyncThunk(
	"auth/login",
	async (payload, ThunkAPI) => {
		try {
			const res = await login(payload);
			if (res) {
				return res;
			} else {
				throw new Error("Invalid response structure");
			}
		} catch (e) {
            const invalid = e.message.includes("403");
            const error = {
                error: true,
                message: invalid ? "Email/password salah" : e.message,
            }
            return error;
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		username: "",
		password: "",
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, { payload }) => {
			state.isLoading = false;
		});
		builder.addCase(loginAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default authSlice;
