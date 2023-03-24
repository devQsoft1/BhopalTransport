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

const ForgotPassword = ({navigation}) => {
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
  } = ContextHelper();

  const [flagCheck, setFlag] = React.useState(false);

  const [data, setData] = React.useState({
    mobile: '',
    password: '',
  });
  console.log('=-=-=-=-=', currentUser?.user_type);
  //---------- life cycles

  React.useEffect(() => {
    // success
    if (appStateObject?.login_pocket?.response) {
      setLoading(false);

      navigation.replace('DrawerNavigation');
    }
  }, [appStateObject?.login_pocket]);

  //--------- user Login

  const handleLogin = () => {
    if (!flagCheck) {
      // show error
      showMessage({
        message: 'Please accept terms and conditoins!',
        type: 'danger',
      });
      return;
    }
    if (data?.mobile) {
      postData({
        key: 'login_pocket',
        end_point: api_end_point_constants.login,
        data: {
          ...data,
          role: currentUser?.user_type === 'customer' ? '0' : '1',
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
          text="Lorem ipsum dolor  amet. voluptat
                    pudiandae sed totam tem"
          style={{
            fontSize: 15,
            paddingBottom: 20,
          }}
        />

        <TextField
          style={{marginBottom: 15}}
          keyboardType={'numeric'}
          maxLength={10}
          placeholder="Enter Your Mobile  No."
          onChangeText={text => {
            setData({
              ...data,
              mobile: text,
            });
          }}
        />
        <TextField
          placeholder="Enter Your Password"
          onChangeText={text => {
            setData({
              ...data,
              password: text,
            });
          }}
        />
        <CustomButton
          style={{marginTop: 80}}
          onPress={() => {
            handleLogin();
          }}
          title={'Login'}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
