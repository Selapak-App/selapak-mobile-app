import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	FlatList,
	ToastAndroid,
	Linking,
} from "react-native";
import React, { useState } from "react";
import { Button, List, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../assets/images";
import HeaderWithContent from "../reusables/HeaderWithContent";
import TitleContentItem from "../reusables/TitleContentItem/TitleContentItem";
import * as Clipboard from "expo-clipboard";
import variables from "../../../assets/variables";
import { StatusBar } from "expo-status-bar";

const spacingFourChar = (input) => {
	let characters = input.split('');
	let result = '';
  
	for (let i = 0; i < characters.length; i++) {
	  result += characters[i];
	  if ((i + 1) % 4 === 0 && (i + 1) !== characters.length) {
		result += ' ';
	  }
	}
  
	return result;
}

const Payment = () => {
	const theme = useTheme();
	const { height, width } = Dimensions.get("screen");
	const insets = useSafeAreaInsets();
	const handleCopy = async (item) => {
		await Clipboard.setStringAsync(item);
		ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
	};

	const styles = StyleSheet.create({
		page: {
			backgroundColor: "white",
			minHeight: height,
			padding: 20,
		},
		container: {
			gap: 15,
			justifyContent: "center",
			alignItems: "center",
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
		},
		image: {
			width: 350,
			height: 315,
		},
		header: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 26,
			textAlign: "center",
			color: theme.colors.dark,
		},
		content: {
			width: "100%",
			borderRadius: theme.roundness,
			borderWidth: 1,
			borderStyle: "dashed",
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.lightGray,
			padding: 20,
		},
		text: {
			fontFamily: "Poppins",
		},
		text16: {
			fontFamily: "Poppins",
			fontSize: 16,
		},
		textBold: { fontFamily: "PoppinsSemiBold" },
		button: {
			paddingVertical: 15,
			paddingHorizontal: 25,
			borderRadius: theme.roundness,
			backgroundColor: theme.colors.secondary,
			borderColor: theme.colors.secondary,
			borderWidth: 2,
		},
		buttonText: {
			textAlign: "center",
			color: "white",
			fontFamily: "PoppinsMedium",
			fontSize: 16,
		},
		flexRowCenter: { flexDirection: "row", justifyContent: "center" },
		flexRowBetween: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		flexRow5: {
			flexDirection: "row",
			gap: 5,
		},
	});

	const LayoutComponent = () => {
		return (
			<>
				<View
					style={{...styles.container}}
					// contentContainerStyle={styles.container}
				>
					<Image source={images.payment} style={styles.image} />
					<Text style={styles.header}>Selesaikan Pembayaran</Text>
					<View style={styles.content}>
						<HeaderWithContent header="Transaksi">
							<View style={{ gap: 5 }}>
								<TitleContentItem head="Nama Bisnis">
									<Text style={styles.textBold}>
										Es Teh Nusantara
									</Text>
								</TitleContentItem>
								<TitleContentItem head="Alamat Lapak">
									<Text style={styles.text}>
										Jl. Topaz 7, Tlogomas, Lowokwaru,
										Malang, 62282
									</Text>
								</TitleContentItem>
								<TitleContentItem head="Total">
									<Text style={styles.textBold}>
										Rp. 12.000.000
									</Text>
								</TitleContentItem>
							</View>
						</HeaderWithContent>
					</View>

					<View style={styles.content}>
						<HeaderWithContent header="Tata Cara Pembayaran">
							<View style={styles.contentWrapper}>
								<List.AccordionGroup>
									<List.Accordion
										id="1"
										title="Cash"
										left={(props) => (
											<List.Icon {...props} icon="cash" />
										)}
										titleStyle={{
											fontFamily: "PoppinsMedium",
										}}
									>
										{cashPayment.map((item, index) => (
											<View key={index} style={styles.flexRow5}>
												<Text style={styles.text16}>
													{index + 1 + "."}
												</Text>
												<Text style={styles.text16}>
													{item}
												</Text>
											</View>
										))}
									</List.Accordion>
									<List.Accordion
										id="2"
										title="Transfer"
										left={(props) => (
											<List.Icon
												{...props}
												icon="credit-card"
											/>
										)}
										titleStyle={{
											fontFamily: "PoppinsMedium",
										}}
									>
										<Text style={styles.text16}>
											Transfer ke nomor rekening di bawah
											dan kirim bukti transaksi ke
											WhatsApp untuk diproses lebih cepat
										</Text>
										<View style={{ marginVertical: 20, gap: 5 }}>
											{creditCard.map((item) => (
												<View
													key={item.card}
													style={
														styles.flexRowBetween
													}
												>
													<Text
														style={{
															...styles.textBold,
															fontSize: 16,
														}}
													>
														{item.card}
													</Text>
													<View
														style={{
															flexDirection:
																"row",
															backgroundColor:
																"white",
															paddingVertical: 5,
															paddingHorizontal: 15,
															borderRadius: 10,
															borderColor:
																theme.colors
																	.primary,
															borderWidth: 0.5,
															borderStyle:
																"dashed",
														}}
													>
														<Text
															style={
																{...styles.text16, fontFamily: "monospace"}
															}
															onPress={() =>
																handleCopy(
																	item.number
																)
															}
														>
															{spacingFourChar(item.number)}
														</Text>
													</View>
												</View>
											))}
										</View>
										<View style={styles.flexRowCenter}>
											<Button
												icon="whatsapp"
												mode="contained"
												contentStyle={{
													backgroundColor:
														theme.colors.secondary,
												}}
												onPress={() =>
													Linking.openURL(
														`https://wa.me/${variables.ADMIN_PHONE}?text=%F0%9F%91%8B%20Halo%2C%20Admin%20Selapak.%20Saya%20ingin%20melakukan%20konfirmasi%20pembayaran.`
													)
												}>
												Konfirmasi
											</Button>
										</View>
									</List.Accordion>
								</List.AccordionGroup>
							</View>
						</HeaderWithContent>
					</View>
				</View>
			</>
		);
	};

	return (
		<View>
			<StatusBar backgroundColor="white" style="dark"/>
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={styles.page}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const cashPayment = [
	"Datang ke kantor Selapak terdekat (alamat ada di website)",
	"Tunjukkan halaman ini kepada petugas",
	"Bayar sesuai nominal di atas",
	"Pembayaranmu akan diproses petugas",
];

const creditCard = [
	{
		card: "BCA",
		number: "1234123412341234",
	},
	{
		card: "BRI",
		number: "2323323223233232",
	},
	{
		card: "Sinarmas",
		number: "000111222333",
	},
	{
		card: "Bank Jago",
		number: "0999222333222",
	},
];

export default Payment;
