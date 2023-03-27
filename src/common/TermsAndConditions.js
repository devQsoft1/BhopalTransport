import * as React from "react";
import { View } from "react-native";
import { _fontName } from "../assets/fonts/font";
import CustomText from "../common/CustomText";
import COLORS from "../constants/Colors";
import ContextHelper from "../ContextHooks/ContextHelper";
import Header from "./Header";

const TermsAndConditions = ({ navigation }) => {
    const {
        setLoading,
        isDarkTheme,
        theme,
        appStateObject,
        appStateArray,
        currentUser,
    
        postData,
        changeTheme,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
      } = ContextHelper();
      const desctiption =currentUser?.user_type === 'customer' ? "Greeting customer welcome to you. We will not be responsible for any of your items.This is a service provider application.We hope your item of transport  will help to deliver the item quickly and efficiently.Please click a photo dear customer when our driver loads your transport item in his vehicle .Send that image to us.Whatever issue is created, first call us.We will help you by coordinating and get your item delivered to you in the fastest and most economical way.Dear customer, after the vehicle loading, if you do not click the photo, then we will not be responsible for your goods.Please click customer photo with vehicle number.Thank you so much for being our customer!":`Greeting Drivers Thank you very much for being our partner.You have to talk to the customer with full respect.You people have to ask and ask the customer's item in a good way and deliver it quickly.You will be responsible for the item of the customer, whatever is going inside the vehicle.The photo is to be clicked after the customer's item is loaded into the vehicle or after unloading.If any issue arises then call us first.  we will help you.You will not talk about payment with the customer, we will do that.Always have tools and equipment in your vehicle.Thank you very much. for being our partner.`;
    return (
        <View >
            <Header
                title= {currentUser?.user_type === 'customer' ? 'Terms And Condition' 
                : 'Terms And Condition'}
                navigation={navigation}
            />
            <CustomText
                text={desctiption}
                style={{
                    color: COLORS.LIGHTGRAY,
                    fontSize: 18,
                    marginTop: 50,
                    marginHorizontal: 38
                }}
            />

        </View>
    )
}

export default TermsAndConditions;