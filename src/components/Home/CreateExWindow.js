import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import CustomText from '../../style/text/CustomText';
import {SelectCountry} from 'react-native-element-dropdown';
import {pallete} from '../../style/index';
import {launchImageLibrary} from 'react-native-image-picker';
import addExercise from '../../services/addExercise';
const CreateExWindows = ({setVisible, type, exercises}) => {
  const [isDisable, setIsDisable] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel != true) {
        console.log(response);

        setImage({
          fileName: response.assets[0].fileName,
          uri: response.assets[0].uri,
        });
      }
    });
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
      {/* Top Parent Container */}
      <View style={styles.topParentContainer}>
        {/* Header */}
        <HeaderContainer type={type} setVisible={setVisible} />

        {/* Main Container */}
        <View style={styles.mainContainer}>
          {/* Category Section */}
          <CustomText style={styles.subTitlesStyle}>
            Nazwij lub wybierz partie mieśniową:
          </CustomText>
          <CustomTextInput text={category} setText={setCategory} />

          <View>
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
              value={category}
              data={exercises}
              valueField="value"
              labelField="label"
              imageField="image"
              placeholder="Wybierz partie mięśniową"
              onChange={e => {
                setCategory(e.value);
              }}
            />
          </View>
          {/* Excercise Section */}
          <CustomText style={styles.subTitlesStyle}>
            Nazwij ćwiczenie:
          </CustomText>
          <CustomTextInput text={exercise} setText={setExercise} />

          {/* Upload Section */}
          <View style={styles.uploadSection}>
            {/*  Upload button */}
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <CustomText>Załącz ikonkę</CustomText>
            </TouchableOpacity>
            {image ? (
              <View style={styles.iconContainer}>
                <Image
                  source={{uri: image.uri}}
                  style={{width: 30, height: 30}}
                />
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              addExercise(exercise, category, image.fileName);
            }}
            style={styles.createButton}>
            <CustomText>Utwórz</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const CustomTextInput = ({text, setText}) => {
  return (
    <View style={styles.textInputContainerStyle}>
      <TextInput
        style={styles.textInputStyle}
        value={text}
        onChangeText={value => setText(value)}
        placeholderTextColor={'#fff'}
        selectionColor={'rgba(255, 255, 255, 0.6)'}></TextInput>

      {text ? (
        <TouchableOpacity
          onPress={() => {
            setText(null);
          }}>
          <Image
            source={require('../../../assets/delete-white.png')}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const HeaderContainer = ({type, setVisible}) => {
  return (
    <View style={styles.header}>
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
  );
};

export default CreateExWindows;

const styles = StyleSheet.create({
  closeWindowsButton: {width: 40, height: 40},
  subTitlesStyle: {fontSize: 16},
  textInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#fff',
    //  backgroundColor: 'red',
  },

  topParentContainer: {
    backgroundColor: '#111',
    zIndex: 2,
    position: 'absolute',
    width: 300,
    height: 450,
    marginTop: '50%',
    borderRadius: 50,
    overflow: 'hidden',
    padding: 20,
    flexDirection: 'column',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20,
    //   backgroundColor: 'green',
    justifyContent: 'space-around',
  },

  textInputStyle: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'ABeeZee-Regular',
  },
  removeIcon: {marginRight: 10, width: 24, height: 24},

  iconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },

  uploadSection: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  uploadButton: {
    padding: 7,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: pallete.containersColor,
  },

  createButton: {
    padding: 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: pallete.bgColor,
  },

  //* Styles for dropdownmenu
  //TODO dynamical styles for dropdownmenu
  containerStyle: {
    overflow: 'hidden',
    borderRadius: 20,
    // backgroundColor: 'red',
  },
  dropdown: {
    // margin: 16,
    height: 40,
    // width: 250,
    backgroundColor: pallete.headerColor,
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  selectedTextStyle: {
    fontFamily: 'ABeeZee-Regular',
    color: 'black',
    fontSize: 16,
    marginLeft: 8,
  },

  placeholderStyle: {
    color: 'black',
    fontFamily: 'ABeeZee-Regular',
    fontSize: 16,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
