import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import Router from "./src/routes/Router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
		PoppinsItalic: require("./assets/fonts/Poppins-Italic.ttf"),
		PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
		PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsSemiBoldItalic: require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
		PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
		Inter: require("./assets/fonts/Inter-Regular.otf"),
		InterBold: require("./assets/fonts/Inter-Bold.otf"),
		Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
		MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
		MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: "#FBA834",
			secondary: "#387ADF",
			accent: "#50C4ED",
			dark: "#2f2d2d",
			lightGray: "#fbfbfb",
			primaryDark: "#333A73",
		},
		roundness: 20,
	};

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<StatusBar style="white" />
				<Router />
			</PaperProvider>
		</SafeAreaProvider>
	);
}
