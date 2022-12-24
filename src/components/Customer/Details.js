import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

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

                        <Image
                            source={item?.icon}
                            style={{ alignSelf: "center" }}
                        />

                        <CustomText
                            text={item?.name}
                            style={{
                                color: COLORS.DARKGRAY,
                                fontSize: 30,
                            }}
                            font={_fontName.InterBold_700}
                        />

                        <CustomText
                            text={"Lorem ipsum dolor sit amet. Ut corporis aperiam non error quod ab esse distinctio qui consequuntur eaque. Rem consectetur harum in delectus accusamus et enim aliquid sit nostrum voluptas et officiis cumque. Ea minus autem qui accusamus assumenda qui molestiae quos vel atque totam? Eum facilis omnis et dolore unde ut perspiciatis voluptatibus vel esse voluptatem."}
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