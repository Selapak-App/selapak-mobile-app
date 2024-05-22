import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Surface, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const LandDetail = () => {
	const route = useRoute();
	const insets = useSafeAreaInsets();
	const theme = useTheme();
	const navigation = useNavigation();

	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: "white",
			flex: 1,
			paddingTop: insets.top + 30,
			paddingBottom: 100,
			gap: 30,
		},
		head: {
			paddingHorizontal: 20,
			flexDirection: "column",
		},
		h1: {
			fontSize: 28,
			fontFamily: "PoppinsSemiBold",
			marginBottom: -5,
		},
		tagline: {
			fontFamily: "Poppins",
			fontSize: 16,
		},
		image: {
			height: 250,
			width: 350,
			borderRadius: theme.roundness,
		},
		contentContainer: {
			paddingHorizontal: 20,
			gap: 20,
		},
		textItalic: {
			fontFamily: "PoppinsItalic",
			fontSize: 16,
		},
		price: {
			fontSize: 24,
			fontFamily: "PoppinsSemiBold",
		},
		normalText: {
			fontSize: 16,
			fontFamily: "Poppins",
		},
		paddingH20: { paddingHorizontal: 20 },
		textBoldItalic: {
			fontSize: 16,
			fontFamily: "PoppinsSemiBoldItalic",
		},
		boxContainer: {
			borderRadius: theme.roundness,
			borderColor: theme.colors.primary,
			borderWidth: 1,
			padding: 15,
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 10,
		},
		typeItem: {
			backgroundColor: theme.colors.primary,
			borderRadius: theme.roundness,
			paddingBottom: 5,
			paddingTop: 7,
			paddingHorizontal: 15,
		},
		buttonContainer: {
			position: "absolute",
			bottom: 20,
			left: 0,
			width: "100%",
			paddingHorizontal: 20,
		},
		buttonBg: {
			backgroundColor: "white",
			borderRadius: theme.roundness,
		},
		button: {
			backgroundColor: theme.colors.secondary,
			borderRadius: theme.roundness,
			padding: 15,
			alignItems: "center",
		},
		buttonText: {
			color: "white",
			fontFamily: "PoppinsSemiBold",
			fontSize: 18,
		},
		dividerWrapper: { flexDirection: "row", alignItems: "center", gap: 10 },
		divider: {
			backgroundColor: theme.colors.primary,
			width: 30,
			height: 1,
		},
	});

	const ImageComponent = ({ item }) => {
		return (
			<View>
				<Image source={{ uri: item }} style={styles.image} />
			</View>
		);
	};

	const ComponentLayout = () => {
		return (
			<View style={styles.wrapper}>
				<View style={styles.head}>
					<Text style={styles.h1}>Pilihan Bagus!</Text>
					<Text style={styles.tagline}>
						Baca detail lapak dan ajukan sewa
					</Text>
				</View>

				<View>
					<FlatList
						data={route.params.uri}
						horizontal={true}
						renderItem={ImageComponent}
						key={(item) => item}
						contentContainerStyle={styles.contentContainer}
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<View style={styles.dividerWrapper}>
						<View style={styles.divider} />
						<Text style={styles.textItalic}>
							{route.params.availableSlot} Slot tersedia
						</Text>
					</View>
					<Text style={styles.price}>
						Rp.{" "}
						{new Intl.NumberFormat("ID").format(route.params.price)}
						<Text style={styles.normalText}> /bulan</Text>
					</Text>
					<Text style={styles.normalText}>
						{route.params.address + " " + route.params.postalCode}
					</Text>
				</View>

				<View style={styles.paddingH20}>
					<View style={styles.dividerWrapper}>
						<View style={styles.divider} />
						<Text style={styles.textBoldItalic}>
							Rekomendasi usaha
						</Text>
					</View>
					<View style={styles.boxContainer}>
						{route.params.types.map((type) => (
							<View key={type} style={styles.typeItem}>
								<Text
									style={{
										...styles.normalText,
										color: "white",
									}}
								>
									{type}
								</Text>
							</View>
						))}
					</View>
				</View>

				<View style={styles.paddingH20}>
					<View style={styles.dividerWrapper}>
						<View style={styles.divider} />
						<Text style={styles.textBoldItalic}>Deskripsi</Text>
					</View>
					<View style={styles.boxContainer}>
						<Text>
							{route.params.description.map((desc, index) => {
								if (
									index !==
									route.params.description.length - 1
								) {
									desc += "\n";
								}

								return (
									<Text key={desc} style={styles.normalText}>
										{"-  " + desc}
									</Text>
								);
							})}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style="white" backgroundColor="white" />
			<FlatList data={[{}]} renderItem={ComponentLayout} />

			<View style={styles.buttonContainer}>
				<Surface style={styles.buttonBg} elevation={3}>
					<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => navigation.navigate("CreateTrxForm")}>
						<Text style={styles.buttonText}>Ajukan Sewa</Text>
					</TouchableOpacity>
				</Surface>
			</View>
		</View>
	);
};

export default LandDetail;
