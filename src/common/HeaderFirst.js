import * as React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {_fontName} from '../assets/fonts/font';
import {
  App_Logo1,
  BackGroundImgColor,
  Back_Arrow,
  Suport,
} from '../constants/Images';

// common

const windowWidth = Dimensions.get('window').width;

const HeaderFirst = ({isBack = true, navigation,isHelp=false}) => {
  return (
    <ImageBackground
      source={BackGroundImgColor}
      style={{width: '100%', height: 250}}
      resizeMode="stretch">
        {
isHelp&&
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          top: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={()=>navigation.navigate("Help")}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: _fontName.InterSemiBold_600,
            textAlign: 'center',
            color: '#35120F',
          }}>
          Help
        </Text>
        <Image
          source={Suport}
          style={{width: 15, height: 15}}
          resizeMode="contain"
        />
      </TouchableOpacity>
        }

      {isBack && (
        <TouchableOpacity
          style={{position: 'absolute', top: 30, left: 20}}
          onPress={() => navigation.goBack()}>
          <Image source={Back_Arrow} resizeMode="cover" />
        </TouchableOpacity>
      )}

      <View style={SpaceStyles.flexCenter}>
        <Image
          source={App_Logo1}
          resizeMode="contain"
          style={{height: 150, width: 150, marginTop: 50}}
        />
      </View>
    </ImageBackground>
  );
};

export default HeaderFirst;

const SpaceStyles = StyleSheet.create({
  flexCenter: {
    alignSelf: 'center',
  },
});
