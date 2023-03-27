import * as React from "react";
import { Image, ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity, Text } from "react-native";
import { _fontName } from "../assets/fonts/font";
import COLORS from "../constants/Colors";
import { App_Logo1, BackGroundImgColor, Back_Arrow, Suport } from "../constants/Images";
import CustomText from "./CustomText";
import NavigationService from '../navigations/NavigationService'

// common


const windowWidth = Dimensions.get('window').width;

const Header = ({ isBack = true, navigation, leftIcon, title,isHelp=false }) => {
    return (

        <View style={{ backgroundColor: COLORS.DARKGRAY }}>
{isHelp&&
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          top: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 3,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={()=>navigation.navigate("Help")}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: _fontName.InterSemiBold_600,
            textAlign: 'center',
            color: '#35120F',
          }}>
          Help
        </Text>
        <Image
          source={Suport}
          style={{width: 15, height: 15}}
          resizeMode="contain"
        />
      </TouchableOpacity>
        }
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
                        textAlign:"center"
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