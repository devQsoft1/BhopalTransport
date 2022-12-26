import * as React from "react";
import { Image, ScrollView, StyleSheet, View, Dimensions } from "react-native";

// common
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import { _windowSize } from "../../common/_windowSize";
import COLORS from "../../constants/Colors";
import { Pick_up } from "../../constants/Images";




const Details = ({ navigation, route }) => {

    const { item } = route.params;
    return (
        <View style={{ flex: 1 }}>
            <Header
                title='Details'
                navigation={navigation}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.flexBoxs}>

                    <View>

                        <View
                            style={{
                                height: 200,
                                width: _windowSize.width - 40,
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={{ uri: item?.path + item?.image }}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </View>

                        <CustomText
                            text={item?.name}
                            style={{
                                color: COLORS.DARKGRAY,
                                fontSize: 30,
                            }}
                            font={_fontName.InterBold_700}
                        />

                        <CustomText
                            text={item?.description}
                            style={{
                                color: '#949292',
                                fontSize: 15,
                                marginTop: 10,
                                marginBottom: 30
                            }}
                            font={_fontName.InterMedium_500}
                        />
                    </View>
                    <View style={{ width: '100%' }}>

                        <CustomButton
                            onPress={() => { navigation.navigate('GoogleMaps') }}
                            title={'Book Now'}
                            width='100%'
                        />
                    </View>

                </View>

            </ScrollView >
        </View >
    )
}

export default Details;

const styles = StyleSheet.create({

    flexBoxs: {
        // alignItems: "center",
        paddingTop: 40,
        marginHorizontal: 40,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 10,
    },

})