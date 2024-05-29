import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../../service/authService";

const { login, register, logout, updatePassword, forgetPassword } = AuthService();

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

export const logoutAction = createAsyncThunk(
	"auth/logout",
	async (payload, ThunkAPI) => {
		try {
			const res = await logout();
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

export const updatePasswordAction = createAsyncThunk(
	"auth/updatePassword",
	async (payload, ThunkAPI) => {
		try {
			console.log("FROM SLICE: ", payload);
			const res = await updatePassword(payload);
			return res;
		} catch (e) {
			console.log(e)
			res = {
				statusCode: 404,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

export const forgetPasswordAction = createAsyncThunk(
	"auth/forgetPassword",
	async (payload, ThunkAPI) => {
		try {
			console.log("FROM SLICE: ", payload);
			const res = await forgetPassword(payload);
			return res;
		} catch (e) {
			console.log(e)
			res = {
				statusCode: 404,
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
		builder.addCase(loginAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(loginAction.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(registerAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(registerAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(registerAction.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updatePasswordAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updatePasswordAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updatePasswordAction.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(forgetPasswordAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(forgetPasswordAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(forgetPasswordAction.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(logoutAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(logoutAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(logoutAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default authSlice;
