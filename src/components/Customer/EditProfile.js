import * as React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

// common
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import Header from "../../common/Header";
import TextField from "../../common/TextField";
import { _windowSize } from "../../common/_windowSize";
import COLORS from "../../constants/Colors";
import { Pick_up, Profile_image } from "../../constants/Images";




const EditProfile = ({ navigation }) => {


    return (
        <View style={{ flex: 1 }}>
            <Header
                title='Edit Profile'
                navigation={navigation}
            />
            <View style={styles.flexBoxs}>


                <Image
                    source={Profile_image}
                    style={{ height: 140, width: 140, marginBottom: 7 }}
                />

                <CustomText
                    text={'Change profile photo'}
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 15,
                    }}
                    font={_fontName.InterMedium_500}
                />

                <TextField placeholder='Name' style={{ width: "100%", marginBottom: 25, marginTop: 45 }} />
                <TextField placeholder='Number' style={{ width: "100%" }} />

                <View style={{ width: '100%', marginTop: 45 }}>

                    <CustomButton
                        onPress={() => { navigation.goBack() }}
                        title={'Save'}
                        width='100%'
                    />
                </View>

            </View>

        </View >
    )
}

export default EditProfile;

const styles = StyleSheet.create({

    flexBoxs: {
        // alignItems: "center",
        paddingTop: 40,
        marginHorizontal: 40,
        flex: 1,
        alignItems: "center",
        marginBottom: 10,
    },

})