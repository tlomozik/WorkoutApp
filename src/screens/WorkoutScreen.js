import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MainContainer from '../style/containers/MainContainer';
import BasicContainer from '../style/containers/BasicContainer';
import CustomText from '../style/text/CustomText';
const WorkoutScreen = () => {
  return (
    <MainContainer style={{justifyContent: 'center'}}>
      <TouchableOpacity>
        <BasicContainer>
          <CustomText style={styles.newWorkoutButtonText}>
            Zacznij nowy trening
          </CustomText>
        </BasicContainer>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({newWorkoutButtonText: {fontSize: 16}});
