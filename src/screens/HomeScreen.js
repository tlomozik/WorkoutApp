import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import MainContainer from '../style/containers/MainContainer';
import {containerShadow} from '../style/variables';
import BasicContainer from '../style/containers/BasicContainer';
import FilterWindow from '../components/Home/FilterWindow';
import Lottie from 'lottie-react-native';
import OptionButtons from '../components/Home/OptionButtons';
import ExerciseItem from '../components/Home/ExerciseItem';
import CreateExWindow from '../components/Home/CreateExWindow';

export const Context = React.createContext();

const handleUniqueValues = exercises => {
  return Object.values(
    exercises.reduce((acc, exercise) => {
      if (!acc[exercise.desc]) {
        acc[exercise.desc] = {
          value: exercise.desc,
          label: exercise.desc,
          image: exercise.img || require('../../assets/question-mark.png'),
        };
      }
      return acc;
    }, {}),
  );

  // return Array.from(
  //   exercises.reduce((acc, item) => acc.add(item.desc), new Set()),
  // );
};

const exercises = [
  {
    img: require('../../assets/biceps.png'),
    title: 'Uginanie ramion ze sztangą łamaną',
    desc: 'Biceps',
  },
  {
    //    img: require('../../assets/biceps.png'),

    title: 'Wyciskanie żołnierskie sztangi',
    desc: 'Barki',
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

const Home = () => {
  const [sortTerms, setSortTerms] = useState([]);
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

  const handleSorting = useCallback(() => {
    let filteredExercises = suggestion;

    if (sortTerms.some(term => term.order)) {
      sortTerms.forEach(term => {
        if (term.order === 'A-Z') {
          filteredExercises.sort((a, b) =>
            a.title.localeCompare(b.title, 'pl'),
          );
        } else if (term.order === 'Z-A') {
          filteredExercises.sort((a, b) =>
            b.title.localeCompare(a.title, 'pl'),
          );
        }
      });
    }

    if (sortTerms.some(term => term.title)) {
      filteredExercises = suggestion.filter(exercise => {
        return sortTerms.some(term => {
          if (term.title === exercise.desc) {
            return true;
          }
          return false;
        });
      });
    }

    setSuggestion(filteredExercises);
  }, [sortTerms]);

  useEffect(() => {
    if (sortTerms.length > 0) {
      handleSorting();
    }

    return () => {
      setSuggestion(exercises);
    };
  }, [handleSorting]);

  return (
    <Context.Provider value={[sortTerms, setSortTerms]}>
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

        {(isVisible.flag == true) & (isVisible.type == 'Filtruj') ? (
          <FilterWindow
            setVisible={setVisible}
            type={isVisible.type}
            exercises={handleUniqueValues(exercises)}
          />
        ) : null}

        {(isVisible.flag == true) & (isVisible.type == 'Stwórz') ? (
          <CreateExWindow
            setVisible={setVisible}
            type={isVisible.type}
            exercises={handleUniqueValues(exercises)}
          />
        ) : null}

        <OptionButtons setVisible={setVisible} />

        {suggestion.length > 0 ? (
          <FlatList
            style={{width: '100%', marginBottom: 90}}
            data={suggestion}
            renderItem={({item}) => (
              <ExerciseItem
                img={item.img || require('../../assets/question-mark.png')}
                title={item.title}
                desc={item.desc}
              />
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
    </Context.Provider>
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
