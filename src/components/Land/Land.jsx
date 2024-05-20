import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Land = () => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: "white",
			flex: 1,
			paddingTop: insets.top,
			paddingHorizontal: 20,
		},
		head: {
			marginVertical: 30,
			flexDirection: "column",
		},
		h1: {
			fontSize: 28,
			fontFamily: "PoppinsSemiBold",
			marginBottom: -5,
		},
		tagline: {
			fontFamily: "Poppins",
			fontSize: 16,
		},
		card: {
			borderWidth: 1,
			borderColor: theme.colors.primary,
			width: "48%",
			borderRadius: theme.roundness + 2,
			marginBottom: 20,
		},
		cardCover: {
			borderWidth: 1,
			borderColor: theme.colors.primary,
			objectFit: "cover",
			aspectRatio: 1,
			borderRadius: theme.roundness,
		},
		slotArea: {
			backgroundColor: theme.colors.primary,
			borderRadius: theme.roundness,
			paddingTop: 2,
			paddingHorizontal: 15,
			position: "absolute",
			bottom: 12,
			right: 12,
		},
		slotAreaItem: { fontFamily: "PoppinsSemiBold", color: "white" },
		cardBody: { padding: 15, flex: 1, gap: 5 },
		cardBodyContainer: { flexDirection: "row", gap: 10 },
		dot: { paddingTop: 5 },
		district: {
			fontSize: 18,
			fontFamily: "PoppinsSemiBold",
		},
		cardContent: {
			justifyContent: "space-between",
			flex: 1,
			gap: 30,
		},
		price: {
			fontSize: 16,
			fontFamily: "PoppinsSemiBold",
		},
		normalText: { fontFamily: "Poppins", fontSize: 14 },
		spaceBetween: { justifyContent: "space-between" },
		flex1: { flex: 1 },
	});

	const CardComponent = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate("LandDetail", item)}
				activeOpacity={0.9}
				style={styles.card}
			>
				<View>
					<Image
						source={{ uri: item.uri[0] }}
						style={styles.cardCover}
					/>
					<View style={styles.slotArea}>
						<Text style={styles.slotAreaItem}>{item.slotArea}</Text>
					</View>
				</View>
				<View style={styles.cardBody}>
					<View style={styles.cardBodyContainer}>
						<View style={styles.dot}>
							<FontAwesome6
								name="location-dot"
								size={18}
								color="black"
							/>
						</View>
						<Text style={styles.district}>{item.district}</Text>
					</View>
					<View style={styles.cardContent}>
						<Text numberOfLines={2}>
							{item.description.map((desc) => (
								<Text key={desc}>
									{"-  "}
									{desc + "\n"}
								</Text>
							))}
						</Text>

						<Text style={styles.price}>
							Rp. {new Intl.NumberFormat("ID").format(item.price)}
							<Text style={styles.normalText}> /bln</Text>
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const ComponentLayout = () => {
		return (
			<>
				<View style={styles.head}>
					<Text style={styles.h1}>Temukan Lapakmu!</Text>
					<Text style={styles.tagline}>
						Sewa lahan sesuai kebutuhanmu dengan mudah
					</Text>
				</View>
				<FlatList
					data={dummyData}
					keyExtractor={(item) => item.id}
					renderItem={CardComponent}
					numColumns={2}
					columnWrapperStyle={styles.spaceBetween}
					style={styles.flex1}
				/>
			</>
		);
	};

	return (
		<FlatList
			data={[{}]}
			renderItem={ComponentLayout}
			contentContainerStyle={{
				paddingHorizontal: 20,
				paddingTop: insets.top,
				paddingBottom: 100,
				backgroundColor: "white",
			}}
		/>
	);
};

const dummyData = [
	{
		id: 1,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 2,
		district: "Tlogomas",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 3,
		district: "Karang Binangun",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 4,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 5,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 6,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 7,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 8,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 9,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 10,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
	{
		id: 11,
		district: "Lowokwaru",
		address: "Jl. aja dulu No. 66, Tlogomas, Lowokwaru, Malang",
		postalCode: "62282",
		availableSlot: 25,
		description: [
			"Dekat SPBU",
			"Dekat Jalan Raya",
			"Resiko ditabrak truk 0%",
			"Resiko ditabrak ibu-ibu 70%",
		],
		slotArea: "2x3 m",
		types: ["Makanan", "Minuman", "Tambal Ban", "Bengkel Motor"],
		price: 3000000,
		uri: [
			"https://asset-2.tstatic.net/medan/foto/bank/images/lapak-narkoba-Jalan-Namo-Salak-Desa-Lama.jpg",
			"https://asset.kompas.com/crops/lVOBF4HNJRh6gCaCXSYYKkvFSMA=/0x0:0x0/375x240/data/photo/2022/11/30/63874cdf365bb.jpg",
			"https://awsimages.detik.net.id/community/media/visual/2023/05/29/polisi-saat-menggerebek-lokasi-judi-di-kota-binjai-foto-dok-polda-sumut_169.jpeg?w=1200",
		],
	},
];

export default Land;
