//--------- imports

// react
import * as React from "react";
import { Image, ScrollView, Text, View, DeviceEventEmitter, EventEmitter, AppState } from "react-native";

// lib
import { showMessage, hideMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";

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

const SignUp = ({ navigation, route }) => {

    //---------- state, veriable, context and hooks
    const isFocused = useIsFocused();

    // const { mobile } = route.params;

    const [data, setData] = React.useState({})
    const [ConfirmPassword, setConfirmPassword] = React.useState()

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



    React.useEffect(() => {

        // success
        if (appStateObject?.signup_pocket?.response) {
            setLoading(false)

            navigation.replace('DrawerNavigation')
        }
    }, [appStateObject?.signup_pocket])

    //--------- user Login

    const handleSubmitOtp = () => {

        if (data?.mobile && data?.password && ConfirmPassword) {
            if (data?.password === ConfirmPassword) {
                postData({
                    key: 'signup_pocket',
                    end_point: api_end_point_constants.signup,
                    data: {
                        ...data,
                        role: currentUser?.user_type === 'customer' ? '0' : '1'
                    }
                })
            } else {
                showMessage({
                    message: "Password and Confirm Password Field do not match !!",
                    type: 'danger',
                });
            }

        } else {

            // show error
            showMessage({
                message: 'All fields are required',
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
                    text="Signup"
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
                    style={{ marginBottom: 15 }}
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder='Enter Your Mobile  No.'
                    onChangeText={(text) => {
                        setData({
                            ...data,
                            mobile: text,
                        })
                    }}

                />
                <TextField
                    style={{ marginBottom: 15 }}
                    placeholder='Enter Your Password'
                    onChangeText={(text) => {

                        setData({
                            ...data,
                            password: text,
                        })
                    }}

                />
                <TextField
                    placeholder='Enter Your confirm Password'
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                    }}

                />
                <CustomButton
                    onPress={() => {
                        handleSubmitOtp()
                    }}
                    title={'Sign Up'}
                    style={{ marginTop: 31 }}
                />
            </View>

        </ScrollView >
    )
}

export default SignUp;