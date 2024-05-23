import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import dummyPeriod from "../../../data/dummyPeriod";
import dummyBusinessType from "../../../data/dummyBusinessType";
import { TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { StatusBar } from "expo-status-bar";
import images from "../../../../assets/images";
import Popup from "../../reusables/Popup";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getTypeAction } from "../../../app/feature/businessType/businessTypeSlice";
import ThreeDotLoading from "../../reusables/ThreeDotLoading/ThreeDotLoading";
import { getPeriodAction } from "../../../app/feature/rentPeriod/rentPeriodSlice";

const createTrxSchema = yup
	.object({
		name: yup.string().required("Nama bisnis tidak boleh kosong"),
		description: yup
			.string()
			.min(50, "Deskripsi minimal 50 karakter")
			.required("Deskripsi tidak boleh kosong"),
		period: yup.string().required("Harus memilih salah satu period"),
		businessType: yup.string().required("Harus memilih satu business type"),
		qty: yup
			.number()
			.typeError("Slot qty harus berupa angka")
			.min(1, "Qty Minimal 1"),
	})
	.required();

const CreateTrxForm = () => {
	const periodData = dummyPeriod;
	const businessTypeData = dummyBusinessType;
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [message, setMessage] = useState(null);
	const [visibility, setVisibility] = useState(false);
	const [isError, setIsError] = useState(false);

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
			period: "",
			businessType: "",
			qty: 0,
		},
		resolver: yupResolver(createTrxSchema),
	});
	const dispatch = useDispatch();
	const [isTypeFocus, setIsTypeFocus] = useState(false);
	const [isPeriodFocus, setIsPeriodFocus] = useState(false);
	const { isLoading, types } = useSelector((state) => state.type);
	const { periods } = useSelector((state) => state.period);

	useEffect(() => {
		dispatch(getTypeAction());
		dispatch(getPeriodAction());
	}, [dispatch]);

	const window = Dimensions.get("window");

	const onSubmit = async () => {
		console.log(periods);
		console.log(types);
		console.log(getValues());
		// if (!errors.email && !errors.password) {
		// 	try {
		// 		const data = getValues();
		// 		const reqData = {
		// 			fullName: data.name,
		// 			email: data.email,
		// 			gender: data.gender ? data.gender : "MALE",
		// 			password: data.password,
		// 		};

		// 		const res = await dispatch(registerAction(reqData));
		// 		if (!res.payload.error) {
		// 			setMessage("Berhasil membuat akun");
		// 			setVisibility(true);
		// 			setTimeout(() => {
		// 				navigation.navigate("Login");
		// 			}, 3000);
		// 		} else {
		// 			throw new Error(res.payload.message);
		// 		}
		// 	} catch (error) {
		// 		setIsError(true);
		// 		setMessage(error.message);
		// 		setVisibility(true);
		// 	}
		// }
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
			marginTop: insets.top + window.height * 0.1,
			minHeight: window.height * 0.9,
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
		textError: {
			fontFamily: "Poppins",
			color: theme.colors.error,
			marginTop: 5,
		},
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

		dropdown: {
			height: 50,
			borderColor: theme.colors.secondary,
			borderWidth: 1,
			backgroundColor: theme.colors.lightGray,
			borderRadius: theme.roundness,
			paddingHorizontal: 10,
		},
		icon: {
			marginRight: 5,
		},
		label: {
			position: "absolute",
			backgroundColor: "white",
			left: 22,
			top: 8,
			zIndex: 999,
			paddingHorizontal: 8,
			fontSize: 14,
		},
		placeholderStyle: {
			fontSize: 16,
		},
		selectedTextStyle: {
			fontSize: 16,
		},
		iconStyle: {
			width: 20,
			height: 20,
		},
		inputSearchStyle: {
			height: 40,
			fontSize: 16,
		},
	});

	const LayoutComponent = () => {
		return (
			<View style={styles.wrapper}>
				<View style={{ marginTop: 40 }}>
					<Text style={styles.h1}>Ajukan Sewa</Text>
					<Text style={styles.tagline}>
						Isi formulir sesuai bisnis dan rencana anda
					</Text>
				</View>
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
									label="Nama Bisnis"
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
					</View>

					<View>
						<Text
							style={{
								fontFamily: "Poppins",
								marginLeft: 10,
								color: isTypeFocus
									? theme.colors.primary
									: theme.colors.secondary,
							}}
						>
							Pilih Tipe Bisnis
						</Text>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<Dropdown
									style={[
										styles.dropdown,
										isTypeFocus && {
											borderColor: theme.colors.primary,
										},
										errors.period && {
											borderColor: theme.colors.error,
											borderWidth: 2,
										},
									]}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									inputSearchStyle={styles.inputSearchStyle}
									iconStyle={styles.iconStyle}
									data={types}
									maxHeight={300}
									labelField="name"
									valueField="id"
									placeholder={"Pilih Tipe Bisnis"}
									value={value}
									onFocus={() => setIsTypeFocus(true)}
									onBlur={() => setIsTypeFocus(false)}
									onChange={(item) => {
										onChange(item.id);
										setIsTypeFocus(false);
									}}
									renderLeftIcon={() => (
										<Ionicons
											style={styles.icon}
											color={
												isTypeFocus
													? theme.colors.secondary
													: theme.colors.dark
											}
											name="business-outline"
											size={20}
										/>
									)}
								/>
							)}
							name="businessType"
						/>

						{errors.businessType && (
							<Text style={styles.textError}>
								* {errors.businessType.message}
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
									label="Ceritakan bisnismu"
									mode="outlined"
									outlineColor={theme.colors.secondary}
									onBlur={onBlur}
									value={value}
									onChangeText={(event) => onChange(event)}
									error={errors.description}
								/>
							)}
							name="description"
						/>

						{errors.description && (
							<Text style={styles.textError}>
								* {errors.description.message}
							</Text>
						)}
					</View>

					<View>
						<Text
							style={{
								fontFamily: "Poppins",
								marginLeft: 10,
								color: isTypeFocus
									? theme.colors.primary
									: theme.colors.secondary,
							}}
						>
							Pilih periode sewa
						</Text>
						<View style={{ flexDirection: "row", gap: 20 }}>
							<View style={{ flex: 0.7, marginTop: 6 }}>
								<Controller
									control={control}
									rules={{
										required: true,
									}}
									render={({
										field: { onChange, onBlur, value },
									}) => (
										<Dropdown
											style={[
												styles.dropdown,
												isPeriodFocus && {
													borderColor:
														theme.colors.primary,
												},
												errors.period && {
													borderColor:
														theme.colors.error,
													borderWidth: 2,
												},
											]}
											placeholderStyle={
												styles.placeholderStyle
											}
											selectedTextStyle={
												styles.selectedTextStyle
											}
											inputSearchStyle={
												styles.inputSearchStyle
											}
											iconStyle={styles.iconStyle}
											data={periods.map((item) => ({
												...item,
												period:
													item.period.toString() +
													" bulan",
											}))}
											maxHeight={300}
											labelField="period"
											valueField="id"
											placeholder={"Pilih Periode Sewa"}
											value={value}
											onFocus={() =>
												setIsPeriodFocus(true)
											}
											onBlur={() =>
												setIsPeriodFocus(false)
											}
											onChange={(item) => {
												onChange(item.id);
												setIsPeriodFocus(false);
											}}
											renderLeftIcon={() => (
												<Ionicons
													style={styles.icon}
													color={
														isTypeFocus
															? theme.colors
																	.secondary
															: theme.colors.dark
													}
													name="time-outline"
													size={20}
												/>
											)}
										/>
									)}
									name="period"
								/>
							</View>
							<View style={{ flex: 0.3 }}>
								<Controller
									control={control}
									rules={{
										required: true,
									}}
									render={({
										field: { onChange, onBlur, value },
									}) => (
										<TextInput
											label="Slot Qty"
											mode="outlined"
											outlineColor={
												theme.colors.secondary
											}
											onBlur={onBlur}
											value={
												value > 0 || value == ""
													? value
													: 1
											}
											onChangeText={(event) =>
												onChange(event)
											}
											error={errors.qty}
											keyboardType="numeric"
										/>
									)}
									name="qty"
								/>
							</View>
						</View>
						{errors.period && (
							<Text style={styles.textError}>
								* {errors.period.message}
							</Text>
						)}
						{errors.qty && (
							<Text style={styles.textError}>
								* {errors.qty.message}
							</Text>
						)}
					</View>
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
							<Text style={styles.buttonText}>Ajukan Sewa</Text>
						) : (
							<ThreeDotLoading width={40} height={40} />
						)}
					</TouchableOpacity>
				</View>
				<Popup
					message={message}
					visibility={visibility}
					setVisibility={setVisibility}
					bgColor={
						isError ? theme.colors.error : theme.colors.secondary
					}
				/>
			</View>
		);
	};

	return (
		<View style={styles.page}>
			<StatusBar style="dark" />
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={{ flexGrow: 1 }}
				style={{ flex: 1 }}
			/>
		</View>
	);
};

export default CreateTrxForm;
