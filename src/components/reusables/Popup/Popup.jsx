import { View, Text } from "react-native";
import React from "react";
import { Snackbar, Surface, useTheme } from "react-native-paper";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const Popup = ({ visibility, setVisibility, message, type }) => {
	const theme = useTheme();

	const handleCloseModal = () => setVisibility(false);
	const color =
		type === "success"
			? theme.colors.secondary
			: type === "warning"
			? theme.colors.primary
			: theme.colors.error;

	return (
		<Modal
			isVisible={visibility}
			style={{ alignItems: "center" }}
			onBackdropPress={handleCloseModal}
			onBackButtonPress={handleCloseModal}
			animationIn={"fadeInUpBig"}
			animationOut={"fadeOutUpBig"}
			animationInTiming={500}
			animationOutTiming={500}
		>
			<Surface
				style={{
					backgroundColor: theme.colors.lightGray,
					borderRadius: theme.roundness,
					padding: 30,
					maxWidth: 320,
					justifyContent: "center",
					alignItems: "center",
					gap: 20,
				}}
			>
				<AntDesign
					name={
						type === "success"
							? "checkcircleo"
							: type === "warning"
							? "warning"
							: "closecircleo"
					}
					size={72}
					color={color}
				/>
				<Text
					style={{
						color: color,
						fontSize: 16,
						fontFamily: "Poppins",
						textAlign: "center",
					}}
				>
					{message}
				</Text>
			</Surface>
		</Modal>
	);
};

export default Popup;
