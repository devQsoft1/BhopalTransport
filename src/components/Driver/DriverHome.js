import * as React from "react";
import { FlatList, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomText from "../../common/CustomText";
import COLORS from "../../constants/Colors";
import Header from "../../common/Header";
import DriverTile from "./DriverTile";
import { Menu_Icon } from "../../constants/Images";
// common


// common



const DriverHome = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Header
                title='HOME'
                leftIcon={Menu_Icon}
                navigation={navigation}
            />

            <View style={{ marginHorizontal: 20, flex: 1 }}>
                <FlatList
                    style={{ flex: 1, paddingTop: 50 }}
                    data={data}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 70 }} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
                    renderItem={({ item, indx }) =>
                        <DriverTile title={item.name} status1={item.status1} status2={item.status2} status3={item.status3} />

                    } />

            </View>



            {/* <DriverTile title={"Ravi Sharma"} /> */}


        </View>
    )
}

export default DriverHome;

const data = [
    {
        id: 0,
        name: "Ravi Sharma",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    }, {
        id: 1,
        name: "Vishal Sen",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    }, {
        id: 2,
        name: "Jivan Singh",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    }, {
        id: 3,
        name: "Sonu Thakur",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    }, {
        id: 4,
        name: "Harry Verma",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    },
    {
        id: 5,
        name: "Jugal Solanki",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    },
    {
        id: 6,
        name: "Nitin Pawar",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    },
    {
        id: 7,
        name: "Deepak Yadav",
        status1: "Accept",
        status2: "Reject",
        status3: "Location"
    }

]