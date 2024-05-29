import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const NoData = ({message}) => {
    const theme = useTheme();

	return (
		<View
			style={{
				height: 300,
				justifyContent: "center",
				alignItems: "center",
                gap: 20,
                opacity: 0.5,
			}}
		>
			<AntDesign name="closecircleo" size={72} color={theme.colors.accent} />
			<Text style={{fontFamily: "PoppinsSemiBold", fontSize: 18, color: theme.colors.accent}}>{message}</Text>
		</View>
	);
};

export default NoData;
