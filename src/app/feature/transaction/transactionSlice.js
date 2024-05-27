import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transactionService } from "../../../service/transactionService";

const { create } = transactionService();

export const createTransactionAction = createAsyncThunk(
	"transaction/create",
	async (payload, ThunkAPI) => {
		try {
			const res = await create(payload);
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

const transactionSlice = createSlice({
	name: "transaction",
	initialState: {
		isLoading: false,
		transaction: {},
		transactions: [],
	},
	extraReducers: (builder) => {
		builder.addCase(createTransactionAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createTransactionAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(createTransactionAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default transactionSlice;
