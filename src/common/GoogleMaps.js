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
import CustomButton from '../common/CustomButton';
import CustomText from '../common/CustomText';
import Header from '../common/Header';
import {_windowSize} from '../common/_windowSize';
import {showMessage} from 'react-native-flash-message';

// constants
import COLORS from '../constants/Colors';
import {Maps_icon, Pick_up, MarkerGoogle} from '../constants/Images';

// components
import ModalContainer from './ModalContainer';
import TextField from './TextField';

// context
import ContextHelper from '../ContextHooks/ContextHelper';
import {api_end_point_constants} from '../Utils/ApiConstants';

//--------- constant api key for map
// const API_KEY = 'AIzaSyCdi6CPk7xVX0AKavFQtXHMcBYBCCMaJHc';
const API_KEY = 'AIzaSyDV5QBZYiqzhMFBL-Rme6oeYoepT7ckiiI';

//---------- main componet

const GoogleMaps = ({navigation, route}) => {
  //---------- context, state, and veriables
  const {item} = route?.params;
  const {
    setLoading,
    appStateObject,
    currentUser,
    currentLocation,
    setCurrentUser,
    keyboardStatus,

    removeDataFromAppState,
    postData,
  } = ContextHelper();

  const [ContactData, setContactData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState(undefined);
  const [pickupPoint, setPickUpPoint] = React.useState({
    // start_lat: 22.725,
    // start_long: 75.8843969,
    start_address: 'indore',
  });
  const [dropPoint, setDropPoint] = React.useState({
    // end_lat: 22.693047,
    // end_long: 75.913519,
    end_address: 'bhopal',
  });

  //---------- life cycles
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
      data: {
        type: 'Mobile',
      },
    });
  }, []);
  React.useEffect(() => {
    // success
    if (appStateObject?.booking_poket?.response) {
      setLoading(false);
      setVisible(!visible);
      removeDataFromAppState({key: 'booking_poket'});
    }
  }, [appStateObject?.booking_poket]);
  //--------- user Booking
  console.log('keyboardStatus', keyboardStatus);
  const handleBooking = () => {
    if (pickupPoint?.start_lat && dropPoint?.end_lat) {
      postData({
        key: 'booking_poket',
        end_point: api_end_point_constants.booking,
        data: {
          userID: currentUser?.userID,
          vehicleID: item?.vehicleID,
          ...pickupPoint,
          ...dropPoint,
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
  console.log('-===-currentLocation=-=--', currentLocation);
  const workPlace = {
    description: 'Trabalho',
    geometry: {location: {lat: -29.1166504, lng: -51.1115736}},
  };
  const renderAutoComplete = isPickup => {
    return (
      <GooglePlacesAutocomplete
        minLength={3}
        // currentLocation={true}
        currentLocationLabel="Current location"
        predefinedPlaces={[workPlace]}
        placeholder="Pick Location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log('data==========', data);
          console.log('details==========', details);
        }}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        textInputProps={{
          placeholderTextColor: '#949292',
        }}
        // nearbyPlacesAPI="GooglePlacesSearch"
        styles={{
          // textInputContainer: {
          //   backgroundColor: '#F5F5F5',
          //   borderRadius: 20,
          //   shadowColor: '#000',
          //   shadowOffset: {width: 1, height: 1},
          //   shadowOpacity: 0.4,
          //   shadowRadius: 3,
          //   elevation: 5,
          // },
          textInput: {
            backgroundColor: '#F5F5F5',
            borderRadius: 20,

            color: '#5d5d5d',
            fontSize: 16,
            height: 45,
            paddingBottom: -12,
          },
          predefinedPlacesDescription: {
            color: 'blue',
          },
          listView: {
            // position: 'absolute',
            // top: 40,
            // color: 'blue',
          },
          description: {color: 'black'},
        }}
      />
    );
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          // showsCompass={true}
          initialRegion={{
            latitude: currentLocation?.coords?.latitude,
            longitude: currentLocation?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={e => {
            // if (selectedPoint === 'pickup') {
            console.log('=-=-=-pickup=-==->', e);

            setPickUpPoint({
              start_lat: e.latitude,
              start_long: e.longitude,
              start_address: 'bhopal',
            });
            // }
            // else if (selectedPoint === 'drop') {
            //   console.log('=-=-=-drop=-==->', e);

            //   setDropPoint({
            //     end_lat: e.latitude,
            //     end_long: e.longitude,
            //     end_address: 'bhopal',
            //   });
            // }
          }}
          // customMapStyle={mapStyle}
        >
          {/* {pickupPoint?.start_lat && pickupPoint?.start_long && ( */}
          <Marker
            draggable
            coordinate={{
              latitude: currentLocation?.coords?.latitude,
              longitude: currentLocation?.coords?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Pick up from here'}
            description={'press maker for current location'}
          />
          {/* )} */}

          {dropPoint?.end_lat && dropPoint?.end_long && (
            <Marker
              pinColor="blue"
              coordinate={{
                latitude: dropPoint?.end_lat,
                longitude: dropPoint?.end_long,
              }}
              title={'Droping here'}
              description={'This is a description of the marker'}
            />
          )}
        </MapView>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title="GoogleMaps" navigation={navigation} />

      {!selectedPoint ? null : (
        <View
          style={{
            position: 'absolute',
            top: '36%',
            alignSelf: 'center',
            zIndex: 1000,
          }}>
          <Image source={MarkerGoogle} style={{height: 40, width: 40}} />
        </View>
      )}

      <View style={styles.flexBoxs}>
        {renderGoogleMap()}
        <View
          style={
            keyboardStatus === 'Keyboard Shown'
              ? {
                  position: 'absolute',
                  // bottom: 120,
                  right: 30,
                  left: 30,
                  top: 0,
                }
              : {
                  position: 'absolute',
                  bottom: 120,
                  right: 30,
                  left: 30,
                }
          }>
          {renderAutoComplete(true)}
          {renderAutoComplete(false)}
        </View>
        {/* {renderAutoComplete()} */}
        <View style={{marginHorizontal: 40}}>
          <CustomButton
            onPress={() => {
              handleBooking();
            }}
            title={'Book Now'}
            width="100%"
          />
        </View>
      </View>
      {visible && (
        <ModalContainer
          isVisible={visible}
          render_view_key={'booking_done'}
          hideModal={() => setVisible(!visible)}
          content={ContactData}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default GoogleMaps;

const styles = StyleSheet.create({
  flexBoxs: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
