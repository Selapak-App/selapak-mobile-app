import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LandService } from "../../../service/landService";

const { getAll } = LandService();

export const getLandAction = createAsyncThunk("land/getAll", async () => {
	try {
		return await getAll();
	} catch (e) {
		const invalid = e.message.includes("403");
		const error = {
			error: true,
			message: invalid ? "Please re-login" : e.message,
		};
		return error;
	}
});

const landSlice = createSlice({
	name: "land",
	initialState: {
		isLoading: false,
		land: {},
		lands: [],
	},
	reducers: {
		selectedLand: (state, { payload }) => {
			state.land = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLandAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getLandAction.fulfilled, (state, { payload }) => {
			state.lands = payload.content;

			console.log("FULTILLED: ", state.lands);
			state.isLoading = false;
		});
		builder.addCase(getLandAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { selectedLand } = landSlice.actions;
export default landSlice;
