import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../style/containers/MainContainer';
import {containerShadow} from '../style/variables';
import BasicContainer from '../style/containers/BasicContainer';
import CustomText from '../style/text/CustomText';
import Lottie from 'lottie-react-native';
const Home = () => {
  const exercises = [
    {
      img: require('../../assets/biceps.png'),
      title: 'Uginanie ramion ze sztangą łamaną',
      desc: 'Biceps',
    },
    {
      img: require('../../assets/back.png'),
      title: 'Ściąganie drążka nachwytem',
      desc: 'Plecy',
    },
    {
      img: require('../../assets/biceps.png'),
      title: 'Uginanie hantli w siadzie na ławce prostej',
      desc: 'Biceps',
    },
    {
      img: require('../../assets/chest.png'),
      title: 'Wyciskanie sztangi na ławce prostej',
      desc: 'Klatka piersiowa',
    },
  ];
  const [text, setText] = useState();
  const [suggestion, setSuggestion] = useState(exercises);
  console.log(suggestion);

  const handleTextInput = text => {
    setText(text);

    setSuggestion(
      exercises.filter(
        item =>
          item.title.toLowerCase().includes(text.toLowerCase().trim()) |
          item.desc.toLowerCase().includes(text.toLowerCase().trim()),
      ),
    );
  };

  return (
    <MainContainer style={styles.mainContainer}>
      <BasicContainer style={[styles.containerShadow, {paddingLeft: 10}]}>
        <Image
          source={require('../../assets/search.png')}
          style={{width: 30, height: 30}}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Wyszukaj ćwiczenie"
          value={text}
          onChangeText={handleTextInput}
          placeholderTextColor={'#fff'}
          selectionColor={'rgba(255, 255, 255, 0.6)'}></TextInput>

        {text ? (
          <TouchableOpacity
            onPress={() => {
              setText(null), setSuggestion(exercises);
            }}>
            <Image
              source={require('../../assets/remove.png')}
              style={styles.removeIcon}
            />
          </TouchableOpacity>
        ) : null}
      </BasicContainer>
      <OptionsButtons />
      {suggestion.length > 0 ? (
        suggestion.map((item, index) => {
          return (
            <ExerciseItem
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
            />
          );
        })
      ) : (
        <Lottie
          source={require('../../assets/animations/robot-not-found.json')}
          autoPlay
          style={{width: 200, height: 'auto', marginTop: '5%'}}
          loop
        />
      )}
    </MainContainer>
  );
};

const OptionsButtons = () => {
  const optionButtons = [
    {title: 'Filtruj', img: require('../../assets/funnel.png')},
    {title: 'Sortuj', img: require('../../assets/sort.png')},
    {title: 'Stwórz', img: require('../../assets/add.png')},
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
      {optionButtons.map((item, index) => {
        return (
          <TouchableOpacity key={index}>
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
        <Image source={img} style={{width: 40, height: 40}} />
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

export default Home;
const styles = StyleSheet.create({
  containerShadow,
  mainContainer: {
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 5,
    fontSize: 17,
    fontFamily: 'ABeeZee-Regular',
  },
  removeIcon: {marginRight: 10},
  optionButtonIcon: {marginLeft: 10, width: 20, height: 20},
  optionButton: {width: 105, height: 35},
});
