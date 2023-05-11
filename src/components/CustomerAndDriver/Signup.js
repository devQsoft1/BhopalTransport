//--------- imports

// react
import * as React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  DeviceEventEmitter,
  EventEmitter,
  AppState,
  TouchableOpacity,
} from 'react-native';

// lib
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';

// assets
import {_fontName} from '../../assets/fonts/font';

// common
import CustomButton from '../../common/CustomButton';
import CustomText from '../../common/CustomText';
import HeaderFirst from '../../common/HeaderFirst';
import TextField from '../../common/TextField';

// constants
import COLORS from '../../constants/Colors';
import {TermsIcon} from '../../constants/Images';

// context
import {api_end_point_constants} from '../../Utils/ApiConstants';
import ContextHelper from '../../ContextHooks/ContextHelper';

//---------- main components

const SignUp = ({navigation, route}) => {
  //---------- state, veriable, context and hooks
  const isFocused = useIsFocused();

  // const { email } = route.params;

  const [data, setData] = React.useState({});
  const [ConfirmPassword, setConfirmPassword] = React.useState();
  const [flagCheck, setFlag] = React.useState(false);

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
    if (appStateObject?.signup_pocket?.response) {
      setLoading(false);

      navigation.replace('DrawerNavigation');
    }
  }, [appStateObject?.signup_pocket]);

  //--------- user Login

  const handleSignup = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (data?.email && data?.password && ConfirmPassword) {
      if (!flagCheck) {
        // show error
        showMessage({
          message: 'Please accept terms and conditoins!',
          type: 'danger',
        });
        return;
      }
      if (reg.test(data?.email) === false) {
        showMessage({
          message: 'Please enter valid email address',
          type: 'danger',
        });
        return;
      }
      if (data?.password === ConfirmPassword) {
        postData({
          key: 'signup_pocket',
          end_point: api_end_point_constants.signup,
          data: {
            ...data,
            role: currentUser?.user_type === 'customer' ? '0' : '1',
          },
        });
      } else {
        showMessage({
          message: 'Password and Confirm Password Field do not match !!',
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
  };

  //---------- main return

  return (
    <ScrollView style={{flex: 1}}>
      <HeaderFirst navigation={navigation} isHelp={true} />

      <View style={{flex: 1, marginHorizontal: 33, marginTop: 27}}>
        <CustomText
          text="Signup"
          style={{
            color: COLORS.DARKGRAY,
            fontSize: 25,
            paddingBottom: 20,
          }}
          font={_fontName.InterBold_700}
        />

        <CustomText
          text="Enter Your Details To Signup"
          style={{
            fontSize: 15,
            paddingBottom: 20,
          }}
        />

        <TextField
          style={{marginBottom: 15}}
          placeholder="Enter Your Email"
          onChangeText={text => {
            setData({
              ...data,
              email: text,
            });
          }}
        />
        <TextField
          secureTextEntry={true}
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
          secureTextEntry={true}
          placeholder="Enter Your confirm Password"
          onChangeText={text => {
            setConfirmPassword(text);
          }}
        />
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <TouchableOpacity
            style={{
              height: 22,
            }}
            onPress={() => {
              setFlag(!flagCheck);
            }}>
            {flagCheck ? (
              <Image source={TermsIcon} resizeMode="contain" />
            ) : (
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: 'COLORS.DARKGRAY',
                  width: 21,
                  height: 21,
                  borderRadius: 3,
                  marginRight: 3,
                }}
                onPress={() => {
                  setFlag(!flagCheck);
                }}></TouchableOpacity>
            )}
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
              navigation.navigate('TermsAndConditions');
            }}>
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
            handleSignup();
          }}
          title={'Sign Up'}
          style={{marginTop: 31}}
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;
