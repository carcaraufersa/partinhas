import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Label } from '@react-navigation/elements';
import { styles } from './styles';
import { InputText } from '@/components/InputText';

export default function Register() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text onPress={() => navigation.goBack()}> Voltar </Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.description}>Preencha as informações para efetuar o seu cadastro</Text>
      <View style={styles.form}>
        <View style={styles.input}>
          <Label style={styles.label}>Nome*</Label>
          <InputText placeholder="Fulando Fulando"/>
        </View>
        <View style={styles.input}>
          <Label style={styles.label}>Email*</Label>
          <InputText placeholder="fulano@@mail.com"/>
        </View>
        <View style={styles.input}>
          <Label style={styles.label}>Senha*</Label>
          <InputText placeholder="" secureTextEntry={true}/>
        </View>
        <View style={styles.input}>
          <Label style={styles.label}>Confirmar senha*</Label>
          <InputText  placeholder="" secureTextEntry={true}/>
        </View>
      </View>
      <Button title='Fazer meu cadastro'/>
      <TouchableOpacity>
        <Text>CONTINUE COM O GOOGLE</Text>   
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
