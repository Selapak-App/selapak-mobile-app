import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import businessTypeSlice from "./feature/businessType/businessTypeSlice";
import rentPeriodSlice from "./feature/rentPeriod/rentPeriodSlice";
import landSlice from "./feature/land/landSlice";
import transactionSlice from "./feature/transaction/transactionSlice";
import profileSlice from "./feature/profile/profileSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		type: businessTypeSlice.reducer,
		period: rentPeriodSlice.reducer,
		land: landSlice.reducer,
		transaction: transactionSlice.reducer,
		profile: profileSlice.reducer,
	},
});

export default store;
