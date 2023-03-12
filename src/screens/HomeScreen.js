import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../style/containers/MainContainer';
import {containerShadow} from '../style/variables';
import BasicContainer from '../style/containers/BasicContainer';
import CustomText from '../style/text/CustomText';
import {BlurView} from '@react-native-community/blur';
import Lottie from 'lottie-react-native';
import OptionButtons from '../components/Home/OptionButtons';

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
      title: 'Uginanie ramion z hantlami w siadzie na ławce prostej',
      desc: 'Biceps',
    },
    {
      img: require('../../assets/chest.png'),
      title: 'Wyciskanie sztangi na ławce prostej',
      desc: 'Klatka piersiowa',
    },
    {
      img: require('../../assets/legs.png'),
      title: 'Przysiady klasyczne',
      desc: 'Nogi',
    },
    {
      img: require('../../assets/triceps.png'),
      title: 'Wyciskanie francuskie sztangą łamaną ',
      desc: 'Triceps',
    },
    {
      img: require('../../assets/triceps.png'),
      title: 'Prostowanie przedramion przy użyciu uchwytu wyciągu górnego',
      desc: 'Triceps',
    },
    {
      img: require('../../assets/legs.png'),
      title: 'Wykroki z hantlami',
      desc: 'Nogi',
    },
    {
      img: require('../../assets/legs.png'),
      title: 'Wykroki ze sztangą',
      desc: 'Nogi',
    },
    {
      img: require('../../assets/chest.png'),
      title: 'Rozpiętki z hantlami leżąc na ławce prostej',
      desc: 'Klatka piersiowa',
    },
    {
      img: require('../../assets/back.png'),
      title: 'Martwy ciąg klasyczny',
      desc: 'Plecy',
    },
  ];
  const [text, setText] = useState();
  const [suggestion, setSuggestion] = useState(exercises);
  const [isVisible, setVisible] = useState({type: 'none', flag: 'false'});

  console.log(isVisible);

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
      {isVisible.flag == true ? (
        <ModificationWindows setVisible={setVisible} type={isVisible.type} />
      ) : null}
      <OptionButtons setVisible={setVisible} />
      {suggestion.length > 0 ? (
        <FlatList
          style={{width: '100%', marginBottom: 90}}
          data={suggestion}
          renderItem={({item}) => (
            <ExerciseItem img={item.img} title={item.title} desc={item.desc} />
          )}
          keyExtractor={item => item.title}
        />
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

const ModificationWindows = ({setVisible, type}) => {
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
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',

            flexDirection: 'row',
          }}>
          <CustomText style={{fontSize: 20, marginLeft: 90}}>{type}</CustomText>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}>
            <Image
              source={require('../../assets/close.png')}
              style={styles.closeWindowsButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
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

  closeWindowsButton: {width: 40, height: 40},
});
