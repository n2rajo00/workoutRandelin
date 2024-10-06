import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './styles/Style';
import { BottomNavigation, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import ExSettings from './components/ExSettings';
import AddExercise from './components/AddExercise';
import ExListPage from './components/ExListPage';

const routes = [
  {key: 'addworkout', title: 'Add workout', focusedIcon: 'email-newsletter'},
  {key: 'exerciselist', title: 'Exercises', focusedIcon: 'format-list-bulleted'},
  {key: 'settings', title: 'Settings', focusedIcon: 'database-settings-outline'}
]

export default function App() {

  const [workout, setWorkout] = useState([]);
  const [index, setIndex] = useState(0);
  
  const renderScene = BottomNavigation.SceneMap({
    addworkout: AddExercise,
    exerciselist: ExListPage,
  });

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <ExSettings.Provider value={{workout, setWorkout}}>
        <BottomNavigation
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </ExSettings.Provider>
    </PaperProvider>

  );
}