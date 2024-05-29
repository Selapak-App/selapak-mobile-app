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
import { useSelector } from "react-redux";
import formatAddress from "../../utils/lands/formatAddress";
import { formatAddMonth, formatDate } from "../../utils/transactions/formatDate";
import { capitalizeEachWords } from "../../utils/profile/formatString";

const TransactionDetail = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const { height, width } = Dimensions.get("screen");
	const navigation = useNavigation();
	const { transaction } = useSelector((state) => state.transaction);

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
				header={capitalizeEachWords(transaction.business.businessName)}
				tagline={formatAddress(transaction.landPrice.land)}
			/>
			<View style={styles.main}>
				<HeaderWithContent header="Bisnis">
					<View style={styles.contentWrapper}>
						<TitleContentItem head="Nama Bisnis">
							<Text style={styles.textBold}>
								{transaction.business.businessName}
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Tipe">
							<View style={styles.tagWrapper}>
								<Tag
									text={transaction.business.businessType}
									textSize={14}
								/>
							</View>
						</TitleContentItem>
						<TitleContentItem head="Deskripsi">
							<Text style={styles.text}>
								{transaction.business.descripttion}
							</Text>
						</TitleContentItem>
					</View>
				</HeaderWithContent>

				<HeaderWithContent header="Transaksi">
					<View style={styles.contentWrapper}>
						<TitleContentItem head="Luas Lapak">
							<Text style={styles.text}>
								{transaction.landPrice.land.slotArea + " m2"}
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Qty">
							<Text style={styles.text}>
								{transaction.quantity + " Petak"}
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Periode Sewa">
							<Text style={styles.text}>
								{transaction.rentPeriod.period + " Bulan"}
							</Text>
						</TitleContentItem>
						{
							transaction.paymentStatus === "PAID" && (
								<>
									<TitleContentItem head="Mulai Sewa">
										<Text style={styles.text}>
											{formatDate(transaction.createdAt)}
										</Text>
									</TitleContentItem>
									<TitleContentItem head="Akhir Sewa">
										<Text style={styles.text}>
											{formatAddMonth(transaction.updatedAt, transaction.rentPeriod.period)}
										</Text>
									</TitleContentItem>
								</>
							)
						}
						<TitleContentItem head="Alamat Lapak">
							<Text style={styles.text}>
								{formatAddress(transaction.landPrice.land)}
							</Text>
						</TitleContentItem>
						<TitleContentItem head="Status">
							<View style={styles.tagWrapper}>
								<Tag
									text={transaction.showStatus}
									textSize={14}
								/>
							</View>
						</TitleContentItem>
						<TitleContentItem head="Total">
							<Text style={styles.textBold}>
								Rp.{" "}
								{new Intl.NumberFormat("ID").format(
									transaction.totalPayment
								)}
							</Text>
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
										icon={
											transaction.verifyStatus ===
											"APPROVED"
												? "checkbox-marked-circle"
												: transaction.verifyStatus ===
												  "REJECTED"
												? "close-circle"
												: "checkbox-blank-circle-outline"
										}
										color={
											transaction.verifyStatus ===
											"APPROVED"
												? theme.colors.secondary
												: transaction.verifyStatus ===
												  "REJECTED"
												? theme.colors.error
												: theme.colors.dark
										}
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
										icon={
											transaction.isSurveyed
												? "checkbox-marked-circle"
												: "checkbox-blank-circle-outline"
										}
										color={
											transaction.isSurveyed
												? theme.colors.secondary
												: theme.colors.dark
										}
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
										disabled={
											!(!transaction.isSurveyed && transaction.verifyStatus === "APPROVED")
										}
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
										icon={
											transaction.surveyStatus ===
											"ACCEPTED"
												? "checkbox-marked-circle"
												: transaction.surveyStatus ===
												  "DECLINED"
												? "close-circle"
												: "checkbox-blank-circle-outline"
										}
										color={
											transaction.surveyStatus ===
											"ACCEPTED"
												? theme.colors.secondary
												: transaction.surveyStatus ===
												  "DECLINED"
												? theme.colors.error
												: theme.colors.dark
										}
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
										disabled={
											!(transaction.surveyStatus === "PENDING" && transaction.isSurveyed )
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
										icon={
											transaction.paymentStatus === "PAID"
												? "checkbox-marked-circle"
												: "checkbox-blank-circle-outline"
										}
										color={
											transaction.paymentStatus === "PAID"
												? theme.colors.secondary
												: theme.colors.dark
										}
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
										disabled={
											!(transaction.paymentStatus === "UNPAID" && transaction.surveyStatus === "ACCEPTED")
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
