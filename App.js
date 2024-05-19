import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import Router from "./src/routes/Router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
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
			primaryDark: "#333A73",
		},
		roundness: 15,
	};

	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<Router />
			</PaperProvider>
		</SafeAreaProvider>
	);
}
