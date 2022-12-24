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



const Login = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} >
            <HeaderFirst
                navigation={navigation}
            />
            <View style={{ flex: 1, marginHorizontal: 33, marginTop: 27 }}>
                <CustomText
                    text="Login"
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

                <TextField placeholder='Enter Your Mobile  No.' />


                <View style={{ flexDirection: "row", marginVertical: 21 }}>
                    <Image
                        source={TermsIcon}
                        resizeMode='contain'
                    />

                    <CustomText
                        text="Accept Terms And Conditions"
                        style={{
                            fontSize: 15,
                            marginLeft: 6,
                        }}
                    />
                </View>

                <CustomButton
                    onPress={() => { navigation.navigate('Verify') }}
                    title={'Login'}
                />
            </View>

        </View >
    )
}

export default Login;