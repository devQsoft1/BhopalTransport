import * as React from "react";
import { Text, View } from "react-native";
import { _fontName } from "../../assets/fonts/font";
import CustomButton from "../../common/CustomButton";

// common
import CustomText from "../../common/CustomText";
import HeaderFirst from "../../common/HeaderFirst";
import ContextHelper from "../../ContextHooks/ContextHelper";

// common



const RoleSelection = ({ navigation }) => {
    //---------- state, veriable, context and hooks
    const {
        appStateObject,
        currentUser,

        postData,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()

    console.log("=-currentUser AT ROLE SELECTION =-", currentUser);

    return (
        <View style={{ flex: 1 }} >

            <HeaderFirst
                isBack={false}
            />
            <View style={{ justifyContent: "center", flex: 1, marginHorizontal: 33 }}>

                <CustomText
                    text="Ea quia velit qui exercitationem autem a modi"
                    style={{
                        fontSize: 12,
                        textAlign: 'center',
                        paddingBottom: 20
                    }}
                    font={_fontName.InterRegular_400}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <>
                        <CustomButton
                            onPress={() => {
                                setCurrentUser({
                                    user_type: 'customer'
                                })
                                navigation.navigate('Login')
                            }}
                            title={'Customer'}
                            width={140}
                        />
                    </>

                    <CustomButton
                        onPress={() => { }}
                        title={'Driver'}
                        width={140}
                    />
                </View>
            </View>

        </View>
    )
}

export default RoleSelection;