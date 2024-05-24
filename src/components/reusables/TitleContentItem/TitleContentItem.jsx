import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TitleContentItem = ({ head, children }) => {
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "flex-start",
			gap: 20,
		},
		head: {
			flex: 0.3,
			fontFamily: "Poppins",
		},
		divider: { fontFamily: "Poppins" },
		content: {
			flex: 0.7,
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.head}>{head}</Text>
			<View style={styles.content}>{children}</View>
		</View>
	);
};

export default TitleContentItem;
