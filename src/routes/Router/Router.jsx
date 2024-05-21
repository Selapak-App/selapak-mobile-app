import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Home from "../../components/Home";
import Land from "../../components/Land";
import Transaction from "../../components/Transaction";
import Profile from "../../components/Profile";
import { BottomNavigation, useTheme } from "react-native-paper";
import ForgetPassword from "../../components/ForgetPassword";
import LandDetail from "../../components/LandDetail";
import { Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const MyComponent = () => {
	const [index, setIndex] = useState(0);
	// const a = () => (<Text>"""</Text>);
	const [routes] = useState([
		{
			key: "home",
			title: "Home",
			focusedIcon: "home",
		},
		{ key: "land", title: "Land", focusedIcon: "apps" },
		{
			key: "transaction",
			title: "Transaction",
			focusedIcon: "code-of-conduct",
		},
		{
			key: "profile",
			title: "Profile",
			focusedIcon: "person",
		},
	]);
	const theme = useTheme();

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		land: Land,
		transaction: Transaction,
		profile: Profile,
	});

	const renderIcon = ({ route, color }) => {
		return <Octicons name={route.focusedIcon} color={color} size={24} />;
	};

	const renderLabel = ({route, color}) => {
		return (
			<Text style={{fontFamily: "PoppinsMedium", textAlign: "center", color: color}}>{route.title}</Text>
		)
	}

	return (
		<>
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
				renderIcon={renderIcon}
				renderLabel={renderLabel}
				shifting={true}
				compact={true}
				activeColor={theme.colors.secondary}
				inactiveColor={theme.colors.dark}
				activeIndicatorStyle={{
					backgroundColor: "transparent",
				}}
				sceneAnimationEnabled={true}
				sceneAnimationType="shifting"
				barStyle={{
					backgroundColor: "white",
					paddingBottom: 10,
					paddingHorizontal: 30,
					borderTopColor: theme.colors.lightGray,
					borderTopWidth: 3,
				}}
			/>
		</>
	);
};

const Router = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						animation: "ios",
						gestureDirection: "horizontal",
						gestureEnabled: true,
					}}
					initialRouteName="Login"
				>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="App" component={MyComponent} />
					<Stack.Screen
						name="ForgetPassword"
						component={ForgetPassword}
					/>
					<Stack.Screen name="LandDetail" component={LandDetail} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default Router;
