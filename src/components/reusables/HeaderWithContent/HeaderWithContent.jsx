import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Divider from "../Divider/Divider";

const HeaderWithContent = ({ header, children }) => {
	const styles = StyleSheet.create({
		content: { paddingVertical: 20},
		headingText: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 20,
		},
	});

	return (
		<View>
			<Text style={styles.headingText}>{header}</Text>
			<Divider />
			<View style={styles.content}>{children}</View>
		</View>
	);
};

export default HeaderWithContent;
