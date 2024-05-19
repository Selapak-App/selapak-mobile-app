import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Feather } from "@expo/vector-icons";
import images from "../../../assets/images";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const registerFormSchema = yup
	.object({
		name: yup.string().required("Nama lengkap tidak boleh kosong"),
		email: yup
			.string()
			.matches(emailRegex, "Format email tidak valid")
			.required("Email tidak boleh kosong"),
		password: yup
			.string()
			.min(8, "Password minimal 8 karakter")
			.required("Password tidak boleh kosong"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Password tidak cocok")
			.required("Password tidak boleh kosong"),
	})
	.required();

const Register = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(registerFormSchema),
	});

	const onSubmit = async () => {
		if (!errors.email && !errors.password) {
			const data = getValues();
			console.log(data);
		}
	};

	const shadowPropStyle = {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 5,
	};

	const fontPoppins = {
		fontFamily: "Poppins",
		fontSize: 14,
	};

	const styles = StyleSheet.create({
		page: {
			backgroundColor: theme.colors.primary,
			flex: 1,
			paddingTop: insets.top + 20,
			justifyContent: "flex-end",
		},
		wrapper: {
			flex: 0.9,
			backgroundColor: "white",
			paddingBottom: insets.bottom + 20,
			paddingHorizontal: 20,
			paddingTop: 0,
			borderTopRightRadius: theme.roundness * 2,
			borderTopLeftRadius: theme.roundness * 2,
			alignItems: "center",
			gap: 40,
			...shadowPropStyle,
		},
		thumbnail: {
			transform: [{ translateX: 0 }, { translateY: -40 }],
			position: "relative",
			width: 80,
			height: 80,
			backgroundColor: "white",
			borderRadius: 40,
			justifyContent: "center",
			alignItems: "center",
			...shadowPropStyle,
		},
		imgThumbnail: { width: 44, height: 48 },
		h1: {
			fontSize: 28,
			fontFamily: "PoppinsSemiBold",
			textAlign: "center",
			marginBottom: -5,
		},
		tagline: {
			textAlign: "center",
			...fontPoppins,
		},
		form: {
			gap: 14,
			width: "100%",
			paddingHorizontal: 20,
		},
		forgetPass: { color: theme.colors.dark, fontFamily: "Poppins" },
		flexEnd: { alignSelf: "flex-end" },
		showPassword: {
			position: "absolute",
			right: 20,
			paddingTop: 5,
		},
		textError: { fontFamily: "Poppins", color: theme.colors.error },
		buttonWraper: { width: "100%", paddingHorizontal: 20, gap: 14 },
		buttonContainer: {
			backgroundColor: theme.colors.secondary,
			padding: 12,
			borderRadius: theme.roundness,
			alignItems: "center",
		},
		buttonText: {
			color: "white",
			fontFamily: "PoppinsMedium",
			fontSize: 16,
		},
		textWrapper: { fontFamily: "Poppins", textAlign: "center" },
		textToLogin: { fontFamily: "PoppinsSemiBold" },
	});

	return (
		<View style={styles.page}>
			<StatusBar style="dark" />
			<View style={styles.wrapper}>
				<View style={styles.thumbnail}>
					<Image source={images.icon} style={styles.imgThumbnail} />
				</View>
				<View style={{ marginTop: -40 }}>
					<Text style={styles.h1}>Berani memulai</Text>
					<Text style={styles.tagline}>
						Daftar sekarang dan raih peluang baru
					</Text>
				</View>
				<View style={styles.form}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="Nama Lengkap"
								mode="outlined"
								outlineColor={theme.colors.secondary}
								onBlur={onBlur}
								value={value}
								onChangeText={(event) => onChange(event)}
								error={errors.name}
							/>
						)}
						name="name"
					/>

					{errors.name && (
						<Text style={styles.textError}>
							* {errors.name.message}
						</Text>
					)}
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								label="Email"
								mode="outlined"
								outlineColor={theme.colors.secondary}
								onBlur={onBlur}
								value={value}
								onChangeText={(event) => onChange(event)}
								error={errors.email}
							/>
						)}
						name="email"
					/>

					{errors.email && (
						<Text style={styles.textError}>
							* {errors.email.message}
						</Text>
					)}

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
									label="Password"
									mode="outlined"
									outlineColor={theme.colors.secondary}
									left="#000"
									secureTextEntry={!showPassword}
									onBlur={onBlur}
									onChangeText={(event) => onChange(event)}
									value={value}
									error={errors.password}
								/>
							)}
							name="password"
						/>

						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => setShowPassword(!showPassword)}
							style={styles.showPassword}
						>
							<Feather
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color={theme.colors.dark}
							/>
						</TouchableOpacity>
					</View>
					{errors.password && (
						<Text style={styles.textError}>
							* {errors.password.message}
						</Text>
					)}

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
									label="Confirm Password"
									mode="outlined"
									outlineColor={theme.colors.secondary}
									left="#000"
									secureTextEntry={!showPassword}
									onBlur={onBlur}
									onChangeText={(event) => onChange(event)}
									value={value}
									error={errors.password}
								/>
							)}
							name="confirmPassword"
						/>

						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() =>
								setShowConfPassword(!showConfPassword)
							}
							style={styles.showPassword}
						>
							<Feather
								name={showConfPassword ? "eye-off" : "eye"}
								size={24}
								color={theme.colors.dark}
							/>
						</TouchableOpacity>
					</View>
					{errors.confirmPassword && (
						<Text style={styles.textError}>
							* {errors.confirmPassword.message}
						</Text>
					)}
				</View>

				<View style={styles.buttonWraper}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.buttonContainer}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.buttonText}>Daftar</Text>
					</TouchableOpacity>
					<Text style={styles.textWrapper}>
						Sudah punya akun?{" "}
						<Text
							onPress={() => navigation.navigate("Login")}
							style={styles.textToLogin}
						>
							Masuk
						</Text>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Register;
