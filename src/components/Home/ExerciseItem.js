import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import CustomText from '../../style/text/CustomText';
const ExerciseItem = ({img, title, desc}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: 50,
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Image source={{uri: img}} style={{width: 40, height: 40}} />
        <View
          style={{
            marginLeft: 10,
            flex: 1,
            flexDirection: 'column',
          }}>
          <CustomText style={{fontSize: 14}}>{title}</CustomText>
          <CustomText style={{fontSize: 13}}>{desc}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseItem;
