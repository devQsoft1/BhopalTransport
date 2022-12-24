//---------- imports

// react
import React from "react";
// navigations
import { createStackNavigator } from "@react-navigation/stack";

// component
import { ActivityIndicator, View } from "react-native";

import SplashScreen from "../common/SplashScreen";
import RoleSelection from "../components/CustomerAndDriver/RoleSelection";
import Login from "../components/CustomerAndDriver/Login";
import Verify from "../components/CustomerAndDriver/Verify";
import MyBookingsDriver from "../components/Driver/MyBookingsDriver"
import DrawerNavigation from "./CustomerNavigator/DrawerNavigation";


// global stack veriable
const Stack = createStackNavigator();
//---------- main app / component

export const StackNavigation = () => {
    //---------- state, veriable, context and hooks
    // const { loading } = ContextHelper();

    //---------- return main view   
    return (
        <>
            {/* Global Loader */}
            {/* {
                loading &&
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 10000,
                        elevation: 1000,
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={'#000'} />
                </View>
            } */}
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="SplashScreen"
                    component={SplashScreen} />

                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="RoleSelection"
                    component={RoleSelection} />

                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="Login"
                    component={Login} />

                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="Verify"
                    component={Verify} />

                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="MyBookingsDriver"
                    component={MyBookingsDriver} />


                <Stack.Screen
                    options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                    name="DrawerNavigation"
                    component={DrawerNavigation} />


            </Stack.Navigator>
        </>
    )

}