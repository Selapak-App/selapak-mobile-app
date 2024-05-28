import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { RadioButton, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import images from "../../../../assets/images";
import {
	MaterialCommunityIcons,
	Octicons,
	MaterialIcons,
	AntDesign,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../reusables/Header";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../utils/profile/formatString";
import { updateProfileAction } from "../../../app/feature/profile/profileSlice";
import Popup from "../../reusables/Popup";
import LottieAnimation from "../../reusables/LottieAnimation";
import animations from "../../../../assets/animations";

const schema = yup
	.object({
		fullName: yup.string().required("Nama lengkap tidak boleh kosong"),
		gender: yup.string().default("MALE"),
		phoneNumber: yup
			.string()
			.min(11, "No. Telepon minimal 11 karakter")
			.max(15, "No. Telepon maksimal 15 karakter")
			.matches(/^(\+62)\d{8,12}$/, "Nomor telepon harus sesuai format")
			.required("Email tidak boleh kosong"),
		nik: yup
			.string()
			.matches(/^\d{16}$/, "NIK harus berupa 16 angka")
			.required("NIK tidak boleh kosong"),
		address: yup.string().required("Alamat tidak boleh kosong"),
	})
	.required();

const UpdateProfile = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const { height, width } = Dimensions.get("window");
	const { profile, isLoading } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");
	const [visibility, setVisibility] = useState(false);

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: profile.fullName || "",
			gender: profile.gender || "",
			phoneNumber: profile.phoneNumber
				? formatPhoneNumber(profile.phoneNumber)
				: "",
			nik: profile.nik || "",
			address: profile.address || "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async () => {
		const data = getValues();
		const res = await dispatch(updateProfileAction(data));

		if (!res.error) {
			navigation.navigate("App");
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
			height: height * 0.2,
			paddingHorizontal: 30,
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
			minHeight: height * 0.8,
			gap: 20,
			borderTopLeftRadius: theme.roundness * 2,
			borderTopRightRadius: theme.roundness * 2,
			backgroundColor: "white",
			padding: 40,
		},
		form: {
			gap: 14,
			width: "100%",
		},
		forgetPass: { color: theme.colors.dark, fontFamily: "Poppins" },
		flexEnd: { alignSelf: "flex-end" },
		showPassword: {
			position: "absolute",
			right: 20,
			paddingTop: 5,
		},
		textError: {
			fontFamily: "Poppins",
			color: theme.colors.error,
			marginTop: 5,
		},
		buttonWraper: {
			width: "100%",
			gap: 14,
			marginTop: 30,
			flexDirection: "row",
			position: "absolute",
			bottom: 40,
			left: 40,
			right: 40,
		},
		buttonContainer: {
			backgroundColor: theme.colors.secondary,
			borderRadius: theme.roundness,
			alignItems: "center",
			padding: 15,
			flex: 1,
		},
		buttonText: {
			color: "white",
			fontFamily: "PoppinsMedium",
			fontSize: 16,
		},
		btnBack: {
			borderRadius: theme.roundness,
			padding: 15,
			borderWidth: 2,
			borderColor: theme.colors.primary,
		},
		textWrapper: { fontFamily: "Poppins", textAlign: "center" },
		radioGroup: { flexDirection: "row", gap: 10 },
		radioButton: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
		},
	});

	const LayoutComponent = () => {
		return (
			<>
				<View style={styles.headerArea}>
					<Header
						header="Perbarui Profil"
						tagline="Pastikan informasi profil Anda valid dan up-to-date"
						textAlign="center"
						textColor="white"
					/>
				</View>
				<View style={styles.main}>
					<View style={styles.form}>
						<View>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<TextInput
										label="Nama Lengkap"
										mode="outlined"
										outlineColor={theme.colors.secondary}
										onBlur={onBlur}
										value={value}
										onChangeText={(event) =>
											onChange(event)
										}
										error={errors.fullName}
									/>
								)}
								name="fullName"
							/>

							{errors.fullName && (
								<Text style={styles.textError}>
									* {errors.fullName.message}
								</Text>
							)}
						</View>

						<View>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<TextInput
										label="NIK"
										mode="outlined"
										outlineColor={theme.colors.secondary}
										onBlur={onBlur}
										value={value}
										onChangeText={(event) =>
											onChange(event)
										}
										error={errors.nik}
										keyboardType="numeric"
									/>
								)}
								name="nik"
							/>

							{errors.nik && (
								<Text style={styles.textError}>
									* {errors.nik.message}
								</Text>
							)}
						</View>

						<View>
							<TextInput
								label="Email"
								mode="outlined"
								outlineColor={theme.colors.secondary}
								value={profile.email}
								disabled
							/>
						</View>

						<View
							style={{
								borderRadius: theme.roundness,
								borderWidth: 1,
								borderColor: theme.colors.secondary,
								padding: 10,
								marginTop: 5,
							}}
						>
							<Text
								style={{
									fontFamily: "PoppinsMedium",
									fontSize: 16,
								}}
							>
								Jenis Kelamin
							</Text>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<RadioButton.Group
										onValueChange={(newValue) =>
											onChange(newValue)
										}
										value={value}
									>
										<View style={styles.radioGroup}>
											<View style={styles.radioButton}>
												<RadioButton
													value="MALE"
													status="checked"
												/>
												<Text
													style={styles.textWrapper}
												>
													Male
												</Text>
											</View>
											<View style={styles.radioButton}>
												<RadioButton value="FEMALE" />
												<Text
													style={styles.textWrapper}
												>
													Female
												</Text>
											</View>
										</View>
									</RadioButton.Group>
								)}
								name="gender"
							/>

							{errors.gender && (
								<Text style={styles.textError}>
									* {errors.gender.message}
								</Text>
							)}
						</View>

						<View>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<TextInput
										label="No. Telepon"
										mode="outlined"
										outlineColor={theme.colors.secondary}
										onBlur={onBlur}
										value={value}
										onChangeText={(event) =>
											onChange(formatPhoneNumber(event))
										}
										error={errors.phoneNumber}
										keyboardType="numeric"
									/>
								)}
								name="phoneNumber"
							/>

							{errors.phoneNumber && (
								<Text style={styles.textError}>
									* {errors.phoneNumber.message}
								</Text>
							)}
						</View>

						<View>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<TextInput
										label="Alamat"
										mode="outlined"
										outlineColor={theme.colors.secondary}
										onBlur={onBlur}
										value={value}
										onChangeText={(event) =>
											onChange(event)
										}
										error={errors.address}
									/>
								)}
								name="address"
							/>

							{errors.address && (
								<Text style={styles.textError}>
									* {errors.address.message}
								</Text>
							)}
						</View>
					</View>

					<View style={styles.buttonWraper}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							activeOpacity={0.9}
							style={styles.btnBack}
						>
							<AntDesign
								name="caretleft"
								size={24}
								color={theme.colors.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleSubmit(onSubmit)}
							activeOpacity={0.9}
							style={{
								...styles.buttonContainer,
								padding: isLoading ? 6 : 12,
							}}
							// onPress={handleSubmit(onSubmit)}
						>
							{!isLoading ? (
							<Text style={styles.buttonText}>Simpan</Text>
							) : (
								<LottieAnimation width={40} height={40} animation={animations.threeDots} />
							 )}
						</TouchableOpacity>
					</View>
				</View>
				<Popup
					bgColor={theme.colors.error}
					message={message}
					setVisibility={setVisibility}
					visibility={visibility}
				/>
			</>
		);
	};

	return (
		<FlatList
			data={[{}]}
			renderItem={LayoutComponent}
			style={styles.page}
			contentContainerStyle={styles.scrollView}
		/>
	);
};

export default UpdateProfile;
