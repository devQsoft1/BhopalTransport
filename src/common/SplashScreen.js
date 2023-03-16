//----------- imports 

// react
import React, { useEffect, useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from 'react-native'

// context 
import ContextHelper from "../ContextHooks/ContextHelper";

// style and image
import COLORS from "../constants/Colors";
import { App_Logo } from "../constants/Images";


//---------- main component

function SplashScreen({ navigation }) {

    //---------- context and state

    const [isSetupDone, setIsSetupDone] = useState(false)
    const {
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,

        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        removeDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()


    useEffect(() => {

        const setup = async () => {
            // await removeDataFromAsyncStorage('current_user');

            const current_user = await getDataFromAsyncStorage('current_user');

            if (current_user) {

                setCurrentUser(current_user)
            } else {

                setCurrentUser({
                    user_type: 'none'
                })
            }
        }
        setup()


        setTimeout(() => {
            setIsSetupDone(true)
        }, 3000);

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    useEffect(() => {

        if (currentUser?.user_type !== 'none' && isSetupDone) {

            navigation.replace("DrawerNavigation")

        } else if (currentUser?.user_type === 'none' && isSetupDone) {

            navigation.replace("RoleSelection")
        }
    }, [currentUser, isSetupDone])

    //---------- main view

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.DARKGRAY
            }}
        >
            <SafeAreaView />

            <View
                style={SpaceStyles.flexCenter}
            >
                <Image
                    source={App_Logo}
                    resizeMode='contain'
                />
            </View>
            <SafeAreaView />
        </View>
    )
}

export default SplashScreen;

const SpaceStyles = StyleSheet.create({

    flexCenter: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})