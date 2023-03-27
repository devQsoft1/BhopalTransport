import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';

// common
import {_fontName} from '../../assets/fonts/font';
import CustomButton from '../../common/CustomButton';
import CustomText from '../../common/CustomText';
import Header from '../../common/Header';
import TextField from '../../common/TextField';
import {_windowSize} from '../../common/_windowSize';
import COLORS from '../../constants/Colors';
import {Pick_up, Profile_image} from '../../constants/Images';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';
import {handleImagePicker} from '../../Utils/Helper';

const EditProfile = ({navigation}) => {
  const {
    currentUser,
    postData,
    appStateObject,
    setLoading,
    removeDataFromAppState,
  } = ContextHelper();
  const [imageUri, setImageUri] = React.useState(null);
  const [data, setData] = React.useState({
    name: currentUser?.name,
    email: currentUser?.email,
    profile_image:currentUser?.profile_image
  });

  //---------- life cycles
// console.log("curent user===", currentUser?.profile_image);
  React.useEffect(() => {
    // success
    if (appStateObject?.update_profile?.response) {
      setData(appStateObject?.update_profile?.response)
      setLoading(false);
      showMessage({
        message: 'Congratulation! Profile edited successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      removeDataFromAppState({key: 'update_profile'});
      setImageUri(null)
    }
  }, [appStateObject?.update_profile]);
  //--------- user action

  const SaveProfile = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
console.log('+_+__+_++_',imageUri);
    if (data?.email&& data?.name&&imageUri?.fileName) {
      if(reg.test(data?.email) === false){
        showMessage({
            message: "Please enter valid email address",
            type: 'danger',
        });
        return;
    };
   
      postData({
        key: 'update_profile',
        end_point: api_end_point_constants.update_profile,
        data: {
          name:data?.name,
          email:data?.email,
          userID: currentUser?.userID,
         profile_image:{
          uri:imageUri?.uri,
          type:imageUri?.type,
          name:imageUri?.fileName,
         }
        }
        
      });
    } else {
      // show error
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
    }
  };

  // Selection of the image
  const handleSelectedImage = ({file, status, msg}) => {
    if (status === true) {
      setImageUri(file);
    } else {
      alert(msg);
    }
  };
  console.log("_____",imageUri?.uri);
  return (
    <View style={{flex: 1}}>
      <Header title="Edit Profile" navigation={navigation} />
      <View style={styles.flexBoxs}>
        <TouchableOpacity
          style={{
            height: 140,
            width: 140,
            borderRadius: 80,
            overflow: 'hidden',
          }}
          onPress={() => handleImagePicker({call_back: handleSelectedImage})}>
          {imageUri?.uri ? (
            <Image
              source={{uri: imageUri?.uri}}
              style={{height: '100%', width: '100%', marginBottom: 7}}
            />
          ) : (
            <Image
              source={
                data?.profile_image?.length
                  ? {uri: currentUser?.path + currentUser?.profile_image}
                  : Profile_image
              }
              style={{height: '100%', width: '100%', marginBottom: 7}}
            />
          )}
        </TouchableOpacity>

        <CustomText
          text={'Change profile photo'}
          style={{
            color: COLORS.DARKGRAY,
            fontSize: 15,
          }}
          font={_fontName.InterMedium_500}
        />

        <TextField
          placeholder="Name"
          style={{width: '100%', marginBottom: 25, marginTop: 45}}
          value={data?.name}
          onChangeText={text => {
            setData({
              ...data,
              name: text,
            });
          }}
        />
        <TextField
          placeholder="email"
          style={{width: '100%'}}
          value={data?.email}
          onChangeText={text => {
            setData({
              ...data,
              email: text,
            });
          }}
        />

        <View style={{width: '100%', marginTop: 45}}>
          <CustomButton
            onPress={() => {
              SaveProfile();
            }}
            title={'Save'}
            width="100%"
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  flexBoxs: {
    // alignItems: "center",
    paddingTop: 40,
    marginHorizontal: 40,
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
});

