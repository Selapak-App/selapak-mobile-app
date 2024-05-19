import { View, Text } from "react-native";
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Home from "../../components/Home";
import Land from "../../components/Land";
import Transaction from "../../components/Transaction";
import Profile from "../../components/Profile";
import { Button, useTheme } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = AnimatedTabBarNavigator();

const BottomTab = () => {
    const theme = useTheme();
    
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor: "white",
				inactiveTintColor: theme.colors.secondary,
				activeBackgroundColor: theme.colors.secondary,
			}}
            appearance={{
                floating: true,
            }}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Octicons
							name="home"
							size={size ? size : 24}
							color={focused ? color : theme.colors.secondary}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Land"
				component={Land}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Octicons
							name="apps"
							size={size ? size : 24}
							color={focused ? color : theme.colors.secondary}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Transaction"
				component={Transaction}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Octicons
							name="code-of-conduct"
							size={size ? size : 24}
							color={focused ? color : theme.colors.secondary}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Octicons
							name="person"
							size={size ? size : 24}
							color={focused ? color : theme.colors.secondary}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const Router = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Register"
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="App" component={BottomTab} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
