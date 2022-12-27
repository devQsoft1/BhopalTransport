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



const DriverTile = ({ navigation, icon, title, status1, status2, status3 }) => {
    return (
        <View style={styles.flexBox}>

            <View style={{ width: "32%" }}>

                <CustomText
                    text="Name"
                    style={{
                        fontSize: 8
                    }}
                    font={_fontName.InterBold_700}

                />
                <CustomText
                    text={title}
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 14,
                        // textAlign: "left",
                    }}
                    font={_fontName.InterBold_700}
                />


            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 1, width: "68%" }}>

                <TouchableOpacity
                    style={{
                        ...styles.tile,
                        backgroundColor: COLORS.DARKGRAY,
                    }}
                >

                    <CustomText
                        text={status1}

                        style={{
                            color: "#fff",
                            fontSize: 12
                        }} />
                </TouchableOpacity>

                {
                    status2 &&

                    <TouchableOpacity
                        style={styles.tile}
                    >

                        <CustomText
                            text={status2}

                            style={{
                                color: "black",
                                fontSize: 12
                            }} />
                    </TouchableOpacity>
                }

                {
                    status3 &&
                    <TouchableOpacity
                        style={styles.tile}
                    >
                        <CustomText
                            text={status3}

                            style={{
                                color: "black",
                                fontSize: 12
                            }} />
                    </TouchableOpacity>
                }

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
        paddingHorizontal: 18,
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 20,

        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 6,

    },
    tile:
    {
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 28,
        marginLeft: 5,


        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 6,
        borderRadius: 10
    }
})