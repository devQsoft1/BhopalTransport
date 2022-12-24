import * as React from "react";
import { Image, ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { _fontName } from "../assets/fonts/font";
import COLORS from "../constants/Colors";
import { App_Logo1, BackGroundImgColor, Back_Arrow } from "../constants/Images";
import CustomText from "./CustomText";
import NavigationService from '../navigations/NavigationService'

// common


const windowWidth = Dimensions.get('window').width;

const Header = ({ isBack = true, navigation, leftIcon, title }) => {
    return (

        <View style={{ backgroundColor: COLORS.DARKGRAY }}>

            <View
                style={styles.flexCenter}
            >

                {
                    isBack &&
                    <TouchableOpacity
                        onPress={() => leftIcon ? NavigationService.openDrawer() : navigation.goBack()}
                        style={{ left: 0, position: "absolute" }}
                    >

                        <Image
                            source={leftIcon ? leftIcon : Back_Arrow}
                        />
                    </TouchableOpacity>
                }


                <CustomText
                    text={title ? title : "HOME"}
                    style={{
                        color: "#fff",
                        fontSize: 25,
                    }}
                    font={_fontName.InterBold_700}
                />

            </View>
        </View>

    )
}

export default Header;

const styles = StyleSheet.create({

    flexCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        // width: "65%",
        height: 70

    },
})