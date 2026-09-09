import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Label } from '@react-navigation/elements';
import { styles } from './styles';
import { InputText } from '@/components/InputText';
import { ButtonIcon } from '@/components/ButtonIcon';

export default function SignUp() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ButtonIcon name="arrow-back" style={styles.buttonIcon} onPress={() => navigation.goBack()}/>
      
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.description}>Preencha as informações para efetuar o seu cadastro</Text>
      <View style={styles.form}>
        <View style={styles.input}>
          <Label style={styles.label}>Nome*</Label>
          <InputText placeholder="Fulando Fulando"/>
        </View>
        <View style={styles.input}>
          <Label style={styles.label}>Email*</Label>
          <InputText placeholder="Fulando@@mail.com"/>
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
      <View style={styles.buttons}>
        <Button title='Fazer meu cadastro'/>
        <Image style={styles.ouLine} source={require("@/assets/ouline.png")}/>
        <TouchableOpacity style={styles.googleButton} onPress={() => navigation.goBack()} >
          <Image source={require("@/assets/google.png")} style={styles.googleImg} width={24} height={24}/>
          <Text style={styles.buttonText}>CONTINUE COM O GOOGLE</Text>
        </TouchableOpacity>      
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}
