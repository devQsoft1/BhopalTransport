//-------- imports

// react
import * as React from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";

// lib
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// assets
import { _fontName } from "../assets/fonts/font";

// common
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import Header from "../common/Header";
import { _windowSize } from "../common/_windowSize";
import { showMessage } from "react-native-flash-message";

// constants
import COLORS from "../constants/Colors";
import { Maps_icon, Pick_up, MarkerGoogle } from "../constants/Images";

// components
import ModalContainer from "./ModalContainer";
import TextField from "./TextField";

// context
import ContextHelper from "../ContextHooks/ContextHelper";
import { api_end_point_constants } from "../Utils/ApiConstants";

//--------- constant api key for map
const API_KEY = "AIzaSyCooWOL4DXUg5UNAdY8jIOV9Dgwf57lfTM"

//---------- main componet

const GoogleMaps = ({ navigation, route }) => {

    //---------- context, state, and veriables
    const { item } = route?.params;
    const {
        setLoading,
        appStateObject,
        currentUser,
        currentLocation,
        setCurrentUser,

        postData,
    } = ContextHelper()
    console.log('=---=-=-=-route', currentLocation);

    const [visible, setVisible] = React.useState(false);
    const [selectedPoint, setSelectedPoint] = React.useState(undefined);
    const [pickupPoint, setPickUpPoint] = React.useState({
        // start_lat: 22.725,
        // start_long: 75.8843969,
        start_address: 'indore'
    });
    const [dropPoint, setDropPoint] = React.useState({
        // end_lat: 22.693047,
        // end_long: 75.913519,
        end_address: 'bhopal'
    });




    //---------- life cycles

    React.useEffect(() => {

        // success
        if (appStateObject?.booking_poket?.response) {
            setLoading(false)
            setVisible(!visible)
        }
    }, [appStateObject?.booking_poket])

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
                    ...dropPoint
                }
            })

        } else {

            // show error
            showMessage({
                message: 'All fields are required',
                type: 'danger',
            })
        }


    }

    const renderAutoComplete = () => {

        return (
            <GooglePlacesAutocomplete
                placeholder='Pick Location'
                fetchDetails={true}
                onPress={(data, details = null) => console.log(data, details)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}

                predefinedPlaces={[
                    {
                        type: 'favorite',
                        description: 'Dominos Pizza',
                        geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
                    },
                    {
                        type: 'favorite',
                        description: 'Chicken Republic',
                        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
                    },
                ]}

                listEmptyComponent={() => (
                    <View style={{ flex: 1 }}>
                        <Text>No results were found</Text>
                    </View>
                )}

                query={{
                    key: API_KEY,
                    language: 'en',
                }}



                textInputProps={{

                    placeholderTextColor: '#949292'
                }}

                styles={{
                    textInputContainer: {
                        backgroundColor: "#F5F5F5",
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                    },
                    textInput: {
                        backgroundColor: "#F5F5F5",
                        borderRadius: 20,

                        color: '#5d5d5d',
                        fontSize: 16,
                        height: 38,
                        paddingBottom: -12

                    },
                    predefinedPlacesDescription: {
                        color: '#000',
                    },
                    // listView: {
                    //     // position: 'absolute',
                    //     // top: 40,
                    // },
                    row: {
                        // backgroundColor: '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        zIndex: 1000,
                        // elevation: 10
                    }
                }}
            />
        )
    }

    const renderGoogleMap = () => {

        return (
            <View
                style={{
                    flex: 1,
                }}
            >

                <MapView
                    style={{
                        width: '100%',
                        height: '80%'
                    }}
                    initialRegion={{

                        // latitude: 37.4220936,
                        // longitude: -122.083922,

                        latitude: currentLocation?.coords ? currentLocation?.coords?.latitude : 37.4220936,
                        longitude: currentLocation?.coords ? currentLocation?.coords?.longitude : -122.083922,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    onRegionChangeComplete={(e) => {

                        console.log('=-=-=-=-==->', e)

                        if (selectedPoint === 'pickup') {

                            setPickUpPoint({
                                start_lat: e.latitude,
                                start_long: e.longitude,
                                start_address: 'bhopal',
                            })
                        } else if (selectedPoint === 'drop') {

                            setDropPoint({
                                end_lat: e.latitude,
                                end_long: e.longitude,
                                end_address: 'bhopal',
                            })
                        }
                    }}
                // customMapStyle={mapStyle}
                >

                    {
                        pickupPoint?.start_lat && pickupPoint?.start_long &&
                        <Marker
                            coordinate={{
                                latitude: pickupPoint?.start_lat,
                                longitude: pickupPoint?.start_long,
                            }}
                            onDragEnd={
                                (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                            }
                            title={'Pick up from here'}
                            description={'This is a description of the marker'}
                        />
                    }

                    {
                        dropPoint?.end_lat && dropPoint?.end_long &&
                        <Marker
                            pinColor='blue'

                            coordinate={{
                                latitude: dropPoint?.end_lat,
                                longitude: dropPoint?.end_long,
                            }}

                            title={'Droping here'}
                            description={'This is a description of the marker'}
                        />
                    }

                </MapView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                title='GoogleMaps'
                navigation={navigation}
            />

            {
                !selectedPoint ?
                    null
                    :
                    <View
                        style={{
                            position: 'absolute',
                            top: '36%',
                            alignSelf: 'center',
                            zIndex: 1000
                        }}
                    >
                        <Image
                            source={MarkerGoogle}
                            style={{ height: 40, width: 40 }}
                        />
                    </View>
            }


            <View style={styles.flexBoxs}>

                {
                    renderGoogleMap()
                }

                <View
                    style={{ position: "absolute", bottom: 120, right: 40, left: 40 }}
                >

                    <TextField

                        placeholder='Pick Location'
                        style={{ marginVertical: 13 }}
                        onFocus={() => {

                            setSelectedPoint('pickup')
                        }}
                        onBlur={() => {
                            setSelectedPoint(undefined)
                        }}
                    />
                    <TextField
                        onFocus={() => {
                            setSelectedPoint('drop')
                        }}
                        placeholder='Drop Location'
                        onBlur={() => {
                            setSelectedPoint(undefined)
                        }}
                    />

                </View>

                <View style={{ marginHorizontal: 40 }}>

                    <CustomButton
                        onPress={() => { handleBooking() }}
                        title={'Book Now'}
                        width='100%'
                    />
                </View>

            </View>
            {
                visible &&
                <ModalContainer
                    isVisible={visible}
                    render_view_key={'booking_done'}
                    hideModal={() => setVisible(!visible)}
                    content={PhoneNumber}
                    navigation={navigation}
                />
            }

        </View >
    )
}

export default GoogleMaps;

const styles = StyleSheet.create({

    flexBoxs: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

})
const PhoneNumber = [
    {
        id: 1,
        number: '+91 8599625648',
    }, {
        id: 2,
        number: '+91 8745215691',
    }, {
        id: 3,
        number: '+91 65842569810',
    },

]