//--------- imports

// react
import * as React from "react";
import { Image, ScrollView, Text, View } from "react-native";

// lib
import { showMessage, hideMessage } from "react-native-flash-message";

// assets
import { _fontName } from "../../assets/fonts/font";

// common
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import HeaderFirst from "../../common/HeaderFirst";
import TextField from "../../common/TextField";

// constants
import COLORS from "../../constants/Colors";
import { TermsIcon } from "../../constants/Images";

// context
import { api_end_point_constants } from "../../Utils/ApiConstants";
import ContextHelper from "../../ContextHooks/ContextHelper";

//---------- main components

const Verify = ({ navigation, route }) => {

    //---------- state, veriable, context and hooks

    const { mobile } = route.params;

    const [otp, setOtp] = React.useState('')

    const {
        setLoading,
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,

        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()

    //---------- life cycles


    React.useEffect(() => {

        // success
        if (appStateObject?.otp_pocket?.response) {
            setLoading(false)

            navigation.replace('DrawerNavigation')
        }
    }, [appStateObject?.otp_pocket])

    //--------- user Login

    const handleSubmitOtp = () => {

        if (otp) {

            postData({
                key: 'otp_pocket',
                end_point: api_end_point_constants.verify_otp,
                data: {
                    mobile: mobile,
                    otp: otp
                }
            })
        } else {

            // show error
            showMessage({
                message: 'Please enter the otp!',
                type: 'danger',
            });
        }
    }

    //---------- main return

    return (
        <ScrollView
            style={{ flex: 1 }}
        >

            <HeaderFirst
                navigation={navigation}

            />

            <View
                style={{ flex: 1, marginHorizontal: 33, marginTop: 27 }}
            >
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

                <TextField
                    keyboardType={'numeric'}
                    placeholder='Enter 4 Digit OTP'
                    //   maxLength={10}

                    onChangeText={(text) => {

                        setOtp(text)
                    }}
                />


                <CustomButton
                    onPress={() => {
                        handleSubmitOtp()
                    }}
                    title={'Verify'}
                    style={{ marginTop: 31 }}
                />
            </View>

        </ScrollView >
    )
}

export default Verify;