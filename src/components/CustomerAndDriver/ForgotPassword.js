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
import COLORS from '../../constants/Colors';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';

//---------- login component

const ForgotPassword = ({navigation}) => {
  //---------- state, veriable, context and hooks
  const [email, setEmail] = React.useState();
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
  } = ContextHelper();
  React.useEffect(() => {
    // success
    if (appStateObject?.forgot_password_pocket?.status === 'success') {
      setLoading(false);
      navigation.replace('VerifyOtp', email);
      removeDataFromAppState({key: 'forgot_password_pocket'});
      showMessage({
        message: 'Email Sent Successfully !',
        style: {backgroundColor: '#42AEEC'},
      });
    }
  }, [appStateObject?.forgot_password_pocket]);

  const handleSubmit = () => {
    if (email) {
      postData({
        key: 'forgot_password_pocket',
        end_point: api_end_point_constants.forgot_password,
        data: {
          email: email,
        },
      });
    } else {
      showMessage({
        message: 'Please enter email address',
        type: 'danger',
      });
    }
  };

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
          text="Enter your email to forget password"
          style={{
            fontSize: 15,
            paddingBottom: 20,
          }}
        />

        <TextField
          style={{marginBottom: 15}}
          placeholder="Enter Your Email"
          onChangeText={text => {
            setEmail(text);
          }}
        />

        <CustomButton
          style={{marginTop: 80}}
          onPress={() => {
            handleSubmit();
          }}
          title={'Submit'}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
