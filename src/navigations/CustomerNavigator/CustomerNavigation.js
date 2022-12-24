//---------- imports

// react
import React from "react";
// navigations
import { createStackNavigator } from "@react-navigation/stack";

// component


// global stack veriable
const Stack = createStackNavigator();
//---------- main app / component

export const CustomerNavigation = () => {
    //---------- state, veriable, context and hooks

    //---------- return main view   
    return (
        <>

            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="SplashScreen"
                    component={SplashScreen} />


            </Stack.Navigator>
        </>
    )

}