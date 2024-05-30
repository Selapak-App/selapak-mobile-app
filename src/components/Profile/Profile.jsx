import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, List, Surface, useTheme } from "react-native-paper";
import Header from "../reusables/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../assets/images";
import {
	Octicons,
	MaterialIcons,
	MaterialCommunityIcons,
	Foundation,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../app/feature/profile/profileSlice";
import {
	capitalizeEachWords,
	separateFourChar,
} from "../../utils/profile/formatString";
import { StatusBar } from "expo-status-bar";
import { logoutAction } from "../../app/feature/auth/authSlice";
import Popup from "../reusables/Popup";

const Profile = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const { width, height } = Dimensions.get("window");
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.profile);
	const [message, setMessage] = useState("");
	const [visibility, setVisibility] = useState(false);
	const { isLoading } = useSelector((state) => state.auth);
	const { doneTrx, onProgressTrx } = useSelector(state => state.transaction)

	useEffect(() => {
		dispatch(getProfileAction());
	}, [dispatch]);

	const handleLogout = async () => {
		const res = await dispatch(logoutAction());

		if (!res.error) {
			navigation.navigate("Login");
		} else {
			setMessage(res.payload.message);
			setVisibility(true);
		}
	};

	const styles = StyleSheet.create({
		page: {
			backgroundColor: theme.colors.primary,
		},
		text: {
			fontFamily: "Poppins",
			fontSize: 14,
		},
		scrollView: {
			backgroundColor: theme.colors.primary,
			paddingTop: insets.top,
		},
		headerArea: {
			height: height * 0.25,
			justifyContent: "center",
			alignItems: "center",
		},
		imgContainer: {
			width: 90,
			height: 90,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 45,
			marginBottom: 15,
		},
		img: { height: 50, width: 50 },
		headerDivider: {
			width: width * 0.7,
			height: 1,
			backgroundColor: "white",
		},

		headerName: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 28,
			color: "white",
		},
		headerNik: {
			fontFamily: "monospace",
			fontSize: 16,
			marginTop: 12,
			color: "white",
			fontWeight: "800",
		},
		main: {
			minHeight: height * 0.75,
			gap: 20,
			borderRadius: theme.roundness * 2,
			backgroundColor: "white",
			padding: 20,
		},
		card: {
			flex: 1,
			backgroundColor: theme.colors.secondary,
			borderRadius: theme.roundness,
			padding: 10,
			height: 120,
			gap: 10,
			justifyContent: "space-between",
			flexDirection: "row",
		},
		cardCount: {
			fontSize: 100,
			fontFamily: "PoppinsMedium",
			color: "white",
			lineHeight: 120,
		},
		cardContent: {
			flex: 1,
			justifyContent: "space-between",
			alignItems: "flex-end",
		},
		accordionContainer: {
			borderRadius: theme.roundness,
			borderColor: theme.colors.primary,
			borderWidth: 1,
			padding: 10,
		},
		borderRadius: { borderRadius: theme.roundness },
		marginL30: { marginLeft: 30 },
		menuContainer: { gap: 20, padding: 10, paddingBottom: 50 },
		mainDivider: {
			width: "100%",
			height: 1,
			backgroundColor: theme.colors.accent,
			marginHorizontal: "auto",
			marginTop: 10,
		},
		menu: { flexDirection: "row", gap: 10 },
		marginLAuto: { marginLeft: "auto" },
		flex1: { flex: 1 },
	});

	return (
		<>
			<StatusBar backgroundColor={theme.colors.primary} style="light" />
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerArea}>
					<Surface style={styles.imgContainer}>
						<Image source={images.icon} style={styles.img} />
					</Surface>
					<Text style={styles.headerName}>
						{profile.fullName ? capitalizeEachWords(profile.fullName) : "-"}
					</Text>
					<View style={styles.headerDivider} />
					<Text style={styles.headerNik}>
						{profile.nik ? separateFourChar(profile.nik) : "-"}
					</Text>
				</View>
				<View style={styles.main}>
					<View style={{ flexDirection: "row", gap: 20 }}>
						<TouchableOpacity
							activeOpacity={0.9}
							style={styles.flex1}
						>
							<View style={styles.card}>
								<Text style={styles.cardCount}>{doneTrx.length || "0"}</Text>
								<View style={styles.cardContent}>
									<MaterialCommunityIcons
										name="file-check-outline"
										size={38}
										color="white"
									/>
									<Text
										style={{
											...styles.text,
											textAlign: "right",
											color: "white",
										}}
									>
										Transaksi Selesai
									</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.9}
							style={styles.flex1}
						>
							<View
								style={{
									...styles.card,
									backgroundColor: theme.colors.primary,
								}}
							>
								<Text style={styles.cardCount}>{onProgressTrx.length || 0}</Text>
								<View style={styles.cardContent}>
									<MaterialCommunityIcons
										name="file-clock-outline"
										size={38}
										color="white"
									/>
									<Text
										style={{
											...styles.text,
											textAlign: "right",
											color: "white",
										}}
									>
										Transaksi Berjalan
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					<View style={styles.accordionContainer}>
						<List.Accordion
							title="Biodata Pengguna"
							left={(props) => (
								<List.Icon {...props} icon="account" />
							)}
							titleStyle={{ fontFamily: "PoppinsMedium" }}
							style={styles.borderRadius}
							rippleColor="white"
						>
							<List.Item
								title={profile.email}
								titleStyle={styles.text}
								style={{ borderRadius: theme.roundness }}
								left={(props) => (
									<List.Icon
										{...props}
										style={styles.marginL30}
										icon="email-open"
									/>
								)}
							/>
							<List.Item
								title={
									profile.phoneNumber
										? separateFourChar(profile.phoneNumber)
										: "-"
								}
								titleStyle={styles.text}
								style={{ borderRadius: theme.roundness }}
								left={(props) => (
									<List.Icon
										{...props}
										style={styles.marginL30}
										icon="phone"
									/>
								)}
							/>
							<List.Item
								title={
									profile.gender === "MALE"
										? "Laki-laki"
										: profile.gender === "FEMALE"
										? "Perempuan"
										: "Tidak Teridentifikasi"
								}
								titleStyle={styles.text}
								style={{ borderRadius: theme.roundness }}
								left={(props) => (
									<List.Icon
										{...props}
										style={styles.marginL30}
										icon={
											profile.gender === "MALE"
												? "gender-male"
												: profile.gender === "FEMALE"
												? "gender-female"
												: "circle-outline"
										}
									/>
								)}
							/>
							<List.Item
								title={profile.address || "-"}
								titleStyle={styles.text}
								titleNumberOfLines={5}
								style={{ borderRadius: theme.roundness }}
								left={(props) => (
									<List.Icon
										{...props}
										style={styles.marginL30}
										icon="map-marker"
									/>
								)}
							/>
						</List.Accordion>
					</View>

					<View style={styles.menuContainer}>
						<View style={styles.mainDivider} />
						<TouchableOpacity activeOpacity={0.6}>
							<View style={styles.menu}>
								<Octicons
									name="organization"
									size={22}
									color="black"
								/>
								<Text style={{ ...styles.text, fontSize: 16 }}>
									Tentang Kami
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color="black"
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6}>
							<View style={styles.menu}>
								<Octicons
									name="id-badge"
									size={22}
									color="black"
								/>
								<Text style={{ ...styles.text, fontSize: 16 }}>
									Gabung Mitra Lapak
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color="black"
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6}>
							<View style={styles.menu}>
								<Octicons name="info" size={22} color="black" />
								<Text style={{ ...styles.text, fontSize: 16 }}>
									FAQ
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color="black"
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>

						<View style={styles.mainDivider} />

						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => navigation.navigate("UpdateProfile")}
						>
							<View style={styles.menu}>
								<MaterialCommunityIcons
									name="file-document-edit-outline"
									size={22}
									color="black"
								/>
								<Text style={{ ...styles.text, fontSize: 16 }}>
									Update Profil
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color="black"
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() =>
								navigation.navigate("UpdatePassword")
							}
						>
							<View style={styles.menu}>
								<Octicons name="lock" size={22} color="black" />
								<Text style={{ ...styles.text, fontSize: 16 }}>
									Ubah Password
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color="black"
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleLogout}
							activeOpacity={0.6}
						>
							<View style={styles.menu}>
								<Octicons
									name="sign-out"
									size={22}
									color={theme.colors.error}
								/>
								<Text style={{ ...styles.text, color: theme.colors.error, fontSize: 16 }}>
									Keluar
								</Text>
								<MaterialIcons
									name="keyboard-arrow-right"
									size={22}
									color={theme.colors.error}
									style={styles.marginLAuto}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
			<Popup
				type={"warning"}
				message={message}
				setVisibility={setVisibility}
				visibility={visibility}
			/>
		</>
	);
};

export default Profile;
