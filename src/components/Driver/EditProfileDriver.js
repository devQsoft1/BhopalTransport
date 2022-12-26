import * as React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

// common
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";
import CustomText from "../../common/CustomText";
import CustomUploadImageField from "../../common/CustomUploadImageField";
import Header from "../../common/Header";
import TextField from "../../common/TextField";
import { _windowSize } from "../../common/_windowSize";
import COLORS from "../../constants/Colors";
import { Pick_up, Profile_image } from "../../constants/Images";
import { handleImagePicker } from "../../Utils/Helper";




const EditProfileDriver = ({ navigation }) => {


    // Selection of the image
    const handleSelectedImage = ({ url, status, msg }) => {
        console.log("url===", url, '---status', status, '-----msg', msg);


    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

                <TouchableOpacity style={{ width: "100%" }} onPress={() => handleImagePicker({ call_back: handleSelectedImage })}>
                    <CustomUploadImageField lebel='Adhar Card' />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}>
                    <CustomUploadImageField lebel='Driving license' />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}>
                    <CustomUploadImageField lebel='Vehicle license registration' />
                </TouchableOpacity>

                <View style={{ width: '100%', marginTop: 25 }}>
                    <CustomButton
                        onPress={() => { navigation.goBack() }}
                        title={'Save'}
                        width='100%'
                    />
                </View>

            </View>

        </ScrollView >
    )
}

export default EditProfileDriver;

const styles = StyleSheet.create({

    flexBoxs: {
        // alignItems: "center",
        paddingTop: 40,
        marginHorizontal: 40,
        flex: 1,
        alignItems: "center",
        marginBottom: 10,
    },
    imageBox: {
        alignSelf: "flex-start",
        marginVertical: 25,
        width: "100%"
    },
    dashed: {
        borderStyle: 'dashed',
        borderRadius: 20,
        borderWidth: 2,
        height: 45,
        borderColor: "#D9D9D9",
        marginTop: 2,
        justifyContent: "center"
    }

})