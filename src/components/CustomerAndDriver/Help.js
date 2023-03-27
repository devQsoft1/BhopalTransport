import React from 'react';
import {Image, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {_fontName} from '../../assets/fonts/font';
import CustomText from '../../common/CustomText';
import Header from '../../common/Header';
import COLORS from '../../constants/Colors';
import {mailIcon, Phone_icon} from '../../constants/Images';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';

const Help = ({navigation}) => {
  const [ContactData, setContactData] = React.useState([]);
  const {
    setLoading,
    appStateObject,
    currentUser,

    postData,
    storeDataInAppState,
    removeDataFromAppState,
    storeDataInAsyncStorage,
    getDataFromAsyncStorage,
    setCurrentUser,
  } = ContextHelper();

  React.useEffect(() => {
    // success
    if (appStateObject?.Contact_data_pocket?.response) {
      setLoading(false);
      setContactData(appStateObject?.Contact_data_pocket?.response);
    }
  }, [appStateObject?.Contact_data_pocket]);

  React.useEffect(() => {
    postData({
      key: 'Contact_data_pocket',
      end_point: api_end_point_constants.show_contact_details,
    });
  }, []);

  return (
    <>
      <Header title="Help Support" navigation={navigation} />
      <ScrollView style={{marginHorizontal: 40, marginTop: 60}}>
        {ContactData?.map((item,indx) => (
          <View
            key={indx}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            {item?.type === 'Mobile' ? (
              <Image source={Phone_icon} style={{height: 20, width: 20}} />
            ) : (
              <View
                style={{
                  backgroundColor: COLORS.DARKGRAY,
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Image
                  source={mailIcon}
                  style={{height: 12, width: 12}}
                  tintColor={'#fff'}
                />
              </View>
            )}
            <TouchableOpacity onPress={()=>{
              if(item?.type === 'Mobile'){
                Linking.openURL(`tel:${item?.contact}`)
              }else{
               Linking.openURL(`mailto:${item?.contact}`)
              }
              }}>
              <CustomText
                text={item?.contact}
                style={{
                  color: COLORS.DARKGRAY,
                  fontSize: item?.type === 'Mobile' ? 22 : 20,
                  marginLeft: 8,
                }}
                font={_fontName.InterBold_700}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Help;
