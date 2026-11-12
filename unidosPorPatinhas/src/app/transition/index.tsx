import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { styles } from './styles';
import { useAuth } from '@/contexts/AuthContext';

export default function Transition() {
  const navigation = useNavigation();
  const { token, isRestoring } = useAuth();

  useEffect(() => {
    // Espera a leitura da sessão salva; com token vai direto para a área logada
    if (isRestoring) return;

    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace(token ? 'main' : 'signIn'));
    }, 2500); 
    return () => clearTimeout(timer);
  }, [navigation, token, isRestoring]);

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