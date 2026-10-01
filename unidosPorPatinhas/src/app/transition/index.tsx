import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { styles } from './styles';

export default function Transition() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('signIn'));
    }, 2500); 
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
       {/* Aqui chamamos o seu GIF recém-adicionado */}
       <Image 
        source={require('../../assets/loading-pata.gif')} 
        style={styles.animation} 
      />
    </View>
  );
}