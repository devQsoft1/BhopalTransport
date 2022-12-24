import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";

// common
import HeaderFirst from "../../common/HeaderFirst";
import COLORS from "../../constants/Colors";
import { App_Logo, Arrow_Roght_icon, Edit_Icon, Profile_image, TandC_icon, Truck_icon } from "../../constants/Images";
import NavigationService from "../../navigations/NavigationService";
import MyBookingsDriver from "../Driver/MyBookingsDriver"
// common



const CustomDrawer = ({ navigation }) => {

    const HandelNavigation = (name) => {
        console.log(name);
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
                onPress={() => { navigation.navigate('RoleSelection') }}
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