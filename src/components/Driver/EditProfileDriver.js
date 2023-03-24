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
import ContextHelper from "../../ContextHooks/ContextHelper";
import { handleImagePicker } from "../../Utils/Helper";
import { api_end_point_constants } from "../../Utils/ApiConstants"
import { showMessage } from "react-native-flash-message";


const EditProfileDriver = ({ navigation }) => {
    const {
        currentUser,
        postData,
        appStateObject,
        setLoading,
        removeDataFromAppState
    } = ContextHelper()
    const [imageUri, setImageUri] = React.useState(null);
    const [data, setData] = React.useState({
        name: currentUser?.name,
        mobile: currentUser?.mobile,
        profile_image: currentUser?.profile_image,
        aadhar: currentUser?.aadhar,
        driving_lincense: currentUser?.driving_lincense,
        vehicle_registration: currentUser?.vehicle_registration
    })

    //---------- life cycles
    React.useEffect(() => {
        // success
        if (appStateObject?.update_profile_driver?.response) {
            setLoading(false)
            showMessage({
                message: 'Congratulation! Profile edited successfully!',
                style: { backgroundColor: '#42AEEC' }
            });
            setImageUri(null)
            removeDataFromAppState({key: 'update_profile_driver'});
        }
      
    }, [appStateObject?.update_profile_driver])
    //--------- user action

    const SaveProfile = () => {
        if (data?.mobile, data?.name && data?.profile_image && data?.driving_lincense, data?.aadhar && data?.vehicle_registration) {
            postData({
                key: 'update_profile_driver',
                end_point: api_end_point_constants.update_profile_driver,
                data: {
                    ...data,
                    userID: currentUser?.userID
                }
            })
        } else {
            // show error
            showMessage({
                message: 'All fields are required',
                type: 'danger',
            });
        }
    };


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header
                title='Edit Profile'
                navigation={navigation}
            />
            <View style={styles.flexBoxs}>

                <TouchableOpacity style={{ height: 140, width: 140, borderRadius: 80, overflow: "hidden", marginBottom: 7 }}
                    onPress={() => handleImagePicker({
                        call_back: ({ fileName, status, msg ,url}) => {
                            if (status === true) {
                                setImageUri(url)
                                setData(
                                    {
                                        ...data,
                                        profile_image: fileName
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}
                >
                 {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={{height: '100%', width: '100%', marginBottom: 7}}
            />
          ) : (
            <Image
              source={
                data?.profile_image?.length
                  ? {uri: currentUser?.path + data?.profile_image}
                  : Profile_image
              }
              style={{height: '100%', width: '100%', marginBottom: 7}}
            />
          )}
                </TouchableOpacity>

                <CustomText
                    text={'Change profile photo'}
                    style={{
                        color: COLORS.DARKGRAY,
                        fontSize: 15,
                    }}
                    font={_fontName.InterMedium_500}
                />

                <TextField placeholder='Name' style={{ width: "100%", marginBottom: 25, marginTop: 45 }}
                    value={data?.name}
                    onChangeText={(text) => {
                        setData({
                            ...data,
                            name: text,
                        })
                    }}
                />
                <TextField placeholder='Number' style={{ width: "100%" }}
                    value={data?.mobile}
                    onChangeText={(text) => {
                        setData({
                            ...data,
                            mobile: text,
                        })
                    }}
                />

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ fileName, status, msg }) => {
                            if (status === true) {
                                setData(
                                    {
                                        ...data,
                                        aadhar: fileName
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}
                >
                    <CustomUploadImageField lebel='Adhar Card' image={data.aadhar&&"..."+data?.aadhar?.slice(-28)} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ fileName, status, msg }) => {
                            if (status === true) {
                                setData(
                                    {
                                        ...data,
                                        driving_lincense: fileName
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}>
                    <CustomUploadImageField lebel='Driving license'  image={data?.driving_lincense&&"..."+data?.driving_lincense?.slice(-28)}/>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ fileName, status, msg }) => {
                            if (status === true) {
                                setData(
                                    {
                                        ...data,
                                        vehicle_registration: fileName
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}>
                    <CustomUploadImageField lebel={'Vehicle license registration'} image={data?.vehicle_registration && "..."+data?.vehicle_registration?.slice(-28)} />
                </TouchableOpacity>

                <View style={{ width: '100%', marginTop: 25 }}>
                    <CustomButton
                        onPress={() => { SaveProfile() }}
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