import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import COLORS from "../../constants/Colors";
import { Pick_up } from "../../constants/Images";

// common


// common



const VehicleTile = ({ navigation, icon, title, status }) => {
    return (
        <View style={styles.flexBox}>

            <View style={styles.borderImage}>

                <Image
                    source={icon}
                    style={{ height: 47, width: 69, }}
                />
            </View>
            <View>
                <CustomText
                    text={title}
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 20,
                        textAlign: "right",
                    }}
                    font={_fontName.InterBold_700}
                />
                {
                    status &&
                    <View style={{ flexDirection: "row", }}>
                        <CustomText
                            text={'Status - '}
                            style={{
                                color: COLORS.LIGHTGRAY,
                                fontSize: 15,
                                textAlign: "center",
                            }}
                            font={_fontName.InterMedium_500}
                        />
                        <CustomText
                            text={status}
                            style={{
                                color: '#21A300',
                                fontSize: 15,
                                textAlign: "center",
                            }}
                            font={_fontName.InterMedium_500}
                        />
                    </View>
                }

            </View>

        </View>
    )
}

export default VehicleTile;

const styles = StyleSheet.create({

    flexBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 101,
        paddingHorizontal: 21,
        backgroundColor: "#fff",
        borderRadius: 20,
        // justifyContent: "space-between",

        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        elevation: 6,

    },
    borderImage: {
        borderColor: "#949292",
        borderRadius: 20,
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 4,
        marginRight: 20
    }
})