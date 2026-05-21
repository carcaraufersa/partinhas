import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Label } from '@react-navigation/elements';

export default function Register() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text onPress={() => navigation.goBack()}> Voltar </Text>
      </TouchableOpacity>
      <Text>Crie sua conta</Text>
      <Text>Preencha as informações para efetuar o seu cadastro</Text>
      <Label>Nomes*</Label>
      <TextInput placeholder="Fulano fulano"/>
      <Label>Email*</Label>
      <TextInput placeholder="fulano@@mail.com"/>
      <Label>Senha*</Label>
      <TextInput placeholder="" secureTextEntry={true}/>
      <Label>Confirmar senha*</Label>
      <TextInput placeholder="" secureTextEntry={true}/>
      <TouchableOpacity>
        <Button 
          title='Fazer meu cadastro'/>    
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>CONTINUE COM O GOOGLE</Text>   
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
