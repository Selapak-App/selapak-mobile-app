import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const NoData = () => {
    const theme = useTheme();

	return (
		<View
			style={{
				height: 300,
				justifyContent: "center",
				alignItems: "center",
                gap: 30,
                opacity: 0.5,
			}}
		>
			<AntDesign name="closecircleo" size={72} color={theme.colors.accent} />
			<Text style={{fontFamily: "PoppinsSemiBold", fontSize: 32, color: theme.colors.accent}}>NoData</Text>
		</View>
	);
};

export default NoData;
