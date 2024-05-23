import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const Tag = ({ text }) => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: theme.colors.primary,
			borderRadius: theme.roundness,
			paddingHorizontal: 15,
            paddingTop: 2,
            height: 30
		},
		text: { fontFamily: "PoppinsMedium", color: "white", fontSize: 16 },
	});
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{text[0].toUpperCase() + text.slice(1).toLowerCase()}</Text>
		</View>
	);
};

export default Tag;
