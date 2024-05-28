import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Header from "../../reusables/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "../../../app/feature/auth/authSlice";
import Popup from "../../reusables/Popup";

const schema = yup
	.object({
		newPassword: yup
			.string()
			.min(8, "Password minimal 8 karakter")
			.required("Password tidak boleh kosong"),
		confirmNewPassword: yup
			.string()
			.oneOf(
				[yup.ref("newPassword"), null],
				"Konfirmasi Password tidak cocok"
			)
			.required("Konfirmasi Password tidak boleh kosong"),
	})
	.required();

const UpdatePassword = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const [message, setMessage] = useState("");
	const [visibility, setVisibility] = useState(false);

	const { height, width } = Dimensions.get("window");

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async () => {
		const data = getValues();

		const res = await dispatch(updatePasswordAction(data));
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
	});

	const LayoutComponent = () => {
		return (
			<>
				<View style={styles.headerArea}>
					<Header
						header="Ubah Password"
						tagline="Pastikan keamanan akun Anda dengan memperbarui password secara berkala"
						textAlign="center"
						textColor="white"
					/>
				</View>
				<View style={styles.main}>
					<View style={styles.form}>
						<View>
							<View
								style={{
									justifyContent: "center",
								}}
							>
								<Controller
									control={control}
									rules={{
										required: true,
									}}
									render={({
										field: { onChange, onBlur, value },
									}) => (
										<TextInput
											label="Password Baru"
											mode="outlined"
											outlineColor={
												theme.colors.secondary
											}
											left="#000"
											secureTextEntry={!showPassword}
											onBlur={onBlur}
											onChangeText={(event) =>
												onChange(event)
											}
											value={value}
											error={errors.newPassword}
										/>
									)}
									name="newPassword"
								/>

								<TouchableOpacity
									activeOpacity={0.9}
									onPress={() =>
										setShowPassword(!showPassword)
									}
									style={styles.showPassword}
								>
									<Feather
										name={showPassword ? "eye-off" : "eye"}
										size={24}
										color={theme.colors.dark}
									/>
								</TouchableOpacity>
							</View>
							{errors.newPassword && (
								<Text style={styles.textError}>
									* {errors.newPassword.message}
								</Text>
							)}
						</View>
						<View>
							<View
								style={{
									justifyContent: "center",
								}}
							>
								<Controller
									control={control}
									rules={{
										required: true,
									}}
									render={({
										field,
										field: { onChange, onBlur, value },
									}) => (
										<TextInput
											label="Konfirmasi Password Baru"
											mode="outlined"
											outlineColor={
												theme.colors.secondary
											}
											left="#000"
											secureTextEntry={!showConfPassword}
											onBlur={onBlur}
											onChangeText={(event) =>
												onChange(event)
											}
											value={value}
											error={errors.confirmNewPassword}
										/>
									)}
									name="confirmNewPassword"
								/>

								<TouchableOpacity
									activeOpacity={0.9}
									onPress={() =>
										setShowConfPassword(!showConfPassword)
									}
									style={styles.showPassword}
								>
									<Feather
										name={
											showConfPassword ? "eye-off" : "eye"
										}
										size={24}
										color={theme.colors.dark}
									/>
								</TouchableOpacity>
							</View>
							{errors.confirmNewPassword && (
								<Text style={styles.textError}>
									* {errors.confirmNewPassword.message}
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
								// padding: isLoading ? 6 : 12,
							}}
						>
							{/* {!isLoading ? ( */}
							<Text style={styles.buttonText}>Simpan</Text>
							{/* ) : (
								<LottieAnimation width={40} height={40} animation={animations.threeDots} />
							 )} */}
						</TouchableOpacity>
					</View>
				</View>
			</>
		);
	};

	return (
		<>
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				style={styles.page}
				contentContainerStyle={styles.scrollView}
			/>
			<Popup
				bgColor={theme.colors.error}
				message={message}
				setVisibility={setVisibility}
				visibility={visibility}
			/>
		</>
	);
};

export default UpdatePassword;
