import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../../service/authService";

const { login, register } = AuthService();

export const loginAction = createAsyncThunk(
	"auth/login",
	async (payload, ThunkAPI) => {
		try {
			const res = await login(payload);
			return res;
		} catch (e) {
			res = {
				statusCode: 401,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

export const registerAction = createAsyncThunk(
	"auth/register",
	async (payload, ThunkAPI) => {
		try {
			const res = await register(payload);
			return res;
		} catch (e) {
			res = {
				statusCode: 409,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
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
		builder.addCase(registerAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(registerAction.fulfilled, (state, { payload }) => {
			state.isLoading = false;
		});
		builder.addCase(registerAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default authSlice;
