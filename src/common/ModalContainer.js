//---------- imports

// react
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import { _fontName } from "../assets/fonts/font";
import COLORS from "../constants/Colors";
import { Phone_icon, Sucsess_icon } from "../constants/Images";

// third party lib

// icon and images

// common
import CustomText from "./CustomText";

// styles

// context

//---------- component

function ModalContainer({ navigation, render_view_key, content, isVisible, hideModal, }) {

    //---------- state, context and hooks

    const [visible, setVisible] = React.useState(isVisible);

    //---------- life cycle

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    //---------- helper: user's actions

    const showModal = () => setVisible(true);


    const renderModalContent = () => {

        return (
            <>
                <Image
                    source={Sucsess_icon}
                    style={{ position: "absolute", top: -50 }}
                />
                <View style={{ alignItems: "center" }}>
                    <CustomText
                        text={"Thank You "}
                        style={{
                            color: COLORS.DARKGRAY,
                            fontSize: 35,
                        }}
                        font={_fontName.InterBold_700}
                    />

                    <CustomText
                        text={"Your Booking Is Successful "}
                        style={{
                            color: COLORS.LIGHTGRAY,
                            fontSize: 15,
                            marginBottom: 10
                        }}
                        font={_fontName.InterBold_700}
                    />
                    <CustomText
                        text={"Please Contact This No. To Procced \n This Booking"}
                        style={{
                            color: COLORS.DARKGRAY,
                            fontSize: 15,
                            textAlign: "center",
                            marginBottom: 10

                        }}
                        font={_fontName.InterBold_700}
                    />
                    {
                        content?.map((item) => (


                            <View key={item?.id} style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center" }}>

                                <Image
                                    source={Phone_icon}
                                // style={{ alignSelf: "center" }}
                                />
                                <CustomText
                                    text={item?.number}
                                    style={{
                                        color: COLORS.DARKGRAY,
                                        fontSize: 20,
                                        marginLeft: 4

                                    }}
                                    font={_fontName.InterBold_700}
                                />
                            </View>


                        ))
                    }
                </View  >
            </>

        )
    }


    const renderContent = (key) => {

        switch (key) {

            case 'booking_done':

                return renderModalContent()
                break;

        }
    }
    //---------- return main view

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                // hideModal ? hideModal()
                //     :
                //     navigation.goBack()
                // setVisible(false)
            }}

        >

            <TouchableOpacity
                onPress={() => {
                    // hideModal ? hideModal()
                    //     :


                    //     navigation.goBack()
                    navigation.navigate('Home')
                    setVisible(false)
                }}
                activeOpacity={1}
                style={styles.centeredView1}

            >

                <View
                    style={[
                        styles.modalView,
                        { backgroundColor: '#fff' }]}
                >
                    {
                        renderContent(render_view_key)
                    }
                </View>
            </TouchableOpacity>

        </Modal>
    );
};

//---------- export component

export default ModalContainer;

const styles = StyleSheet.create({
    centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: '#6F6F6F',
    },
    modalView: {
        width: "90%",
        paddingVertical: 70,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

});