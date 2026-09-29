import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function Splash() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('signIn' as never); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/favicon.png')} 
          style={styles.smallLogo} 
          resizeMode="contain"
        />
      </View>

      <Image
        source={require('../../assets/ilustracao.png')} 
        style={styles.illustration}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Somos todos unidos pelas patinhas</Text>
      
      <Text style={styles.subtitle}>
        Somos um grupo de voluntários unidos em prol dos animais de Pau dos Ferros/RN e região. Adote o seu melhor amigo.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStart} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}