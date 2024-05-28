import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileService } from "../../../service/profileService";
import { isLoading } from "expo-font";

const { get, update } = ProfileService();

export const getProfileAction = createAsyncThunk(
	"profile/get",
	async (payload, ThunkAPI) => {
		try {
			const res = await get();
			return res;
		} catch (e) {
			const res = {
				statusCode: 401,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

export const updateProfileAction = createAsyncThunk(
	"profile/update",
	async (payload, ThunkAPI) => {
		try {
			const res = await update(payload);
			await getProfileAction();
			return res;
		} catch (e) {
			const res = {
				statusCode: 401,
				message: e.message,
			};
			ThunkAPI.rejectWithValue(res);
		}
	}
);

export const checkAllFilled = createAsyncThunk(
	"profile/allFilled",
	async (payload, ThunkAPI) => {
		try {
			await ThunkAPI.dispatch(getProfileAction());
			const state = ThunkAPI.getState();
			const { profile } = state.profile;

			Object.keys(profile).map((key) => {
				const res = {
					statusCode: 200,
					message: "",
				};
				if (!profile[key]) {
					throw new Error(
						"Mohon lengkapi data diri sebelum transaksi"
					);
				}
				return res;
			});
		} catch (e) {
			const res = {
				statusCode: 401,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

export const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profile: {},
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getProfileAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getProfileAction.fulfilled, (state, { payload }) => {
			state.profile = payload;
			state.isLoading = false;
		});
		builder.addCase(getProfileAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(updateProfileAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateProfileAction.fulfilled, (state, { payload }) => {
			state.profile = payload;
			state.isLoading = false;
		});
		builder.addCase(updateProfileAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default profileSlice;
