import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Register = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		page: {
			backgroundColor: theme.colors.secondary,
			flex: 1,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
		},
	});

	return (
		<View style={styles.page}>
			<StatusBar style="dark" />
			<Text>Register</Text>
		</View>
	);
};

export default Register;
