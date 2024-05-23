import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../assets/images";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../app/feature/auth/authSlice";
import LottieView from "lottie-react-native";
import animations from "../../../assets/animations";
import Popup from "../reusables/Popup";
import ThreeDotLoading from "../reusables/ThreeDotLoading/ThreeDotLoading";
import Header from "../reusables/Header";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const loginFormSchema = yup
	.object({
		email: yup
			.string()
			.matches(emailRegex, "Format email tidak valid")
			.required("Email tidak boleh kosong"),
		password: yup
			.string()
			.min(8, "Password minimal 8 karakter")
			.required("Password tidak boleh kosong"),
	})
	.required();

const Login = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const [showPassword, setShowPassword] = useState(false);
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
		resolver: yupResolver(loginFormSchema),
	});
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const [errorVisibility, setErrorVisibility] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Network Error");

	const onSubmit = async () => {
		if (!errors.email && !errors.password) {
			try {
				const data = await getValues();
				const res = await dispatch(loginAction(data));
				if (!res.payload.error) {
					navigation.navigate("App");
				} else {
					throw new Error(res.payload.message);
				}
			} catch (error) {
				setErrorMessage(error.message);
				setErrorVisibility(true);
			}
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

	const toForgetPassword = () => {
		console.log("to forget pass");
		navigation.navigate("ForgetPassword");
	};

	const styles = StyleSheet.create({
		page: {
			backgroundColor: theme.colors.primary,
			flex: 1,
			paddingTop: insets.top + 20,
			justifyContent: "flex-end",
		},
		wrapper: {
			flex: 0.8,
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
			borderRadius: theme.roundness,
			alignItems: "center",
		},
		buttonText: {
			color: "white",
			fontFamily: "PoppinsMedium",
			fontSize: 16,
		},
		textWrapper: { fontFamily: "Poppins", textAlign: "center" },
		textToRegister: { fontFamily: "PoppinsSemiBold" },
	});

	return (
		<View style={styles.page}>
			<StatusBar style="dark" />
			<View style={styles.wrapper}>
				<View style={styles.thumbnail}>
					<Image source={images.icon} style={styles.imgThumbnail} />
				</View>
				<View style={{ marginTop: -40 }}>
					<Text style={styles.h1}>Awali langkahmu</Text>
					<Text style={styles.tagline}>
						Isi datamu dan mulai petualangan
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
							activeOpacity={0.9}
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
					<TouchableOpacity
						onPress={toForgetPassword}
						style={styles.flexEnd}
						activeOpacity={0.9}
					>
						<Text style={styles.forgetPass}>Lupa Password</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonWraper}>
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							...styles.buttonContainer,
							padding: isLoading ? 6 : 12,
						}}
						onPress={handleSubmit(onSubmit)}
						disabled={isLoading}
					>
						{!isLoading ? (
							<Text style={styles.buttonText}>Masuk</Text>
						) : (
							<ThreeDotLoading width={40} height={40} />
						)}
					</TouchableOpacity>
					<Text style={styles.textWrapper}>
						Belum punya akun?{" "}
						<Text
							onPress={() => navigation.navigate("Register")}
							style={styles.textToRegister}
						>
							Buat akun
						</Text>
					</Text>
				</View>
			</View>
			<Popup
				message={errorMessage}
				visibility={errorVisibility}
				setVisibility={setErrorVisibility}
				bgColor={theme.colors.error}
			/>
		</View>
	);
};

export default Login;
