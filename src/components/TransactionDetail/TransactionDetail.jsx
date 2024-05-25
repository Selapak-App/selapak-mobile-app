import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions,
	FlatList,
	Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, List, Surface, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import images from "../../../assets/images";
import Header from "../reusables/Header";
import Divider from "../reusables/Divider/Divider";
import HeaderWithContent from "../reusables/HeaderWithContent";
import TitleContentItem from "../reusables/TitleContentItem/TitleContentItem";
import Tag from "../reusables/Tag";
import { StatusBar } from "expo-status-bar";
import variables from "../../../assets/variables";

const TransactionDetail = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const { height, width } = Dimensions.get("screen");
	const [expanded, setExpanded] = useState("1");
	const navigation = useNavigation();
	const styles = StyleSheet.create({
		text: {
			fontFamily: "Poppins",
			fontSize: 14,
		},
		textBold: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 14,
		},
		scrollView: {
			minHeight: height,
			backgroundColor: "white",
			paddingTop: insets.top,
			paddingBottom: 20,
			paddingHorizontal: 20,
		},
		main: {
			gap: 20,
			borderRadius: theme.roundness,
			borderColor: theme.colors.primary,
			borderWidth: 2,
			backgroundColor: "white",
			padding: 20,
		},
		tagWrapper: {
			flexDirection: "row",
		},
		accordionContainer: {
			borderRadius: theme.roundness,
			borderColor: theme.colors.primary,
			borderWidth: 1,
			padding: 10,
		},
		contentWrapper: { gap: 5 },
		borderRadius: { borderRadius: theme.roundness },
		marginLAuto: { marginLeft: "auto" },
		flex1: { flex: 1 },
		flexEnd: {
			flexDirection: "row",
			justifyContent: "center",
		},
	});

	const LayoutComponent = () => (
		<>
			<Header
				header="Nama Bisnis"
				tagline="Jl. Address 111, Village, District, Postal Code"
			/>
			<View style={styles.main}>
				<HeaderWithContent header="Bisnis">
					<View style={styles.contentWrapper}>
						<TitleContentItem head="Nama Bisnis">
							<Text style={styles.textBold}>
								Es Teh Nusantara
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Tipe">
							<View style={styles.tagWrapper}>
								<Tag text="Food" textSize={14} />
							</View>
						</TitleContentItem>
						<TitleContentItem head="Deskripsi">
							<Text style={styles.text}>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</Text>
						</TitleContentItem>
					</View>
				</HeaderWithContent>

				<HeaderWithContent header="Transaksi">
					<View style={styles.contentWrapper}>
						<TitleContentItem head="Luas Lapak">
							<Text style={styles.text}>2 x 5 m2</Text>
						</TitleContentItem>
						<TitleContentItem head="Qty">
							<Text style={styles.text}>2 Petak</Text>
						</TitleContentItem>
						<TitleContentItem head="Periode Sewa">
							<Text style={styles.text}>12 Bulan</Text>
						</TitleContentItem>
						<TitleContentItem head="Alamat Lapak">
							<Text style={styles.text}>
								Jl. Topaz 7, Tlogomas, Lowokwaru, Malang, 62282
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Status">
							<View style={styles.tagWrapper}>
								<Tag text="Verify" textSize={14} />
							</View>
						</TitleContentItem>
						<TitleContentItem head="Total">
							<Text style={styles.textBold}>Rp. 12.000.000</Text>
						</TitleContentItem>
					</View>
				</HeaderWithContent>

				<HeaderWithContent header="Flow Pemesanan">
					<View style={styles.contentWrapper}>
						<List.AccordionGroup>
							<List.Accordion
								id="1"
								title="Verifikasi Admin"
								left={(props) => (
									<List.Icon
										{...props}
										icon="checkbox-marked-circle"
										color={theme.colors.secondary}
									/>
								)}
								titleStyle={{ fontFamily: "PoppinsMedium" }}
							>
								<List.Item
									title="Proses verifikasi akan dilakukan oleh admin melalui pemeriksaan identitas dan bisnis Anda. Mohon menunggu hasil dengan tenang."
									titleStyle={styles.text}
									titleNumberOfLines={10}
								/>
							</List.Accordion>
							<List.Accordion
								id="2"
								title="Survey"
								left={(props) => (
									<List.Icon
										{...props}
										icon="close-circle"
										color={theme.colors.error}
									/>
								)}
								titleStyle={{ fontFamily: "PoppinsMedium" }}
							>
								<List.Item
									title="Admin akan menghubungi Anda melalui WhatsApp untuk menjadwalkan survey lapak bersama. Anda juga dapat mengirim pesan dengan menekan tombol di bawah ini."
									titleStyle={styles.text}
									titleNumberOfLines={10}
								/>
								<View style={styles.flexEnd}>
									<Button
										icon="whatsapp"
										mode="contained"
										contentStyle={{
											backgroundColor:
												theme.colors.secondary,
										}}
										onPress={() =>
											Linking.openURL(
												`https://wa.me/${variables.ADMIN_PHONE}?text=%F0%9F%91%8B%20Halo%2C%20Admin%20Selapak.%20Saya%20ingin%20menjadwalkan%20survey%20lapak.`
											)
										}
									>
										Chat Admin
									</Button>
								</View>
							</List.Accordion>
							<List.Accordion
								id="3"
								title="Dealing"
								left={(props) => (
									<List.Icon
										{...props}
										icon="checkbox-blank-circle"
										color={theme.colors.primary}
									/>
								)}
								titleStyle={{ fontFamily: "PoppinsMedium" }}
							>
								<List.Item
									title="Silakan konfirmasikan keputusan Anda setelah menyelesaikan survei. Silahkan tekan tombol di bawah."
									titleStyle={styles.text}
									titleNumberOfLines={5}
								/>
								<View style={styles.flexEnd}>
									<Button
										icon="file-document-outline"
										mode="contained"
										contentStyle={{
											backgroundColor:
												theme.colors.secondary,
										}}
										onPress={() =>
											navigation.navigate("Dealing")
										}
									>
										Konfirmasi Keputusan
									</Button>
								</View>
							</List.Accordion>
							<List.Accordion
								id="4"
								title="Payment"
								left={(props) => (
									<List.Icon
										{...props}
										icon="checkbox-blank-circle-outline"
										color={theme.colors.dark}
									/>
								)}
								titleStyle={{ fontFamily: "PoppinsMedium" }}
							>
								<List.Item
									title="Lakukan pembayaran untuk segera memulai bisnis Anda. Kecepatan adalah kunci kesuksesan."
									titleStyle={styles.text}
									titleNumberOfLines={5}
								/>
								<View style={styles.flexEnd}>
									<Button
										icon="file-document-outline"
										mode="contained"
										contentStyle={{
											backgroundColor:
												theme.colors.secondary,
										}}
										onPress={() =>
											navigation.navigate("Payment")
										}
									>
										Petunjuk Pembayaran
									</Button>
								</View>
							</List.Accordion>
						</List.AccordionGroup>
					</View>
				</HeaderWithContent>
			</View>
		</>
	);

	return (
		<View>
			<StatusBar backgroundColor="white" />
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={styles.scrollView}
			/>
		</View>
	);
};

export default TransactionDetail;
