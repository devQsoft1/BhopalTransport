

import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import { E_V, Menu_Icon, Pick_up, Tata_ace, Tenker, Threee } from "../../constants/Images";
import ContextHelper from "../../ContextHooks/ContextHelper";
import { api_end_point_constants } from "../../Utils/ApiConstants";
import VehicleTile from "./VehicleTile";

// common
// common



const MyBooking = ({ navigation }) => {
    //---------- state, veriable, context and hooks
    const [bookingData, setBookingData] = React.useState([])

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
    } = ContextHelper()


    //---------- life cycles

    React.useEffect(() => {

        getHomeDataFromServer()
    }, [])

    React.useEffect(() => {

        // success
        if (appStateObject?.customer_booking_data_pocket?.response) {

            setLoading(false)
            setBookingData(appStateObject?.customer_booking_data_pocket?.response)
        }
    }, [appStateObject?.customer_booking_data_pocket])



    const getHomeDataFromServer = () => {

        postData({
            key: 'customer_booking_data_pocket',
            end_point: api_end_point_constants.show_vehicle,
            data: {
                userID: currentUser.userID,
            }
        })
    }
    console.log('========bookingData', bookingData);
    return (
        <>
            <Header
                title='My Booking'
                navigation={navigation}
            />

            <View style={{ marginHorizontal: 20, flex: 1 }}>
                <FlatList
                    style={{ flex: 1, paddingTop: 57 }}
                    data={bookingData.filter((item) => item?.booking_status === true)}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 35 }} />}
                    renderItem={({ item, indx }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>

                            <VehicleTile
                                icon={item?.path + item?.image}
                                title={item.name}
                                status={'running'}
                            />
                        </TouchableOpacity>

                    } />

            </View>
        </>
    )
}

export default MyBooking;

const data = [
    {
        id: 0,
        name: "Bolero Pik-Up",
        icon: Pick_up,
        status: "Running"
    }, {
        id: 2,
        name: "Water Tanker",
        icon: Tenker,
        status: "Running"

    }, {
        id: 3,
        name: "Three Vehicle Auto",
        icon: Threee,
        status: "Running"

    }, {
        id: 4,
        name: "Tata ace ",
        icon: Tata_ace,
        status: "Running"

    },

]