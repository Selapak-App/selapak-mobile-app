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
import { Dimensions, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import CreateTrxForm from "../../components/Transaction/CreateTrxForm";
import UpdateProfile from "../../components/Profile/UpdateProfile";
import TransactionDetail from "../../components/TransactionDetail/TransactionDetail";
import Dealing from "../../components/Dealing";
import Payment from "../../components/Payment";
import LandingVerify from "../../components/LandingVerify";
import UpdatePassword from "../../components/Profile/UpdatePassword";

const Stack = createNativeStackNavigator();

const AppManager = () => {
	const [index, setIndex] = useState(0);
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

	const handleTabChange = (newIndex) => setIndex(newIndex);

	const { height } = Dimensions.get("window");

	const HomeComp = () => <Home onTabChange={handleTabChange} />;
	const renderScene = BottomNavigation.SceneMap({
		home: HomeComp,
		land: Land,
		transaction: Transaction,
		profile: Profile,
	});

	const renderIcon = ({ route, color }) => {
		return <Octicons name={route.focusedIcon} color={color} size={24} />;
	};

	const renderLabel = ({ route, color }) => {
		return (
			<Text
				style={{
					fontFamily: "PoppinsMedium",
					textAlign: "center",
					color: color,
				}}
			>
				{route.title}
			</Text>
		);
	};

	return (
		<>
			<BottomNavigation
				
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
				renderIcon={renderIcon}
				renderLabel={renderLabel}
				shifting={false}
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
					paddingBottom: 5,
					paddingHorizontal: 30,
					borderTopColor: theme.colors.lightGray,
					borderTopWidth: 3,
					height: height * 0.09,
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
					<Stack.Screen name="App" component={AppManager} />
					<Stack.Screen
						name="ForgetPassword"
						component={ForgetPassword}
					/>
					<Stack.Screen name="LandDetail" component={LandDetail} />
					<Stack.Screen
						name="CreateTrxForm"
						component={CreateTrxForm}
					/>
					<Stack.Screen name="UpdateProfile" component={UpdateProfile} />
					<Stack.Screen name="TransactionDetail" component={TransactionDetail} />
					<Stack.Screen name="Dealing" component={Dealing} />
					<Stack.Screen name="Payment" component={Payment} />
					<Stack.Screen name="LandingVerify" component={LandingVerify} />
					<Stack.Screen name="UpdatePassword" component={UpdatePassword} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default Router;
