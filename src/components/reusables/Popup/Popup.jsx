import { View, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";

const Popup = ({errorVisibility, setErrorVisibility, errorMessage}) => {
	return (
		<Snackbar
			visible={errorVisibility}
			onDismiss={() => setErrorVisibility(false)}
			style={{ marginBottom: 30, marginHorizontal: 20 }}
			action={{
				label: "Close",
				onPress: () => {
					setErrorVisibility(false);
				},
			}}
		>
			{errorMessage}
		</Snackbar>
	);
};

export default Popup;
