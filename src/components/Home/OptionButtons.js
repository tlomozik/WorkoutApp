import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import BasicContainer from '../../style/containers/BasicContainer';
import CustomText from '../../style/text/CustomText';
import {containerShadow} from '../../style/variables';
import React from 'react';

const OptionButtons = ({setVisible}) => {
  const options = [
    {title: 'Filtruj', img: require('../../../assets/funnel.png')},
    {title: 'Sortuj', img: require('../../../assets/sort.png')},
    {title: 'Stwórz', img: require('../../../assets/add.png')},
  ];

  return (
    <View
      style={{
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      {options.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (item.title == 'Sortuj') {
                setVisible({type: 'Sortuj', flag: true});
              }
              if (item.title == 'Filtruj') {
                setVisible({type: 'Filtruj', flag: true});
              }
              if (item.title == 'Stwórz')
                setVisible({type: 'Stwórz', flag: true});
            }}>
            <BasicContainer style={[styles.optionButton, containerShadow]}>
              <CustomText>{item.title}</CustomText>
              <Image source={item.img} style={styles.optionButtonIcon} />
            </BasicContainer>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OptionButtons;

const styles = StyleSheet.create({
  optionButtonIcon: {marginLeft: 10, width: 20, height: 20},
  optionButton: {width: 105, height: 35},
});
