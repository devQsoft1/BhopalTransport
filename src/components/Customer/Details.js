//---------- import

// react
import * as React from "react";
import { Image, ScrollView, StyleSheet, View, Dimensions } from "react-native";

// assets
import { _fontName } from "../../assets/fonts/font";

// common
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import { _windowSize } from "../../common/_windowSize";

// constants
import COLORS from "../../constants/Colors";
import { Pick_up } from "../../constants/Images";
import ContextHelper from "../../ContextHooks/ContextHelper";

//---------- component

const Details = ({ navigation, route }) => {

    //---------- state, veriable, context and hooks
    const {
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,
        currentLocation,
        setLoading,
        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()
    console.log('currentLocation====', currentLocation);
    const { item } = route.params;

    //---------- main view

    return (
        <View style={{ flex: 1 }}>
            <Header
                title='Details'
                navigation={navigation}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.flexBoxs}>

                    <View
                        style={{
                            flex: 1,
                        }}
                    >

                        <View
                            style={{
                                height: '50%',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={{ uri: item?.path + item?.image }}
                                style={{ height: '100%', width: '100%' }}
                                resizeMode={'contain'}
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
                            onPress={() => {
                                navigation.navigate('GoogleMaps', { item })
                            }}
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
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 10,
    },

})