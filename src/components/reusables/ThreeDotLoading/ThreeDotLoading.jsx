import { View, Text } from "react-native";
import React from "react";
import animations from "../../../../assets/animations";
import LottieView from "lottie-react-native";

const ThreeDotLoading = ({ width, height }) => {
	return (
		<LottieView
			autoPlay
			style={{
				width,
				height,
			}}
			source={animations.threeDots}
		/>
	);
};

export default ThreeDotLoading;
