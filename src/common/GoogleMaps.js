//-------- imports

// react
import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

// lib
import MapView, {Marker, Polyline} from 'react-native-maps';
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
import {
  Maps_icon,
  Pick_up,
  MarkerGoogle,
  locationPin,
} from '../constants/Images';

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
    getCurrentLocation,
  } = ContextHelper();
  const mapRef = React.useRef(null);

  const [ContactData, setContactData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [isSelectCurentLoca, setisSelectCurentLoca] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState(undefined);
  const [pickupPoint, setPickUpPoint] = React.useState({});
  const [dropPoint, setDropPoint] = React.useState({});

  //---------- life cycles
  React.useEffect(() => {
    // success
    if (appStateObject?.Contact_data_pocket?.response) {
      setLoading(false);
      setContactData(appStateObject?.Contact_data_pocket?.response);
    }
  }, [appStateObject?.Contact_data_pocket]);

  React.useEffect(() => {
    setPickUpPoint({
      start_lat: currentLocation?.coords?.latitude,
      start_long: currentLocation?.coords?.longitude,
      start_address: '',
    });
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

  console.log('start-pick', dropPoint);
  const renderAutoComplete = isPickup => {
    return (
      <GooglePlacesAutocomplete
        // currentLocationLabel="Current location"
        // currentLocation={true}
        minLength={3}
        placeholder={
          isSelectCurentLoca && isPickup ? 'Curent Location' : 'Pick Location'
        }
        autoFocus={true}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log('data==========');
          console.log('details==========', details.adr_address);
          if (isPickup) {
            mapRef.current.animateToRegion(
              {
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              3 * 1000,
            );
            setPickUpPoint({
              start_lat: details?.geometry?.location?.lat,
              start_long: details?.geometry?.location?.lng,
              start_address: details?.formatted_address,
            });
          } else {
            setDropPoint({
              end_lat: details?.geometry?.location?.lat,
              end_long: details?.geometry?.location?.lng,
              end_address: details?.formatted_address,
            });
          }
        }}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        query={{
          key: API_KEY,
          language: 'en',
          components: 'country:in',
        }}
        textInputProps={{
          placeholderTextColor:
            isSelectCurentLoca && isPickup ? '#000' : '#949292',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        styles={{
          containerTop: {
            height: 0,
            flexDirection: 'row',
            padding: 25,
            paddingBottom: 50,
            marginTop: 20,
            zIndex: 200,
          },
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
          // listView: {
          //   position: 'absolute',
          //   top: 40,
          //   color: 'blue',
          // },
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
          ref={mapRef}
          style={{
            width: '100%',
            height: '80%',
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider={MapView.PROVIDER_GOOGLE}
          // showsCompass={true}
          initialRegion={{
            latitude: pickupPoint?.start_lat || 22.7249726,
            longitude: pickupPoint?.start_long || 75.8843731,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {pickupPoint?.start_lat && pickupPoint?.start_long && (
            <Marker
              draggable
              coordinate={{
                latitude: pickupPoint?.start_lat,
                longitude: pickupPoint?.start_long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              // title={pickupPoint?.start_address || ''}
              description={pickupPoint?.start_address || ''}
              // pinColor={'green'}
            />
          )}
          {dropPoint?.end_lat && dropPoint?.end_long && (
            <Marker
              draggable
              coordinate={{
                latitude: dropPoint?.end_lat,
                longitude: dropPoint?.end_long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              // title={dropPoint?.end_address}
              description={dropPoint?.end_address}
              pinColor={'green'}></Marker>
          )}
          {dropPoint?.end_lat &&
            dropPoint?.end_long &&
            pickupPoint?.start_lat &&
            pickupPoint?.start_long && (
              <MapViewDirections
                origin={{
                  latitude: pickupPoint?.start_lat,
                  longitude: pickupPoint?.start_long,
                }}
                destination={{
                  latitude: dropPoint?.end_lat,
                  longitude: dropPoint?.end_long,
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
