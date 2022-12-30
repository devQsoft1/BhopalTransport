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
        mobile: "",
    })
    console.log('=-=-=-=-=', currentUser?.user_type);
    //---------- life cycles

    React.useEffect(() => {

        // success
        if (appStateObject?.login_pocket?.response) {
            setLoading(false)

            navigation.navigate('Verify', { mobile: data.mobile })
        }
    }, [appStateObject?.login_pocket])

    //--------- user Login

    const handleLogin = () => {

        if (!flagCheck) {

            // show error
            showMessage({
                message: 'Please accept terms and conditoins!',
                type: 'danger',
            });
            return
        }
        if (data?.mobile) {

            postData({
                key: 'login_pocket',
                end_point: api_end_point_constants.login,
                data: {
                    ...data,
                    // rol: currentUser?.user_type === 'customer' ? 0 : 1
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

                    <TouchableOpacity
                        style={{
                            height: 22,


                        }}
                        onPress={() => { setFlag(!flagCheck) }}
                    >

                        {
                            flagCheck ?
                                <Image
                                    source={TermsIcon}
                                    resizeMode='contain'
                                />
                                :
                                <TouchableOpacity style={{
                                    borderWidth: 2,
                                    borderColor: "COLORS.DARKGRAY",
                                    width: 21,
                                    height: 21,
                                    borderRadius: 3,
                                    marginRight: 3,
                                    // marginBottom: 3
                                }}

                                    onPress={() => { setFlag(!flagCheck) }}
                                >
                                    {/* {console.warn(flagCheck)} */}

                                </TouchableOpacity>
                        }

                        {/* {console.warn(flagCheck)} */}
                    </TouchableOpacity>

                    <CustomText
                        text="Accept"
                        style={{
                            fontSize: 15,
                            marginHorizontal: 6,
                        }}
                    />
                    <TouchableOpacity

                        style={{
                            borderBottomColor: '#000',
                            borderBottomWidth: 1,
                        }}
                        onPress={() => {
                            navigation.navigate('TermsAndConditions')
                        }}
                    >

                        <CustomText
                            text="Terms And Conditions"
                            style={{
                                fontSize: 15,
                            }}
                        />
                    </TouchableOpacity>

                </View>

                <CustomButton
                    onPress={() => {
                        handleLogin()
                    }}
                    title={'Login'}
                />
            </View>

        </ScrollView>
    )
}

export default Login;