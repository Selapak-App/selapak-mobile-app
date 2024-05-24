import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import { Surface, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import dummyOnProgressTrx from "../../data/dummyOnProgressTrx";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../../assets/colors";
import Header from "../reusables/Header";

const Tab = createMaterialTopTabNavigator();

const OnProcessComp = () => {
	const navigation = useNavigation();

	const CardComponent = ({ item }) => {
		const color =
			item.status === "VERIFY"
				? colors.accent
				: item.status === "SURVEY"
				? colors.primary
				: item.status === "CONFIRMATION"
				? colors.secondary
				: colors.primaryDark;

		const openDetail = () => navigation.navigate("Profile");

		const styles = StyleSheet.create({
			card: {
				borderWidth: 1,
				borderRadius: 22,
				marginBottom: 20,
			},
			cardCover: {
				objectFit: "cover",
				aspectRatio: 1,
				width: 100,
				height: 100,
				borderRadius: 20,
			},
			text: { fontFamily: "Poppins", fontSize: 14 },
			textMedWhite: {
				fontFamily: "PoppinsMedium",
				fontSize: 14,
				color: "white",
			},
			spaceBetween: { justifyContent: "space-between" },
			flex1: { flex: 1 },
			cardContent: {
				flexDirection: "row",
				padding: 10,
				gap: 20,
				backgroundColor: "white",
				borderRadius: 20,
			},
			cardContainer: {
				justifyContent: "space-between",
				flex: 1,
				gap: 20,
			},
			cardTitle: {
				fontFamily: "PoppinsSemiBold",
				fontSize: 20,
			},
			cardFooter: {
				justifyContent: "center",
				padding: 5,
				alignItems: "center",
			},
		});

		return (
			<TouchableOpacity
				onPress={() => openDetail(item)}
				activeOpacity={0.9}
			>
				<Surface
					style={{
						...styles.card,
						backgroundColor: color,
						borderColor: color,
					}}
				>
					<View style={styles.cardContent}>
						<Surface
							style={{
								width: 100,
								height: 100,
								borderRadius: 20,
							}}
						>
							<Image
								source={{ uri: item.imageURL }}
								style={styles.cardCover}
							/>
						</Surface>
						<View style={styles.cardContainer}>
							<Text style={styles.cardTitle}>
								{item.businessName}
							</Text>
							<Text style={styles.text}>{item.address}</Text>
						</View>
					</View>
					<View style={styles.cardFooter}>
						<Text style={{ ...styles.textMedWhite, marginTop: 2 }}>
							{item.status}
						</Text>
					</View>
				</Surface>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 20,
				backgroundColor: "white",
			}}
		>
			{/* {lands.length === 0 ? (
					<Text>No Data</Text>
				) : ( */}
			<FlatList
				data={dummyOnProgressTrx}
				keyExtractor={(item) => item.id}
				renderItem={CardComponent}
				style={{ flex: 1 }}
			/>
			{/* )} */}
		</View>
	);
};

const Transaction = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		container: {
			paddingTop: insets.top,
			backgroundColor: "white",
			flexGrow: 1,
		},
		wrapper: {
			backgroundColor: "white",
			flex: 1,
			paddingTop: insets.top,
		},
		head: {
			paddingHorizontal: 20,
		},
		card: {
			borderWidth: 1,
			borderRadius: theme.roundness + 2,
			marginBottom: 20,
		},
		cardCover: {
			objectFit: "cover",
			aspectRatio: 1,
			width: 100,
			height: 100,
			borderRadius: theme.roundness,
		},
		text: { fontFamily: "Poppins", fontSize: 14 },
		textMedWhite: {
			fontFamily: "PoppinsMedium",
			fontSize: 14,
			color: "white",
		},
		spaceBetween: { justifyContent: "space-between" },
		flex1: { flex: 1 },
	});

	const ComponentLayout = () => {
		return (
			<>
				<View style={styles.head}>
					<Header
						header="Transaksi Anda"
						tagline="Lihat daftar transaksi dan beri action untuk proses selanjutnya"
					/>
				</View>
				<Tab.Navigator
					screenOptions={{
						tabBarLabelStyle: {
							fontFamily: "PoppinsMedium",
						},
					}}
				>
					<Tab.Screen name="On Process" component={OnProcessComp} />
					<Tab.Screen name="Done" component={OnProcessComp} />
				</Tab.Navigator>
			</>
		);
	};

	return (
		<>
			<FlatList
				data={[{}]}
				renderItem={ComponentLayout}
				contentContainerStyle={styles.container}
				style={{ flex: 1 }}
			/>
		</>
	);
};

export default Transaction;
