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

// constants
import COLORS from "../constants/Colors";
import { Maps_icon, Pick_up } from "../constants/Images";

// components
import ModalContainer from "./ModalContainer";
import TextField from "./TextField";

// context
import ContextHelper from "../ContextHooks/ContextHelper";

//--------- constant api key for map
const API_KEY = "AIzaSyCooWOL4DXUg5UNAdY8jIOV9Dgwf57lfTM"

//---------- main componet

const GoogleMaps = ({ navigation }) => {


    //---------- context, state, and veriables



    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };

    const [visible, setVisible] = React.useState(false);

    const {
        setLoading,
        appStateObject,
        currentUser,
        currentLocation,
        setCurrentUser,
    } = ContextHelper()

    console.log('currentLocation', currentLocation)


    const getGoogleMap = () => {

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
                        latitude: currentLocation?.coords?.latitude,
                        longitude: currentLocation?.coords?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    onRegionChangeComplete={(e) => {

                        console.log(e)
                    }}
                // customMapStyle={mapStyle}
                >
                    <Marker
                        coordinate={{
                            latitude: currentLocation?.coords?.latitude,
                            longitude: currentLocation?.coords?.longitude,
                        }}
                        onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />




                    {/* <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={API_KEY}
                    /> */}

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
            <View style={styles.flexBoxs}>

                {
                    getGoogleMap()
                }

                <View
                    style={{ position: "absolute", bottom: 120, right: 40, left: 40 }}
                >

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
                    {/* <TextField placeholder='Drop Location' /> */}
                    {/* <TextField placeholder='Pick Location' style={{ marginVertical: 13 }} />
                    <TextField placeholder='Drop Location' /> */}

                </View>

                <View style={{ marginHorizontal: 40 }}>

                    <CustomButton
                        onPress={() => { setVisible(!visible) }}
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