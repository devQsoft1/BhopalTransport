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
import CustomButton from "../../common/CustomButton";
import Header from "../../common/Header";
import { _windowSize } from "../common/_windowSize";
import { showMessage } from "react-native-flash-message";

// constants
import { Maps_icon, Pick_up, MarkerGoogle } from "../../constants/Images";

// components

// context
import ContextHelper from "../../ContextHooks/ContextHelper";
import { api_end_point_constants } from "../../Utils/ApiConstants";
import ModalContainer from "../../common/ModalContainer";
import TextField from "../../common/TextField";

//--------- constant api key for map
const API_KEY = "AIzaSyCooWOL4DXUg5UNAdY8jIOV9Dgwf57lfTM"

//---------- main componet

const StartMaps = ({ navigation, route }) => {

    //---------- context, state, and veriables
    const { type, item } = route?.params;
    let isVisible = type
    const {
        setLoading,
        appStateObject,
        currentUser,
        currentLocation,
        setCurrentUser,

        removeDataFromAppState,
        postData,
    } = ContextHelper()

    //---------- life cycles

    React.useEffect(() => {
        setLoading(false)
        // success
        if (appStateObject?.start_booking_status?.response) {
            showMessage({
                message: 'start booking successfully!',
                style: { backgroundColor: '#42AEEC' }
            });
            navigation.navigate("DrawerNavigation")
            removeDataFromAppState({ key: "start_booking_status" })
        } else if (appStateObject?.accept_booking_status?.response) {
            showMessage({
                message: 'Accept booking successfully!',
                style: { backgroundColor: '#42AEEC' }
            });
            removeDataFromAppState({ key: "accept_booking_status" })
        } else if (appStateObject?.reject_booking_status?.response) {
            showMessage({
                message: 'Reject booking successfully!',
                style: { backgroundColor: '#42AEEC' }
            });
            isVisible = "Accept"
            removeDataFromAppState({ key: "reject_booking_status" })
        }
    }, [appStateObject])
    //--------- user Booking

    const handleBooking = (status) => {

        let booking_status = status === '2' ? "accept_booking_status" : status === '5' ? "start_booking_status" : "reject_booking_status"

        postData({
            key: booking_status,
            end_point: api_end_point_constants.update_booking_status,
            data: {
                bookingID: item?.bookingID,
                userID: currentUser?.userID,
                status: status
            }
        })
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

                        latitude: currentLocation?.coords ? currentLocation?.coords?.latitude : 37.4220936,
                        longitude: currentLocation?.coords ? currentLocation?.coords?.longitude : -122.083922,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >


                    <Marker
                        coordinate={{
                            latitude: parseFloat(item?.start_lat),
                            longitude: parseFloat(item?.start_long)
                        }}
                        onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Pick up from here'}
                        description={'This is a description of the marker'}
                    />

                    <Marker
                        pinColor='blue'

                        coordinate={{
                            latitude: parseFloat(item?.end_lat),
                            longitude: parseFloat(item?.end_long)

                        }}

                        title={'Droping here'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                title='Pick-up Location'
                navigation={navigation}
            />


            <View style={styles.flexBoxs}>

                {
                    renderGoogleMap()
                }

                <View style={{ marginHorizontal: 40 }}>
                    {
                        isVisible === 'Location' ?
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                                <CustomButton
                                    onPress={() => { handleBooking('2') }}
                                    title={'Accept'}
                                    width='45%'
                                    borderRadius={30}
                                />

                                <CustomButton
                                    onPress={() => { handleBooking("3") }}
                                    title={'Reject'}
                                    width='45%'
                                    borderRadius={30}

                                />
                            </View>
                            :
                            <CustomButton
                                onPress={() => { handleBooking("5") }}
                                title={'Start'}
                                width='100%'
                                borderRadius={30}

                            />
                    }

                </View>

            </View>

        </View >
    )
}

export default StartMaps;

const styles = StyleSheet.create({

    flexBoxs: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

})
