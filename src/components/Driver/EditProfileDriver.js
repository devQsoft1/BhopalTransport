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
    const [aadhar, setAadhaar] = React.useState({ name: currentUser?.aadhar});
    const [Driving, setDriving] = React.useState({ name: currentUser?.driving_lincense});
    const [registration, setIRegistration] = React.useState({ name: currentUser?.vehicle_registration});
    const [data, setData] = React.useState({
        name: currentUser?.name,
        email: currentUser?.email,
        // profile_image: currentUser?.profile_image,
        // aadhar: currentUser?.aadhar,
        // driving_lincense: currentUser?.driving_lincense,
        // vehicle_registration: currentUser?.vehicle_registration
    })
console.log('===========',currentUser,);
    //---------- life cycles
    React.useEffect(() => {
        // success
        if (appStateObject?.update_profile_driver?.response) {
            let userData=appStateObject?.update_profile_driver?.response;
            setLoading(false)
            setData({
                name:userData?.name,
                email:userData?.email
            })
            setAadhaar({name:userData?.aadhar})
            setDriving({name:userData?.driving_lincense})
            setIRegistration({name:userData?.vehicle_registration})
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
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (data?.email, data?.name && imageUri?.name && Driving?.name, aadhar?.name && registration?.name) {
            if(reg.test(data?.email) === false){
                showMessage({
                    message: "Please enter valid email address",
                    type: 'danger',
                });
                return;
            };
            postData({
                key: 'update_profile_driver',
                end_point: api_end_point_constants.update_profile_driver,
                data: {
                    userID: currentUser?.userID,
                    email:data?.email,
                    profile_image:{
                        uri:imageUri?.uri,
                        type:imageUri?.type,
                        name:imageUri?.fileName,
                       },
                    aadhar:aadhar,
                    driving_lincense:Driving,
                    vehicle_registration:registration,
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

console.log("DddDDDDD",Driving);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header
                title='Edit Profile'
                navigation={navigation}
            />
            <View style={styles.flexBoxs}>

                <TouchableOpacity style={{ height: 140, width: 140, borderRadius: 80, overflow: "hidden", marginBottom: 7 }}
                    onPress={() => handleImagePicker({
                        call_back: ({ file, status, msg}) => {
                            if (status === true) {
                                setImageUri(file)
                            } else {
                                alert(msg)
                            }
                        }
                    })}
                >
                 {imageUri?.uri ? (
            <Image
              source={{uri: imageUri?.uri}}
              style={{height: '100%', width: '100%', marginBottom: 7}}
            />
          ) : (
            <Image
              source={
                currentUser?.profile_image?.length
                  ? {uri: currentUser?.path + currentUser?.profile_image}
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
                <TextField placeholder='Email' style={{ width: "100%" }}
                    value={data?.email}
                    onChangeText={(text) => {
                        setData({
                            ...data,
                            email: text,
                        })
                    }}
                />

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ file, status, msg}) => {
                            if (status === true) {
                                setAadhaar(
                                    {
                         uri:file?.uri,
                        type:file?.type,
                        name:file?.fileName,
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}
                >
                    <CustomUploadImageField lebel='Adhar Card' image={aadhar?.name&&"..."+aadhar?.name?.slice(-28)} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ file, status, msg}) => {
                            if (status === true) {
                                setDriving(
                                    {
                         uri:file?.uri,
                        type:file?.type,
                        name:file?.fileName,
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}>
                    <CustomUploadImageField lebel='Driving license'  image={Driving?.name&&"..."+Driving?.name?.slice(-28)}/>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%" }}
                    onPress={() => handleImagePicker({
                        call_back: ({ file, status, msg}) => {
                            if (status === true) {
                                setIRegistration(
                                    {
                         uri:file?.uri,
                        type:file?.type,
                        name:file?.fileName,
                                    }
                                )
                            } else {
                                alert(msg)
                            }
                        }
                    })}>
                    <CustomUploadImageField lebel={'Vehicle license registration'} image={registration?.name && "..."+registration?.name?.slice(-28)} />
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