import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
import {View, StyleSheet, Image, TouchableOpacity, Alert, } from 'react-native';

const App = () => {
  const [TOGGLE, setToggle] = useState(false);

  const HANDLE_CHANGE_TOGGLE = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    Torch.switchState(TOGGLE);
  }, [TOGGLE]);

  useEffect(() => {
    const SUBSCRIBE = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    return () => SUBSCRIBE.remove();
  });

  return (
    <View style={TOGGLE ? style.containerLight: style.container}>
      <TouchableOpacity onPress={HANDLE_CHANGE_TOGGLE}>
        <Image 
          style={TOGGLE ? style.lightingOn : style.lightingOff}
          source={
            TOGGLE
            ? require('./assets/icons/eco-light.png')
            : require('./assets/icons/eco-light-off.png')} />
      </TouchableOpacity>
    </View>
  )
};


export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
});
