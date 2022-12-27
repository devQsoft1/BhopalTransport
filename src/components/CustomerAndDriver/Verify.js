//--------- imports

// react
import * as React from "react";
import { Image, ScrollView, Text, View, DeviceEventEmitter, EventEmitter, AppState } from "react-native";

// lib
import { showMessage, hideMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";

// assets
import { _fontName } from "../../assets/fonts/font";
import {
    getHash,
    startOtpListener,
    useOtpVerify,
    removeListener
} from 'react-native-otp-verify';
import SmsAndroid from 'react-native-get-sms-android';

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
    const isFocused = useIsFocused();

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
    console.log('AppState============================================');
    console.log('AppState===', AppState);
    console.log('AppState========================================');

    var filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // minDate: 1671058800, // timestamp (in milliseconds since UNIX epoch)
        // maxDate: 1672058961, // timestamp (in milliseconds since UNIX epoch)
        read: 0, // 0 for unread SMS, 1 for SMS already read
        // thread_id: 12, // specify the conversation thread_id
        // address: '+1888------', // sender's phone number
        // body: 'How are you', // content to match
        indexFrom: 0, // start from index 0
        maxCount: 1, // count of SMS to return each time
    };

    // // using methods

    React.useEffect(() => {

        console.log('start hash =-==->>>>>>>>>>>');

        getHash().then(hash => {
            // use this hash in the message.
            console.log('=-=-==-hash-=-', hash);

        }).catch(console.log);

        startOtpListener(message => {
            console.log('=-=-==-=-=--')
            console.log('=-=-==-=-=--message', message)

            getOtp()
            // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
            const otp = /(\d{4})/g.exec(message)[1];
            // setOtp(otp);
            console.log('=-=-==-=-=--otp', otp);

        });
        // AppState?.removeListener();
        return () => removeListener();
    }, []);

    //---------- life cycles


    // // using methods


    const getOtp = () => {

        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('Count: ', count);
                console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                arr.forEach(function (object) {
                    console.log('Object: ' + object);
                    console.log('-->' + object.date);
                    console.log('-->' + object.body);
                });
            },
        );
    }


    // SmsAndroid.addSmsListener(event => {
    //     console.log('event=--=-', event);
    // });

    // DeviceEventEmitter.addListener('sms', (msg) => {
    //     console.log('------------------------->',)
    //     console.log(msg);
    // });





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
                    value={otp}
                    keyboardType={'numeric'}
                    placeholder='Enter 4 Digit OTP'
                    maxLength={4}
                    autoComplete="sms-otp"
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