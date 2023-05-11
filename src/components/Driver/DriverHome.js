import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {_fontName} from '../../assets/fonts/font';
import CustomText from '../../common/CustomText';
import COLORS from '../../constants/Colors';
import Header from '../../common/Header';
import DriverTile from './DriverTile';
import {Menu_Icon} from '../../constants/Images';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';

const DriverHome = ({navigation}) => {
  const isFocused = useIsFocused();
  const [bookingData, setBookingData] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
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

  const wait = timeout => {
    // Defined the timeout function for testing purpose
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    getData();
    setLoading(false);
    wait(1000).then(() => {
      setIsRefreshing(false);
    });
  }, []);
  React.useEffect(() => {
    // success
    if (appStateObject?.show_bookings?.response) {
      setLoading(false);
      setBookingData(appStateObject?.show_bookings?.response);
    }
  }, [appStateObject?.show_bookings]);

  React.useEffect(() => {
    if (isFocused && currentUser.userID) {
      getData();
    } else {
      setBookingData([]);
    }
  }, [isFocused]);

  const getData = () => {
    postData({
      key: 'show_bookings',
      end_point: api_end_point_constants.show_bookings,
      data: {
        userID: currentUser.userID,
      },
    });
  };
  React.useEffect(() => {
    // success
    if (appStateObject?.reject_booking_status?.response) {
      setLoading(false);
      showMessage({
        message: 'Reject booking successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      removeDataFromAppState({key: 'reject_booking_status'});
    } else if (appStateObject?.accept_booking_status?.response) {
      setLoading(false);
      showMessage({
        message: ' Accept booking successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      navigation.navigate('StartMaps', {
        type: 'Accept',
        item: appStateObject?.accept_booking_status?.response,
      });
      removeDataFromAppState({key: 'accept_booking_status'});
    }
  }, [
    appStateObject?.update_booking_status,
    appStateObject?.accept_booking_status,
  ]);

  const handleUpdateBooking = (key, item) => {
    // console.log(item)
    if (key === 'Reject') {
      postData({
        key: 'reject_booking_status',
        end_point: api_end_point_constants.update_booking_status,
        data: {
          bookingID: item?.bookingID,
          userID: currentUser?.userID,
          status: '3',
        },
      });
    } else if (key === 'Location') {
      navigation.navigate('StartMaps', {type: 'Location', item});
    } else if (key === 'Accept') {
      postData({
        key: 'accept_booking_status',
        end_point: api_end_point_constants.update_booking_status,
        data: {
          bookingID: item?.bookingID,
          userID: currentUser?.userID,
          status: '2',
        },
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title="HOME"
        leftIcon={Menu_Icon}
        navigation={navigation}
        isHelp={true}
      />

      <View style={{marginHorizontal: 20, flex: 1}}>
        <FlatList
          enabled={true}
          refreshing={isRefreshing} // Added pull to refesh state
          onRefresh={onRefresh} // Added pull to refresh control
          style={{flex: 1, paddingTop: 50}}
          data={bookingData}
          // keyExtractor={item => item?.bookingID}
          ListFooterComponent={() => <View style={{height: 70}} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 17}} />}
          renderItem={({item, indx}) => (
            <DriverTile
              title={item.username}
              status={item.status}
              onPress={key => handleUpdateBooking(key, item)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontFamily: _fontName?.InterMedium_500,
                  color: 'gray',
                }}>
                No data available
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DriverHome;
