import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Surface, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../reusables/Tag";
import {
	getAllTransactionAction,
	isOnProgressTrx,
} from "../../app/feature/transaction/transactionSlice";
import Popup from "../reusables/Popup";
import LottieAnimation from "../reusables/LottieAnimation";
import animations from "../../../assets/animations";
import { checkAllFilled } from "../../app/feature/profile/profileSlice";

const LandDetail = () => {
	const insets = useSafeAreaInsets();
	const theme = useTheme();
	const navigation = useNavigation();
	const { land } = useSelector((state) => state.land);
	const dispatch = useDispatch();

	// Popup
	const [message, setMessage] = useState(null);
	const [visibility, setVisibility] = useState(false);
	const [isError, setIsError] = useState(false);
	// const { isLoading } = useSelector((state) => state.transaction);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		dispatch(getAllTransactionAction());
	}, [dispatch]);

	const handleSubmission = async () => {
		setIsLoading(true);
		const profileRes = await dispatch(checkAllFilled());

		if (!profileRes.error) {
			const trxRes = await dispatch(isOnProgressTrx(land.id));
			if (!trxRes.error) {
				setIsLoading(false);
				setIsError(false);
				navigation.navigate("CreateTrxForm");
			} else {
				setIsError(true);
				setMessage(trxRes.payload.message);
				setVisibility(true);
				setIsLoading(false);
			}
		} else {
			setIsError(true);
			setMessage(profileRes.payload.message);
			setVisibility(true);
			setIsLoading(false);
		}
		setIsLoading(false);
	};

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
		slotArea: {
			marginStart: "auto",
		},
	});

	const ImageComponent = ({ item }) => {
		return (
			<Surface
				style={{
					borderRadius: theme.roundness,
					marginVertical: 10,
					backgroundColor: "white",
				}}
			>
				<Image source={{ uri: item.imageURL }} style={styles.image} />
			</Surface>
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
						data={land.landPhotos}
						horizontal={true}
						renderItem={ImageComponent}
						key={(item) => item.id}
						contentContainerStyle={styles.contentContainer}
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<View style={styles.dividerWrapper}>
						<View style={styles.divider} />
						<Text style={styles.textItalic}>
							{land.slotAvailable} Slot tersedia
						</Text>
						<View style={styles.slotArea}>
							<Tag text={`${land.slotArea}`} />
						</View>
					</View>
					<Text style={styles.price}>
						Rp.{" "}
						{new Intl.NumberFormat("ID").format(
							land.landPrice.price
						)}
						<Text style={styles.normalText}> /bulan</Text>
					</Text>
					<Text style={styles.normalText}>
						{`${land.address}, ${land.village}, ${land.district}, ${land.postalCode}`}
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
						{land.businessTypes.map((type) => (
							<Tag key={type.id} text={`${type.name}`} />
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
							{land.description.map((desc, index) => {
								if (index !== land.description.length - 1) {
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
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							...styles.button,
							padding: isLoading ? 11 : 15,
						}}
						onPress={handleSubmission}
					>
						{!isLoading ? (
							<Text style={styles.buttonText}>Ajukan Sewa</Text>
						) : (
							<LottieAnimation
								width={40}
								height={40}
								animation={animations.threeDots}
							/>
						)}
						{/* <Text style={styles.buttonText}>Ajukan Sewa</Text> */}
					</TouchableOpacity>
				</Surface>
			</View>

			<Popup
				message={message}
				visibility={visibility}
				setVisibility={setVisibility}
				type={isError ? "warning" : "success"}
			/>
		</View>
	);
};

export default LandDetail;
