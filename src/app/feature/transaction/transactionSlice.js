import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transactionService } from "../../../service/transactionService";
import separateTrxByStatus, {
	refactorTrx,
} from "../../../utils/transactions/separateTrxByStatus";

const { create, getAll } = transactionService();

export const createTransactionAction = createAsyncThunk(
	"transaction/create",
	async (payload, ThunkAPI) => {
		try {
			const res = await create(payload);
			await ThunkAPI.dispatch(getAllTransactionAction());
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

export const getAllTransactionAction = createAsyncThunk(
	"transaction/getAll",
	async (payload, ThunkAPI) => {
		try {
			const res = await getAll();
			return res;
		} catch (e) {
			const res = {
				statusCode: 400,
				message: e.message,
			};
			return ThunkAPI.rejectWithValue(res);
		}
	}
);

export const isOnProgressTrx = createAsyncThunk(
	"transaction/isOnProgress",
	async (payload, ThunkAPI) => {
		try {
			await ThunkAPI.dispatch(getAllTransactionAction());
			const state = ThunkAPI.getState();
			const { transactions } = state.transaction;
			// console.log("PAYLOADDDD: ", payload);

			transactions.map((trx) => {
				// console.log(trx.landPrice.land.id);
				if (trx.landPrice.land.id === payload) {
					const { isDone, showStatus } = refactorTrx(trx);
					const res = {
						statusCode: 200,
						message: "",
					};
					if (!isDone) {
						res.statusCode = 401;

						if (showStatus === "VERIFY") {
							res.message = "masih verify";
						} else if (showStatus === "SURVEY") {
							res.message = "masih survey";
						} else if (showStatus === "CONFIRMATION") {
							res.message = "masih confirmation";
						} else {
							res.message = "masih payment";
						}

						throw new Error(res.message);
					}

					return res;
				}
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

const transactionSlice = createSlice({
	name: "transaction",
	initialState: {
		isLoading: false,
		onProgressTrx: [],
		doneTrx: [],
		transaction: {},
		transactions: [],
	},
	reducers: {
		selectedTrx: (state, { payload }) => {
			state.transaction = payload;
		},
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

		builder.addCase(getAllTransactionAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			getAllTransactionAction.fulfilled,
			(state, { payload }) => {
				const { done, onProgress } = separateTrxByStatus(payload);
				state.doneTrx = done;
				state.onProgressTrx = onProgress;
				state.transactions = [...done, ...onProgress];
				console.log("TRANSACTIONSSS = ", state.transactions);
				console.log("ON PRGESS = ", state.onProgressTrx);
				console.log("DONEEE = ", state.doneTrx);
				state.isLoading = false;
			}
		);
		builder.addCase(getAllTransactionAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { selectedTrx } = transactionSlice.actions;
export default transactionSlice;
