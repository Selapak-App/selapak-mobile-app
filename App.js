import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";

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
			primary: "#387ADF",
			secondary: "#FBA834",
			accent: "#50C4ED",
			dark: "#2f2d2d",
			primaryDark: "#333A73"
		}
	}

	return (
		<PaperProvider theme={theme}>
			<View style={styles.container}>
				<Text style={{ fontFamily: "MontserratBold", color: theme.colors.secondary }}>
					Open up App.js to start working on your app!
				</Text>
				<StatusBar style="auto" />
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
