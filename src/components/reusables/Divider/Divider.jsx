import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const Divider = () => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		divider: {
			width: "100%",
			height: 0.5,
			backgroundColor: theme.colors.accent,
		},
	});

	return <View style={styles.divider} />;
};

export default Divider;
