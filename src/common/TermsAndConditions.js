import * as React from "react";
import { View } from "react-native";
import { _fontName } from "../assets/fonts/font";
import CustomText from "../common/CustomText";
import COLORS from "../constants/Colors";
import Header from "./Header";

// common


// common



const TermsAndConditions = ({ navigation }) => {
    return (
        <View >
            <Header
                title='Terms And Conditions'
                navigation={navigation}
            />
            <CustomText
                text={`Lorem ipsum dolor sit amet. Ut corporis aperiam non error quod ab esse distinctio qui consequuntur eaque. Rem consectetur harum in delectus accusamus et enim aliquid sit nostrum voluptas et officiis cumque. Ea minus autem qui accusamus assumenda qui molestiae quos vel atque totam? Eum facilis omnis et dolore unde ut perspiciatis voluptatibus vel esse voluptatem.`}
                style={{
                    color: COLORS.LIGHTGRAY,
                    fontSize: 15,
                    marginTop: 112,
                    marginHorizontal: 38
                }}
            />

        </View>
    )
}

export default TermsAndConditions;