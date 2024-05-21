import { View, Text } from "react-native";
import React from "react";
import { Snackbar, useTheme } from "react-native-paper";

const Popup = ({visibility, setVisibility, message, bgColor}) => {
	return (
		<Snackbar
			visible={visibility}
			onDismiss={() => setVisibility(false)}
			style={{ marginBottom: 30, marginHorizontal: 20, backgroundColor: bgColor || "black"  }}
			action={{
				label: "Close",
				style: {
					backgroundColor: "rgba(255,255,255,0.1)",
				},
				onPress: () => {
					setVisibility(false);
				},
			}}
		>
			{message}
		</Snackbar>
	);
};

export default Popup;
