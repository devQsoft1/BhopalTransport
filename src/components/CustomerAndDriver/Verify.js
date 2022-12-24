import * as React from "react";
import { Image, Text, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";

// common
import CustomText from "../../common/CustomText";
import HeaderFirst from "../../common/HeaderFirst";
import TextField from "../../common/TextField";
import COLORS from "../../constants/Colors";
import { TermsIcon } from "../../constants/Images";

// common



const Verify = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} >
            <HeaderFirst
                navigation={navigation}

            />
            <View style={{ flex: 1, marginHorizontal: 33, marginTop: 27 }}>
                <CustomText
                    text="Verify"
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 25,
                        paddingBottom: 20
                    }}
                    font={_fontName.InterBold_700}
                />

                <CustomText
                    text="Lorem ipsum dolor  amet. voluptat
                    pudiandae sed totam tem"
                    style={{
                        fontSize: 15,
                        paddingBottom: 20
                    }}
                />

                <TextField placeholder='Enter 4 Digit OTP' />


                <CustomButton
                    onPress={() => { navigation.navigate('DrawerNavigation') }}
                    title={'Verify'}
                    style={{ marginTop: 31 }}
                />
            </View>

        </View >
    )
}

export default Verify;