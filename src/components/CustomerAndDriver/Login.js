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
import { TermsIcon } from "../../constants/Images";
import COLORS from "../../constants/Colors";

// utils
import { api_end_point_constants } from "../../Utils/ApiConstants";
import ContextHelper from "../../ContextHooks/ContextHelper";
import { TouchableOpacity } from "react-native-gesture-handler";

//---------- login component

const Login = ({ navigation }) => {

    //---------- state, veriable, context and hooks
    const {
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,

        setLoading,
        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()

    const [flagCheck, setFlag] = React.useState(false)

    const [data, setData] = React.useState({
        mobile: "78945645468",
    })

    //---------- life cycles

    React.useEffect(() => {

        // success
        if (appStateObject?.login_pocket?.response) {
            setLoading(false)

            navigation.navigate('Verify', { mobile: data.mobile })

            // if ((currentUser?.user_type === 'business_owner' &&
            //     appStateObject?.login_pocket?.response?.role === '1' ||
            //     appStateObject?.login_pocket?.response?.role === 1) ||

            //     (currentUser?.user_type === 'patron' &&
            //         appStateObject?.login_pocket?.response?.role === '0' ||
            //         appStateObject?.login_pocket?.response?.role === 0)) {

            //     currentUser?.user_type === 'business_owner' ?
            //         navigation.navigate('OwnerOnboarding')
            //         :
            //         navigation.navigate('PatronOnboarding')
            // }
        }
    }, [appStateObject?.login_pocket])

    //--------- user Login

    const handleLogin = () => {

        if (data?.mobile) {

            postData({
                key: 'login_pocket',
                end_point: api_end_point_constants.login,
                data: {
                    ...data,
                }
            })
        } else {

            // show error
            showMessage({
                message: 'All fields are required',
                type: 'danger',
            });
        }
    }

    //--------- main view

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

                <TextField

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


                <View
                    style={{ flexDirection: "row", marginVertical: 21 }}
                >
                    {/* <Image
                        source={TermsIcon}
                        resizeMode='contain'
                    /> */}

                    <TouchableOpacity onPress={() => { setFlag(!flagCheck) }}>


                        {!flagCheck &&
                            <TouchableOpacity style={{
                                borderWidth: 2,
                                borderColor: "COLORS.DARKGRAY",
                                width: 21,
                                height: 21,
                                borderRadius: 3,
                                marginRight: 3,
                                marginBottom: 3
                            }}

                                onPress={() => { setFlag(!flagCheck) }}
                            >
                                {/* {console.warn(flagCheck)} */}

                            </TouchableOpacity>
                        }
                        {flagCheck &&
                            <Image
                                source={TermsIcon}
                                resizeMode='contain'
                            />
                        }

                        {/* {console.warn(flagCheck)} */}
                    </TouchableOpacity>

                    <CustomText
                        text="Accept Terms And Conditions"
                        style={{
                            fontSize: 15,
                            marginLeft: 6,
                        }}
                    />

                </View>

                <CustomButton
                    onPress={() => { handleLogin() }}
                    title={'Login'}
                />
            </View>

        </ScrollView>
    )
}

export default Login;