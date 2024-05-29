import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import * as yup from "yup";
import { TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusBar } from "expo-status-bar";
import images from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordAction } from "../../app/feature/auth/authSlice";
import { useState } from "react";
import Popup from "../reusables/Popup";
import LottieAnimation from "../reusables/LottieAnimation";
import animations from "../../../assets/animations";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const loginFormSchema = yup
	.object({
		email: yup
			.string()
			.matches(emailRegex, "Format email tidak valid")
			.required("Email tidak boleh kosong"),
	})
	.required();

const ForgetPassword = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const [visibility, setVisibility] = useState(false);
	const [message, setMessage] = useState(null);
	const [isError, setIsError] = useState(false);
	const {height, width} = Dimensions.get("window");

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(loginFormSchema),
	});

	const onSubmit = async () => {
		const data = getValues();
		const res = await dispatch(forgetPasswordAction(data));
		if (!res.error) {
			setMessage(
				"Berhasil mengirimkan password baru, pastikan untuk mengubahnya nanti."
			);
			setIsError(false);
			setVisibility(true);
			setTimeout(() => {
				reset();
				navigation.navigate("Login");
			}, 5000);
		} else {
			setMessage(res.payload.message);
			setIsError(true);
			setVisibility(true);
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
			justifyContent: "flex-end",
		},
		wrapper: {
			marginTop: insets.top + height * 0.2,
			minHeight: height * 0.8,
			flex: 1,
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
		textToRegister: { fontFamily: "PoppinsSemiBold" },
	});

	const LayoutComponent = () => {
		return (
			<View style={styles.wrapper}>
				<View style={styles.thumbnail}>
					<Image source={images.icon} style={styles.imgThumbnail} />
				</View>
				<View style={{ marginTop: -20 }}>
					<Text style={styles.h1}>Lupa Password</Text>
					<Text style={styles.tagline}>
						Jangan khawatir, isi emailmu untuk menerima password
						baru
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
				</View>
				<View style={styles.buttonWraper}>
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							...styles.buttonContainer,
							padding: isLoading ? 6 : 12,
						}}
						onPress={handleSubmit(onSubmit)}
					>
						{!isLoading ? (
							<Text style={styles.buttonText}>Kirim</Text>
						) : (
							<LottieAnimation
								width={40}
								height={40}
								animation={animations.threeDots}
							/>
						)}
					</TouchableOpacity>
					<Text style={styles.textWrapper}>
						Sudah ingat password kamu?{" "}
						<Text
							onPress={() => navigation.navigate("Login")}
							style={styles.textToRegister}
						>
							Masuk
						</Text>
					</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.page}>
			<StatusBar style="dark" />
			
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={{ flexGrow: 1 }}
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
			/>

			<Popup
				message={message}
				visibility={visibility}
				setVisibility={setVisibility}
				type={isError ? "error" : "success"}
			/>
		</View>
	);
};

export default ForgetPassword;
