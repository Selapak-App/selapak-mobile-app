import {
	Dimensions,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../assets/images";
import Header from "../reusables/Header";
import { useNavigation } from "@react-navigation/native";

const LandingVerify = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const { width, height } = Dimensions.get("screen");
	const [timer, setTimer] = useState(10);
	const [isActive, setIsActive] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		if (isActive) {
			const interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isActive]);

	useEffect(() => {
		if (timer === 0) {
			setIsActive(false);
			navigation.navigate("App")
		}
	}, [timer]);

	const styles = StyleSheet.create({
		page: {
			minHeight: height,
			padding: 20,
		},
		container: {
			minHeight: height - 20 - insets.bottom - insets.top,
			gap: 15,
			justifyContent: "center",
			alignItems: "center",
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
		},
		header: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 26,
			textAlign: "center",
			color: theme.colors.primary,
		},
		image: { width: 300, height: 327 },
		text: {
			fontFamily: "Poppins",
			color: "white",
			fontSize: 16,
		},
		textBold: { fontFamily: "PoppinsSemiBold" },
	});

	const LayoutComponent = () => {
		return (
			<View style={styles.container}>
				<Image
					source={images.verifying}
					style={styles.image}
				/>
				<Header
					header={"Pengajuan Berhasil"}
					tagline={
						"Admin akan memproses pengajuan dan melakukan verifikasi sesuai datamu"
					}
					textAlign="center"
					textColor={"white"}
				/>
				<Text style={styles.text}>
					{timer === 0 ? "Mengalihkan ..." : `Pengalihan otomatis pada ${timer} detik`}
				</Text>
			</View>
		);
	};

	return (
		<ImageBackground
			source={images.background}
		>
			<StatusBar style="light" />
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={styles.page}
				showsVerticalScrollIndicator={false}
			/>
		</ImageBackground>
	);
};

export default LandingVerify;
