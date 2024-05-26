import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LottieAnimation = ({ width, height, animation }) => {
	return (
		<LottieView
			autoPlay
			style={{
				width,
				height,
			}}
			source={animation}
		/>
	);
};

export default LottieAnimation;
