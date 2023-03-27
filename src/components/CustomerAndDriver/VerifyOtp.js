import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

// lib
import {showMessage, hideMessage} from 'react-native-flash-message';

// assets
import {_fontName} from '../../assets/fonts/font';

// common
import CustomButton from '../../common/CustomButton';
import CustomText from '../../common/CustomText';
import HeaderFirst from '../../common/HeaderFirst';
import TextField from '../../common/TextField';

// constants
import {TermsIcon} from '../../constants/Images';
import COLORS from '../../constants/Colors';

// utils
import {api_end_point_constants} from '../../Utils/ApiConstants';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';

//---------- login component

const VerifyOtp = ({navigation,route}) => {
  //---------- state, veriable, context and hooks
  const [ConfirmPassword, setConfirmPassword] = React.useState();

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
  } = ContextHelper();
console.log("++++",route?.params);
  const [data, setData] = React.useState({
    otp: '',
    password: '',
  });
  //---------- life cycles

  React.useEffect(() => {
    // success
    if (appStateObject?.verify_otp_pocket?.response) {
      setLoading(false);
      showMessage({
        message: 'Congratulation! Your Password successfully Change!',
        style: { backgroundColor: '#42AEEC' }
    });
      navigation.replace('Login');
      
      removeDataFromAppState({key: 'verify_otp_pocket'});

    }
  }, [appStateObject?.verify_otp_pocket]);

  //--------- user Login

  const handleForgotPassword = () => {
    if (data?.otp && data?.password) {
      if (data?.password !== ConfirmPassword) {
        showMessage({
          message: 'Password and Confirm Password Field do not match !!',
          type: 'danger',
        });
        return;
      }
      postData({
        key: 'verify_otp_pocket',
        end_point: api_end_point_constants.verify_otp,
        data: {
          ...data,
          email:route?.params
        },
      });
    } else {
      // show error
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
    }
  };

  //--------- main view

  return (
    <ScrollView style={{flex: 1}}>
      <HeaderFirst navigation={navigation} />

      <View
        style={{
          flex: 1,
          marginHorizontal: 33,
          marginTop: 15,
          paddingBottom: 20,
        }}>
        <CustomText
          text="Forgot Password"
          style={{
            color: COLORS.DARKGRAY,
            fontSize: 25,
            paddingBottom: 15,
          }}
          font={_fontName.InterBold_700}
        />

        <CustomText
          text="Enter otp and password"
          style={{
            fontSize: 15,
            paddingBottom: 20,
          }}
        />

        <TextField
          style={{marginBottom: 15}}
          placeholder="Enter Your otp"
          onChangeText={text => {
            setData({
              ...data,
              otp: text,
            });
          }}
        />
        <TextField
          style={{marginBottom: 15}}
          placeholder="Enter Your Password"
          onChangeText={text => {
            setData({
              ...data,
              password: text,
            });
          }}
        />

        <TextField
          placeholder="Enter Your confirm Password"
          onChangeText={text => {
            setConfirmPassword(text)
          }}
        />
        <CustomButton
          style={{marginTop: 80}}
          onPress={() => {
            handleForgotPassword();
          }}
          title={'Sumit'}
        />
      </View>
    </ScrollView>
  );
};

export default VerifyOtp;
