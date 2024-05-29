import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect } from "react";
import { Surface, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import dummyOnProgressTrx from "../../data/dummyOnProgressTrx";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../../assets/colors";
import Header from "../reusables/Header";
import {
	getAllTransactionAction,
	selectedTrx,
} from "../../app/feature/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import formatAddress from "../../utils/lands/formatAddress";
import NoData from "../reusables/NoData/NoData";

const Tab = createMaterialTopTabNavigator();

const DoneComp = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { doneTrx } = useSelector((state) => state.transaction);

	const CardComponent = ({ item }) => {
		const address = formatAddress(item.landPrice.land);
		const color =
			item.paymentStatus === "PAID"
				? colors.secondary
				: colors.error;

		const openDetail = () => {
			dispatch(selectedTrx(item));
			navigation.navigate("TransactionDetail");
		};

		console.log(item);

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
			<TouchableOpacity onPress={openDetail} activeOpacity={0.9}>
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
								source={{
									uri: item.landPrice.land.landPhotos[0]
										.imageURL,
								}}
								style={styles.cardCover}
							/>
						</Surface>
						<View style={styles.cardContainer}>
							<Text style={styles.cardTitle}>
								{item.business.businessName}
							</Text>
							<Text style={styles.text}>{address}</Text>
						</View>
					</View>
					<View style={styles.cardFooter}>
						<Text style={{ ...styles.textMedWhite, marginTop: 2 }}>
							{item.paymentStatus === "PAID" ? "BERHASIL" : "GAGAL"}
						</Text>
					</View>
				</Surface>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				backgroundColor: "white",
				flex: 1,
			}}
		>
			{doneTrx.length === 0 ? (
				<NoData />
			) : (
				<FlatList
					data={doneTrx}
					keyExtractor={(item) => item.id}
					renderItem={CardComponent}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1, padding: 20 }}
				/>
			)}
		</View>
	);
};

const OnProcessComp = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { onProgressTrx, isLoading } = useSelector(
		(state) => state.transaction
	);

	// useEffect(() => {
	// 	dispatch(getAllTransactionAction());
	// 	console.log("ON PROGRESS", onProgressTrx);
	// }, [dispatch]);

	const CardComponent = ({ item }) => {
		const address = formatAddress(item.landPrice.land);
		const color =
			item.showStatus === "VERIFY"
				? colors.accent
				: item.showStatus === "SURVEY"
				? colors.secondary
				: item.showStatus === "CONFIRMATION"
				? colors.primary
				: colors.primaryDark;

		const openDetail = () => {
			dispatch(selectedTrx(item));
			navigation.navigate("TransactionDetail");
		};

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
			<TouchableOpacity onPress={openDetail} activeOpacity={0.9}>
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
								source={{
									uri: item.landPrice.land.landPhotos[0]
										.imageURL,
								}}
								style={styles.cardCover}
							/>
						</Surface>
						<View style={styles.cardContainer}>
							<Text style={styles.cardTitle}>
								{item.business.businessName}
							</Text>
							<Text style={styles.text}>{address}</Text>
						</View>
					</View>
					<View style={styles.cardFooter}>
						<Text style={{ ...styles.textMedWhite, marginTop: 2 }}>
							{item.showStatus}
						</Text>
					</View>
				</Surface>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				backgroundColor: "white",
				flex: 1,
			}}
		>
			{/* {isLoading ? (
				<Text>LOADING ...</Text>
			) :  */}

			{onProgressTrx.length === 0 ? (
				<NoData />
			) : (
				<FlatList
					data={onProgressTrx}
					keyExtractor={(item) => item.id}
					renderItem={CardComponent}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1, padding: 20 }}
				/>
			)}
		</View>
	);
};

const Transaction = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTransactionAction());
	}, [dispatch]);

	const styles = StyleSheet.create({
		container: {
			paddingTop: insets.top,
			backgroundColor: "white",
			flexGrow: 1,
		},
		head: {
			backgroundColor: "white",
			paddingTop: insets.top,
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
				<Tab.Screen name="Done" component={DoneComp} />
			</Tab.Navigator>
		</>
	);
};

export default Transaction;
