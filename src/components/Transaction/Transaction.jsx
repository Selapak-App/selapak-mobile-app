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

const Tab = createMaterialTopTabNavigator();

const CardComponent = ({ item }) => {
	console.log("ITEM _____: ", item);
	const color =
		item.status === "VERIFY"
			? colors.accent
			: item.status === "SURVEY"
			? colors.primary
			: item.status === "CONFIRMATION"
			? colors.secondary
			: colors.primaryDark;

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
	});

	return (
		<TouchableOpacity onPress={() => openDetail(item)} activeOpacity={0.9}>
			<Surface
				style={{
					...styles.card,
					backgroundColor: color,
					borderColor: color,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						gap: 20,
						backgroundColor: "white",
						borderRadius: 20,
					}}
				>
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
					<View
						style={{
							justifyContent: "space-between",
							flex: 1,
							gap: 20,
						}}
					>
						{/* <View style={{justifyContent: "space-between", flexDirection: "row"}}> */}
						<Text
							style={{
								fontFamily: "PoppinsSemiBold",
								fontSize: 20,
							}}
						>
							{item.businessName}
						</Text>
						{/* <Tag text={item.status} /> */}
						{/* </View> */}
						<Text style={styles.text}>{item.address}</Text>
					</View>
				</View>
				<View
					style={{
						justifyContent: "center",
						padding: 5,
						alignItems: "center",
					}}
				>
					<Text style={{ ...styles.textMedWhite, marginTop: 2 }}>
						{item.status}
					</Text>
				</View>
			</Surface>
		</TouchableOpacity>
	);
};

const OnProcessComp = () => {
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
	const navigation = useNavigation();

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
			marginVertical: 30,
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
					<Text style={styles.h1}>Transaksi Anda</Text>
					<Text style={styles.tagline}>
						Lihat daftar transaksi dan beri action untuk proses
						selanjutnya
					</Text>
				</View>
				<Tab.Navigator screenOptions={{
					tabBarLabelStyle: {
						fontFamily: "PoppinsMedium",
					}
				}}>
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
