import * as React from "react";
import { FlatList, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import COLORS from "../../constants/Colors";
import Header from "../../common/Header";
import DriverTile from "./DriverTile";
import { Menu_Icon } from "../../constants/Images";
import BookingTile from "./BookingTile"
// common


// common



const MyBookingsDriver = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Header
                title='MyBooking'
                navigation={navigation}
            />

            <View style={{ marginHorizontal: 10, flex: 1 }}>
                <FlatList
                    style={{ flex: 1, paddingTop: 50 }}
                    data={data}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 70 }} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
                    renderItem={({ item, indx }) =>
                        <BookingTile title={item.name} status={item.status} />

                    } />

            </View>



            {/* <DriverTile title={"Ravi Sharma"} /> */}


        </View>
    )
}

export default MyBookingsDriver;

const data = [
    {
        id: 0,
        name: "Ravi Sharma",
        status: "Completed"
    }, {
        id: 1,
        name: "Vishal Sen",
        status: "Completed"
    }, {
        id: 2,
        name: "Jivan Singh",
        status: "Completed"
    }, {
        id: 3,
        name: "Sonu Thakur",
        status: "Completed"
    }, {
        id: 4,
        name: "Harry Verma",
        status: "Completed"
    },
    {
        id: 5,
        name: "Jugal Solanki",
        status: "Completed"
    },
    {
        id: 6,
        name: "Nitin Pawar",
        status: "Completed"

    },
    {
        id: 7,
        name: "Deepak Yadav",
        status: "Completed"
    }

]