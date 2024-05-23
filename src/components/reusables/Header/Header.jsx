import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = ({header, tagline, textColor = "black", textAlign = "left"}) => {
	const styles = StyleSheet.create({
		head: {
			marginVertical: 30,
			flexDirection: "column",
		},
		h1: {
			fontSize: 28,
			fontFamily: "PoppinsSemiBold",
			marginBottom: -5,
			color: textColor,
			textAlign: textAlign,
		},
		tagline: {
			fontFamily: "Poppins",
			fontSize: 16,
			color: textColor,
			textAlign: textAlign,
		}
    });

	return (
		<View style={styles.head}>
			<Text style={styles.h1}>{header}</Text>
			<Text style={styles.tagline}>
				{tagline}
			</Text>
		</View>
	);
};

export default Header;
