import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import NewsList from './components/NewsList/NewsList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <NewsList />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
