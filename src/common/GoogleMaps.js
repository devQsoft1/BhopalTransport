import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

// common
import { _fontName } from "../assets/fonts/font";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import Header from "../common/Header";
import { _windowSize } from "../common/_windowSize";
import COLORS from "../constants/Colors";
import { Maps_icon, Pick_up } from "../constants/Images";
import ModalContainer from "./ModalContainer";
import TextField from "./TextField";




const GoogleMaps = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);


    return (
        <View style={{ flex: 1 }}>
            <Header
                title='GoogleMaps'
                navigation={navigation}
            />
            <View style={styles.flexBoxs}>

                <Image
                    source={Maps_icon}
                    style={{ height: 400, width: "100%" }}
                    resizeMode={"cover"}
                />
                <View style={{ position: "absolute", bottom: 120, right: 40, left: 40 }}>
                    <TextField placeholder='Pick Location' style={{ marginVertical: 13 }} />
                    <TextField placeholder='Drop Location' />

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