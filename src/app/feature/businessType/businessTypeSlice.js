import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BusinessTypeService } from "../../../service/businessTypeService";

const { getAll } = BusinessTypeService();

export const getTypeAction = createAsyncThunk(
	"type/getAll",
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

const businessTypeSlice = createSlice({
	name: "type",
	initialState: {
		isLoading: false,
        types: []
	},
	extraReducers: (builder) => {
		builder.addCase(getTypeAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTypeAction.fulfilled, (state, { payload }) => {
            state.types = payload
			state.isLoading = false;
		});
		builder.addCase(getTypeAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default businessTypeSlice;
