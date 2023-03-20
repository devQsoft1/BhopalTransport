import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import COLORS from "../../constants/Colors";
// import { Pick_up } from "../../constants/Images";

// common


// common



const DriverTile = ({ navigation, icon, title, status }) => {
    return (
        <View style={styles.flexBox}>


            <View style={{ width: 110 }}>

                <CustomText
                    text="Name"
                    style={{ fontSize: 8 }}
                />
                <CustomText
                    text={title}
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 14,
                        textAlign: "left",
                    }}
                    font={_fontName.InterBold_700}
                />


            </View >

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "65%" }}>
                <View
                    style={{
                        backgroundColor: status === '3' ? COLORS.DARKGRAY : "#21A300",
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 80,
                        height: 28,

                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 16,
                        elevation: 6,
                        borderRadius: 10
                    }}
                >

                    <CustomText
                        text={status === '3' ? 'Rejected' : "Completed"}

                        style={{
                            color: "#fff",
                            fontSize: 12
                        }} />
                </View>

            </View>
        </View>
    )
}

export default DriverTile;

const styles = StyleSheet.create({

    flexBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 71,
        paddingHorizontal: 21,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginHorizontal: 2,
        marginTop: 2,
        // justifyContent: "space-between",

        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        elevation: 6,

    },
    tile:
    {
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 25,


        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 6,
        borderRadius: 10
    }
})