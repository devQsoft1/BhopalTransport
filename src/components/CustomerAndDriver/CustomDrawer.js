import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import { showMessage, hideMessage } from "react-native-flash-message";

// common
import HeaderFirst from "../../common/HeaderFirst";
import COLORS from "../../constants/Colors";
import { App_Logo, Arrow_Roght_icon, Edit_Icon, Profile_image, TandC_icon, Truck_icon } from "../../constants/Images";
import ContextHelper from "../../ContextHooks/ContextHelper";
import NavigationService from "../../navigations/NavigationService";
import MyBookingsDriver from "../Driver/MyBookingsDriver"



const CustomDrawer = ({ navigation }) => {

    //---------- state, veriable, context and hooks
    const {
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,

        setLoading,
        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        removeDataFromAsyncStorage,
        removeAllDataFromAppState,
        setCurrentUser,
    } = ContextHelper()

    //---------- handle user's action

    const HandelNavigation = (name) => {

        if (name === "My Profile") {
            navigation.navigate("EditProfile")
        }
        else if (name === "My Booking") {
            navigation.navigate("MyBookingsDriver")
        }
        else if (name === "Terms And Conditions") {
            navigation.navigate("TermsAndConditions")
        }

    }


    const handleLogout = () => {

        Alert.alert("Warning!", "Are you sure you want to logout.", [
            {
                text: "CANCEL",
                onPress: () => {
                    null
                },
                style: "cancel"
            },
            {
                text: "LOGOUT", onPress: async () => {

                    setLoading(true)

                    // logout 
                    await removeDataFromAsyncStorage('current_user')
                    await setCurrentUser({})
                    await removeAllDataFromAppState()
                    navigation.replace('SplashScreen')

                    showMessage({
                        message: 'You are successfully logout from account!  Now you can login again new account!',
                        style: { backgroundColor: '#42AEEC' }
                    });
                    setLoading(false)
                }
            }
        ]);
    }

    //---------- main view

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 60 }}>
            <View style={{ ...styles.flexRow }}>

                <Image
                    source={Profile_image}
                />
                <TouchableOpacity onPress={() => NavigationService.closeDrawer()}>

                    <Image
                        source={Arrow_Roght_icon}
                    />
                </TouchableOpacity>
            </View>
            <CustomText
                text="Wayne Rooney"
                style={{
                    color: COLORS.WHITE,
                    fontSize: 25,
                }}
                font={_fontName.InterSemiBold_600}
            />

            <View style={styles.bottomBorder} />
            {
                data.map((item) =>

                    <TouchableOpacity
                        onPress={() => HandelNavigation(item?.name)}
                        style={{ ...styles.flexRow2, marginBottom: 15 }} key={item?.id}>
                        <Image
                            source={item?.icon}
                        />
                        <CustomText
                            text={item?.name}
                            style={{
                                color: COLORS.WHITE,
                                fontSize: 20,
                                marginLeft: 9
                            }}
                            font={_fontName.InterMedium_500}
                        />
                    </TouchableOpacity>
                )
            }


            <CustomButton
                onPress={() => {

                    handleLogout()
                    // navigation.navigate('RoleSelection') 
                }}
                title={'Logout'}
                backgroundColor={COLORS.WHITE}
                color={COLORS.DARKGRAY}
                width={124}
                style={{ alignSelf: "center", marginTop: 70 }}
            />

            <Image
                source={App_Logo}
                style={{ height: 100, width: 180, alignSelf: "center", position: "absolute", bottom: 5 }}
                resizeMode={"contain"}
            />
        </View>

    )
}

export default CustomDrawer;

const styles = StyleSheet.create({

    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 9,

    },
    flexRow2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 9
    },
    bottomBorder: {
        borderBottomColor: COLORS.WHITE,
        borderBottomWidth: 2,
        marginVertical: 25
    }

})

const data = [
    {
        id: 1,
        name: "My Profile",
        icon: Edit_Icon
    },
    {
        id: 2,
        name: "My Booking",
        icon: Truck_icon
    }, {
        id: 3,
        name: "Terms And Conditions",
        icon: TandC_icon
    },
]