
// react
import React from "react";

// 3rd pary lib
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../../components/CustomerAndDriver/Login";
import CustomDrawer from "../../components/CustomerAndDriver/CustomDrawer";
import CustomerHome from "../../components/Customer/CustomerHome";
import Details from "../../components/Customer/Details";
import GoogleMaps from "../../common/GoogleMaps";
import COLORS from "../../constants/Colors";
import EditProfile from "../../components/Customer/EditProfile";
import MyBooking from "../../components/Customer/MyBooking";
import TermsAndConditions from "../../common/TermsAndConditions";
import Home from "../../components/CustomerAndDriver/Home";
import EditProfileDriver from "../../components/Driver/EditProfileDriver";

// drawer
// import CustomDrawer from '../../scenes/MeenuScreen/CustomDrawer'

// components

const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    width: '80%',
                    backgroundColor: COLORS.DARKGRAY
                },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >

            <Drawer.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="HomeDrawer"
                component={DrawerStack} />
        </Drawer.Navigator >

    )
}
EditProfile
export default DrawerNavigation;

const Stack = createStackNavigator();

const DrawerStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#F5F5F5" } }}
                name="Home"
                component={Home} />

            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="Details"
                component={Details} />


            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="GoogleMaps"
                component={GoogleMaps} />

            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="EditProfile"
                component={EditProfile} />

            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="MyBooking"
                component={MyBooking} />

            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="TermsAndConditions"
                component={TermsAndConditions} />

            <Stack.Screen
                options={{ headerShown: false, cardStyle: { backgroundColor: "#FFFFFF" } }}
                name="EditProfileDriver"
                component={EditProfileDriver} />

        </Stack.Navigator>
    )

}

