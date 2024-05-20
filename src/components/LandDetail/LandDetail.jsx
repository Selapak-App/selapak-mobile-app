import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, useTheme } from "react-native-paper";

const LandDetail = () => {
	const route = useRoute();
	const insets = useSafeAreaInsets();
	const theme = useTheme();

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
	});

	const ImageComponent = ({ item }) => {
		return (
			<View>
				<Image
					source={{ uri: item }}
					style={{
						height: 250,
						width: 350,
						borderRadius: theme.roundness,
					}}
				/>
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
						contentContainerStyle={{
							paddingHorizontal: 20,
							gap: 20,
						}}
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<Text
						style={{
							fontFamily: "PoppinsItalic",
							fontSize: 16,
						}}
					>
						{route.params.availableSlot} Slot tersedia
					</Text>
					<Text
						style={{
							fontSize: 24,
							fontFamily: "PoppinsSemiBold",
						}}
					>
						Rp.{" "}
						{new Intl.NumberFormat("ID").format(route.params.price)}
						<Text style={{ fontFamily: "Poppins", fontSize: 16 }}>
							{" "}
							/bulan
						</Text>
					</Text>
					<Text
						style={{
							fontFamily: "Poppins",
							fontSize: 16,
						}}
					>
						{route.params.address + " " + route.params.postalCode}
					</Text>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<Text
						style={{
							fontSize: 16,
							fontFamily: "PoppinsSemiBoldItalic",
						}}
					>
						Rekomendasi usaha
					</Text>
					<View
						style={{
							borderRadius: theme.roundness,
							borderColor: theme.colors.primary,
							borderWidth: 1,
							padding: 10,
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 10,
						}}
					>
						{route.params.types.map((type) => (
							<View
								key={type}
								style={{
									backgroundColor: theme.colors.primary,
									borderRadius: theme.roundness,
									paddingBottom: 5,
									paddingTop: 7,
									paddingHorizontal: 15,
								}}
							>
								<Text
									style={{
										fontFamily: "Poppins",
										fontSize: 16,
										color: "white",
									}}
								>
									{type}
								</Text>
							</View>
						))}
					</View>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<Text
						style={{
							fontSize: 16,
							fontFamily: "PoppinsSemiBoldItalic",
						}}
					>
						Deskripsi
					</Text>
					<View
						style={{
							borderRadius: theme.roundness,
							borderColor: theme.colors.primary,
							borderWidth: 1,
							padding: 10,
						}}
					>
						<Text>
							{route.params.description.map((desc, index) => {
								if (
									index !==
									route.params.description.length - 1
								) {
									desc += "\n";
								}

								return (
									<Text
										key={desc}
										style={{
											fontFamily: "Poppins",
											fontSize: 16,
										}}
									>
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
			<FlatList data={[{}]} renderItem={ComponentLayout} />

			<View
				style={{
					position: "absolute",
					bottom: 20,
					left: 0,
					width: "100%",
					paddingHorizontal: 20,
				}}
			>
				<View
					style={{
						backgroundColor: "white",
						borderRadius: theme.roundness,
					}}
				>
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							backgroundColor: theme.colors.secondary,
							borderRadius: theme.roundness,
							padding: 15,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "PoppinsSemiBold",
								fontSize: 18,
							}}
						>
							Ajukan Sewa
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default LandDetail;
