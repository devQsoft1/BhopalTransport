import * as React from "react";
import { Image, ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { App_Logo1, BackGroundImgColor, Back_Arrow } from "../constants/Images";

// common


const windowWidth = Dimensions.get('window').width;

const HeaderFirst = ({ isBack = true, navigation }) => {
    return (
        <ImageBackground
            source={BackGroundImgColor}
            style={{ width: "100%", height: 250, }}
            resizeMode='stretch'
        >

            {
                isBack &&
                <TouchableOpacity style={{ position: "absolute", top: 30, left: 20 }} onPress={() => navigation.goBack()}>

                    <Image
                        source={Back_Arrow}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            }

            <View
                style={SpaceStyles.flexCenter}
            >
                <Image
                    source={App_Logo1}
                    resizeMode='contain'
                    style={{ height: 150, width: 150, marginTop: 50 }}
                />
            </View>

        </ImageBackground>
    )
}

export default HeaderFirst;

const SpaceStyles = StyleSheet.create({

    flexCenter: {

        alignSelf: "center"
    },
})