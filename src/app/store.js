import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import businessTypeSlice from "./feature/businessType/businessTypeSlice";
import rentPeriodSlice from "./feature/rentPeriod/rentPeriodSlice";
import landSlice from "./feature/land/landSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		type: businessTypeSlice.reducer,
		period: rentPeriodSlice.reducer,
		land: landSlice.reducer,
	},
});

export default store;
