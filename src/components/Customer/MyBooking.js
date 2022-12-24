

import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import { E_V, Menu_Icon, Pick_up, Tata_ace, Tenker, Threee } from "../../constants/Images";
import VehicleTile from "./VehicleTile";

// common
// common



const MyBooking = ({ navigation }) => {
    return (
        <>
            <Header
                title='My Booking'
                navigation={navigation}
            />

            <View style={{ marginHorizontal: 20, flex: 1 }}>
                <FlatList
                    style={{ flex: 1, paddingTop: 57 }}
                    data={data}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 35 }} />}
                    renderItem={({ item, indx }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>

                            <VehicleTile
                                icon={item?.icon}
                                title={item.name}
                                status={item?.status}
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