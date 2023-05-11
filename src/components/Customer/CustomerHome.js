//---------- imports

// react
import * as React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

// assets
import {_fontName} from '../../assets/fonts/font';

// common
import CustomText from '../../common/CustomText';
import Header from '../../common/Header';

// constants
import {
  E_V,
  Menu_Icon,
  Pick_up,
  Tata_ace,
  Tenker,
  Threee,
} from '../../constants/Images';

// components
import VehicleTile from './VehicleTile';

//---------- main component

const CustomerHome = ({navigation, data}) => {
  //   console.log('CustomerHome', data);
  //---------- main view
  return (
    <>
      <Header leftIcon={Menu_Icon} navigation={navigation} isHelp={true} />

      <View style={{marginHorizontal: 20, flex: 1}}>
        <FlatList
          style={{flex: 1, paddingTop: 57}}
          data={data}
          //   keyExtractor={item => item.bookingID}
          ListFooterComponent={() => <View style={{height: 80}} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 35}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {item})}>
              <VehicleTile
                icon={item?.path + item?.image}
                title={item?.name}
                description={item?.description}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default CustomerHome;
