import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import { E_V, Menu_Icon, Pick_up, Tata_ace, Tenker, Threee } from "../../constants/Images";
import VehicleTile from "./VehicleTile";

// common
// common



const CustomerHome = ({ navigation }) => {
    return (
        <>
            <Header
                leftIcon={Menu_Icon}
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
                            />
                        </TouchableOpacity>

                    } />

            </View>
        </>
    )
}

export default CustomerHome;

const data = [
    {
        id: 0,
        name: "Bolero Pik-Up",
        icon: Pick_up
    }, {
        id: 1,
        name: "Ev Vehicle",
        icon: E_V
    }, {
        id: 2,
        name: "Water Tanker",
        icon: Tenker
    }, {
        id: 3,
        name: "Three Vehicle Auto",
        icon: Threee
    }, {
        id: 4,
        name: "Tata ace ",
        icon: Tata_ace
    },

]