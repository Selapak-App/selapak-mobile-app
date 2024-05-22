import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RentPeriodService } from "../../../service/rentPeriodService";

const { getAll } = RentPeriodService();

export const getPeriodAction = createAsyncThunk(
	"period/getAll",
	async () => {
        try {
            return await getAll();
        } catch (e) {
            const invalid = e.message.includes("403");
            const error = {
                error: true,
                message: invalid ? "Please re-login" : e.message,
            }
            return error;
        }
	}
);

const rentPeriodSlice = createSlice({
	name: "period",
	initialState: {
		isLoading: false,
        periods: []
	},
	extraReducers: (builder) => {
		builder.addCase(getPeriodAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPeriodAction.fulfilled, (state, { payload }) => {
            state.periods = payload;
			state.isLoading = false;
		});
		builder.addCase(getPeriodAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default rentPeriodSlice;
