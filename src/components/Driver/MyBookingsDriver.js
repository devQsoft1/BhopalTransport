import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {_fontName} from '../../assets/fonts/font';
import CustomText from '../../common/CustomText';
import COLORS from '../../constants/Colors';
import Header from '../../common/Header';
import DriverTile from './DriverTile';
import {Menu_Icon} from '../../constants/Images';
import BookingTile from './BookingTile';
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';
// common

const MyBookingsDriver = ({navigation}) => {
  //---------- state, veriable, context and hooks
  const [bookingData, setBookingData] = React.useState([]);

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
  //---------- life cycles

  React.useEffect(() => {
    getHomeDataFromServer();
  }, []);

  React.useEffect(() => {
    // success
    if (appStateObject?.show_old_bookings?.response) {
      setLoading(false);
      setBookingData(appStateObject?.show_old_bookings?.response);
    }
  }, [appStateObject?.show_old_bookings]);
  const getHomeDataFromServer = () => {
    postData({
      key: 'show_old_bookings',
      end_point: api_end_point_constants.show_old_bookings,
      data: {
        userID: currentUser.userID,
      },
    });
  };
  return (
    <View style={{flex: 1}}>
      <Header title="MyBooking" navigation={navigation} />

      <View style={{marginHorizontal: 10, flex: 1}}>
        <FlatList
          style={{flex: 1, paddingTop: 50}}
          data={bookingData}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{height: 70}} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 17}} />}
          renderItem={({item, indx}) => (
            <BookingTile title={item?.username} status={item.status} />
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
                No booking available, please book a vehicle
              </Text>
            </View>
          )}
        />
      </View>

      {/* <DriverTile title={"Ravi Sharma"} /> */}
    </View>
  );
};

export default MyBookingsDriver;

const data = [
  {
    id: 0,
    name: 'Ravi Sharma',
    status: 'Completed',
  },
  {
    id: 1,
    name: 'Vishal Sen',
    status: 'Rejected',
  },
  {
    id: 2,
    name: 'Jivan Singh',
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Sonu Thakur',
    status: 'Rejected',
  },
  {
    id: 4,
    name: 'Harry Verma',
    status: 'Completed',
  },
  {
    id: 5,
    name: 'Jugal Solanki',
    status: 'Rejected',
  },
  {
    id: 6,
    name: 'Nitin Pawar',
    status: 'Rejected',
  },
  {
    id: 7,
    name: 'Deepak Yadav',
    status: 'Completed',
  },
];
