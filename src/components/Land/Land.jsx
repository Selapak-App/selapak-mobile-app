import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import dummyData from "../../data/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { getLandAction, selectedLand } from "../../app/feature/land/landSlice";
import Tag from "../reusables/Tag";
import Header from "../reusables/Header";

const Land = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { lands } = useSelector((state) => state.land);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLandAction());
	}, [dispatch]);

	const openDetail = async (data) => {
		dispatch(selectedLand(data));
		navigation.navigate("LandDetail");
	};

	const styles = StyleSheet.create({
		container: {
			paddingHorizontal: 20,
			paddingTop: insets.top,
			backgroundColor: "white",
			flexGrow: 1,
		},
		wrapper: {
			backgroundColor: "white",
			flex: 1,
			paddingTop: insets.top,
			paddingHorizontal: 20,
		},
		card: {
			borderWidth: 1,
			borderColor: theme.colors.primary,
			width: "48%",
			borderRadius: theme.roundness + 2,
			marginBottom: 20,
		},
		cardCover: {
			objectFit: "cover",
			aspectRatio: 1,
			borderRadius: theme.roundness,
		},
		slotArea: {
			position: "absolute",
			bottom: 12,
			right: 12,
		},
		cardBody: { padding: 15, flex: 1, gap: 5 },
		cardBodyContainer: { flexDirection: "row", gap: 10 },
		dot: { paddingTop: 5 },
		district: {
			fontSize: 18,
			fontFamily: "PoppinsSemiBold",
			color: theme.colors.dark,
		},
		cardContent: {
			justifyContent: "space-between",
			flex: 1,
			gap: 30,
		},
		price: {
			fontSize: 16,
			fontFamily: "PoppinsSemiBold",
			color: theme.colors.dark,
		},
		normalText: { fontFamily: "Poppins", fontSize: 14 },
		spaceBetween: { justifyContent: "space-between" },
		flex1: { flex: 1 },
	});

	const CardComponent = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => openDetail(item)}
				activeOpacity={0.9}
				style={styles.card}
			>
				<View>
					<Image
						source={{ uri: item.landPhotos[0].imageURL }}
						style={styles.cardCover}
					/>
					<View style={styles.slotArea}>
						<Tag text={item.slotArea} />
					</View>
				</View>
				<View style={styles.cardBody}>
					<View style={styles.cardBodyContainer}>
						<View style={styles.dot}>
							<FontAwesome6
								name="location-dot"
								size={18}
								color={theme.colors.primary}
							/>
						</View>
						<Text style={styles.district}>{item.district}</Text>
					</View>
					<View style={styles.cardContent}>
						<Text numberOfLines={2}>
							{item.description.map((desc) => (
								<Text key={desc}>
									{"-  "}
									{desc + "\n"}
								</Text>
							))}
						</Text>

						<Text style={styles.price}>
							Rp.{" "}
							{new Intl.NumberFormat("ID").format(
								item.landPrice.price
							)}
							<Text style={styles.normalText}> /bln</Text>
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const ComponentLayout = () => {
		return (
			<>
				<Header header={"Temukan Lapakmu!"} tagline={"Sewa lahan sesuai kebutuhanmu dengan mudah"} />
				{/* <View style={styles.head}>
					<Text style={styles.h1}>Temukan Lapakmu!</Text>
					<Text style={styles.tagline}>
						Sewa lahan sesuai kebutuhanmu dengan mudah
					</Text>
				</View> */}
				{lands.length === 0 ? (
					<Text>No Data</Text>
				) : (
					<FlatList
						data={lands.map((item) => ({
							...item,
							description: item.description.split("\n"),
						}))}
						keyExtractor={(item) => item.id}
						renderItem={CardComponent}
						numColumns={2}
						columnWrapperStyle={styles.spaceBetween}
						style={styles.flex1}
					/>
				)}
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

export default Land;
