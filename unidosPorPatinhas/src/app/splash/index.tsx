import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function Splash() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('transition' as never); 
  }

  return (
    <ImageBackground 
      source={require('../../assets/fundo-splash.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        
        
        <View style={styles.header}>
          <Image source={require('../../assets/favicon.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.illustrationContainer}>
          <Image source={require('../../assets/ilustracao.png')} style={styles.illustration} resizeMode="contain" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Somos todos unidos{'\n'}pelas patinhas</Text>
          <Text style={styles.description}>
            Somos um grupo de voluntários unidos em prol dos animais de Pau dos Ferros/RN e região. Adote seu melhor amigo.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStart} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ImageBackground>
  );
}