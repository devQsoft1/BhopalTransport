//-------- imports

// react
import * as React from 'react';
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';

// lib
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// assets
import {_fontName} from '../assets/fonts/font';

// common
import CustomButton from '../../common/CustomButton';
import Header from '../../common/Header';
import {_windowSize} from '../common/_windowSize';
import {showMessage} from 'react-native-flash-message';

// constants
import {Maps_icon, Pick_up, MarkerGoogle} from '../../constants/Images';

// components

// context
import ContextHelper from '../../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../../Utils/ApiConstants';
import ModalContainer from '../../common/ModalContainer';
import TextField from '../../common/TextField';
import COLORS from '../../constants/Colors';

//--------- constant api key for map
const API_KEY = 'AIzaSyDV5QBZYiqzhMFBL-Rme6oeYoepT7ckiiI';

//---------- main componet

const StartMaps = ({navigation, route}) => {
  //---------- context, state, and veriables
  const {type, item} = route?.params;

  let isVisible = type;
  const {
    setLoading,
    appStateObject,
    currentUser,
    currentLocation,
    setCurrentUser,

    removeDataFromAppState,
    postData,
  } = ContextHelper();

  //---------- life cycles

  React.useEffect(() => {
    setLoading(false);
    // success
    if (appStateObject?.start_booking_status?.response) {
      showMessage({
        message: 'start booking successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      navigation.navigate('DrawerNavigation');
      removeDataFromAppState({key: 'start_booking_status'});
    } else if (appStateObject?.accept_booking_status?.response) {
      showMessage({
        message: 'Accept booking successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      removeDataFromAppState({key: 'accept_booking_status'});
    } else if (appStateObject?.reject_booking_status?.response) {
      showMessage({
        message: 'Reject booking successfully!',
        style: {backgroundColor: '#42AEEC'},
      });
      isVisible = 'Accept';
      removeDataFromAppState({key: 'reject_booking_status'});
    }
  }, [appStateObject]);
  //--------- user Booking

  const handleBooking = status => {
    let booking_status =
      status === '2'
        ? 'accept_booking_status'
        : status === '5'
        ? 'start_booking_status'
        : 'reject_booking_status';
    postData({
      key: booking_status,
      end_point: api_end_point_constants.update_booking_status,
      data: {
        bookingID: item?.bookingID,
        userID: currentUser?.userID,
        status: status,
      },
    });
  };

  const renderGoogleMap = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          style={{
            width: '100%',
            height: '80%',
          }}
          currentLocation={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: parseFloat(item?.end_lat) || 37.4220936,
            longitude: parseFloat(item?.end_long) || -122.083922,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          query={{
            key: API_KEY,
            language: 'en',
            components: 'country:in',
          }}>
          {item?.start_lat && item?.start_long && (
            <Marker
              draggable
              coordinate={{
                latitude: parseFloat(item?.start_lat),
                longitude: parseFloat(item?.start_long),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title={item?.start_address || ''}
              // description={item?.start_address || ''}
              // pinColor={'green'}
            />
          )}
          {item?.end_lat && item?.end_long && (
            <Marker
              draggable
              coordinate={{
                latitude: parseFloat(item?.end_lat),
                longitude: parseFloat(item?.end_long),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title={item?.end_address}
              // description={item?.end_address}
              pinColor={'green'}></Marker>
          )}
          {item?.end_lat &&
            item?.end_long &&
            item?.start_lat &&
            item?.start_long && (
              <MapViewDirections
                origin={{
                  latitude: item?.start_lat,
                  longitude: item?.start_long,
                }}
                destination={{
                  latitude: item?.end_lat,
                  longitude: item?.end_long,
                }}
                apikey={API_KEY}
                strokeWidth={5}
                strokeColor={COLORS.DARKGRAY}
              />
            )}
        </MapView>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Pick-up Location" navigation={navigation} />

      <View style={styles.flexBoxs}>
        {renderGoogleMap()}

        <View style={{marginHorizontal: 40}}>
          {isVisible === 'Location' ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomButton
                onPress={() => {
                  handleBooking('2');
                }}
                title={'Accept'}
                width="45%"
                borderRadius={30}
              />

              <CustomButton
                onPress={() => {
                  handleBooking('3');
                }}
                title={'Reject'}
                width="45%"
                borderRadius={30}
              />
            </View>
          ) : (
            <CustomButton
              onPress={() => {
                handleBooking('5');
              }}
              title={'Start'}
              width="100%"
              borderRadius={30}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default StartMaps;

const styles = StyleSheet.create({
  flexBoxs: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
