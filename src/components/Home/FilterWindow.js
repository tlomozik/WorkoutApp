import React, {useState, useContext} from 'react';
import {BlurView} from '@react-native-community/blur';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CustomText from '../../style/text/CustomText';
import {pallete} from '../../style/index';
import {SelectCountry} from 'react-native-element-dropdown';
import {Context} from '../../screens/HomeScreen';

const FilterWindow = ({setVisible, type, exercises}) => {
  const [exercise, setExercise] = useState(null);
  const [sortTerms, setSortTerms] = useContext(Context);
  const [isDisable, setIsDisable] = useState(false);

  const handleSortItemRemoval = index => {
    const newTerms = [...sortTerms];
    newTerms.splice(index, 1);
    if (!newTerms.some(item => item.title)) {
      setIsDisable(false);
    }
    setSortTerms(newTerms);
  };

  return (
    <>
      <BlurView
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
        style={[
          {
            zIndex: 2,
          },
          StyleSheet.absoluteFill,
        ]}></BlurView>

      <View
        style={{
          backgroundColor: '#111',
          zIndex: 2,
          position: 'absolute',
          width: 300,
          height: 300,
          marginTop: '50%',
          borderRadius: 50,
          overflow: 'hidden',
          padding: 20,
          flexDirection: 'column',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            //       backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          <CustomText style={{fontSize: 20, marginLeft: 90}}>{type}</CustomText>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}>
            <Image
              source={require('../../../assets/close.png')}
              style={styles.closeWindowsButton}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 10,
            paddingTop: 20,
            //     backgroundColor: 'green',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flexDirection: 'row',
              //      backgroundColor: 'pink',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                //      backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (!sortTerms.some(term => term.order)) {
                    setSortTerms([...sortTerms, {order: 'A-Z'}]);
                  }
                }}>
                <Image
                  source={require('../../../assets/az.png')}
                  style={styles.closeWindowsButton}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!sortTerms.some(term => term.order)) {
                    setSortTerms([...sortTerms, {order: 'Z-A'}]);
                  }
                }}>
                <Image
                  source={require('../../../assets/za.png')}
                  style={[styles.closeWindowsButton, {marginLeft: 10}]}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!sortTerms.some(term => term.date)) {
                  setSortTerms([...sortTerms, {date: 'Data'}]);
                }
              }}>
              <View
                style={{
                  backgroundColor: pallete.headerColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 7,
                }}>
                <CustomText style={{color: '#111'}}>Data dodania</CustomText>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //         backgroundColor: 'brown',
              width: '100%',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'space-evenly',
              padding: 5,
            }}>
            {sortTerms.map((item, index, array) => {
              return (
                <SortItem
                  key={index}
                  index={index}
                  term={item}
                  onRemove={handleSortItemRemoval}
                />
              );
            })}
          </View>
          <View
            style={{
              //          backgroundColor: 'yellow',
              alignItems: 'center',
            }}>
            <SelectCountry
              showsVerticalScrollIndicator={false}
              style={styles.dropdown}
              containerStyle={styles.containerStyle}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              maxHeight={200}
              disable={isDisable}
              value={exercise}
              data={exercises}
              valueField="value"
              labelField="label"
              imageField="image"
              placeholder="Wybierz ćwiczenie"
              onChange={e => {
                if (
                  !sortTerms.some(term => {
                    term.title;
                  })
                ) {
                  setExercise(e.value),
                    setSortTerms([...sortTerms, {title: e.value}]);
                  setIsDisable(true);
                }
              }}
            />
          </View>
        </View>
        {sortTerms.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                setSortTerms([]);
              }}>
              <View style={styles.deleteAcceptButton}>
                <CustomText>Usuń</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}>
              <View style={styles.deleteAcceptButton}>
                <CustomText>Zatwierdź</CustomText>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{height: 30}}></View>
        )}
      </View>
    </>
  );
};

const SortItem = ({index, term, onRemove}) => {
  return (
    <>
      <View
        style={{
          marginLeft: 5,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: pallete.headerColor,
          width: '30%',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 35,
          flexDirection: 'row',
        }}>
        <CustomText>
          {term.title ? term.title : null}
          {term.order ? term.order : null}
          {term.date ? term.date : null}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            {
              onRemove(index);
            }
          }}>
          <Image
            source={require('../../../assets/close2.png')}
            style={{width: 17, height: 17}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterWindow;

const styles = StyleSheet.create({
  closeWindowsButton: {width: 40, height: 40},
  dropdown: {
    margin: 16,
    height: 50,
    width: 200,
    backgroundColor: pallete.headerColor,
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  containerStyle: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    color: 'black',
    fontFamily: 'ABeeZee-Regular',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: 'ABeeZee-Regular',
    color: 'black',
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  deleteAcceptButton: {
    backgroundColor: pallete.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
