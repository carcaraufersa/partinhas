import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Unidos Por Patinhas</Text>
      <TouchableOpacity>
        <Button 
          title='Cadastrar'
          onPress={() => navigation.navigate('register')}/>    
      </TouchableOpacity>
      <TouchableOpacity>
        <Button 
          title='Voltar'
          onPress={() => navigation.navigate('home')}/>    
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
