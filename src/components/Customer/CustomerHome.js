//---------- imports

// react
import * as React from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// assets
import { _fontName } from "../../assets/fonts/font";

// common
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";

// constants
import {
    E_V,
    Menu_Icon,
    Pick_up,
    Tata_ace,
    Tenker,
    Threee
} from "../../constants/Images";

// components
import VehicleTile from "./VehicleTile";

//---------- main component

const CustomerHome = ({ navigation, data }) => {

    //---------- main view

    return (
        <>
            <Header
                leftIcon={Menu_Icon}
            />

            <View
                style={{ marginHorizontal: 20, flex: 1 }}
            >
                <FlatList
                    style={{ flex: 1, paddingTop: 57 }}
                    data={data}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 35 }} />}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Details', { item })}
                        >
                            <VehicleTile
                                icon={item?.path + item?.image}
                                title={item?.name}
                                description={item?.description}
                            />
                        </TouchableOpacity>

                    }
                />
            </View>
        </>
    )
}

export default CustomerHome;

