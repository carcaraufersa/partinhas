import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Label } from '@react-navigation/elements';
import { styles } from './styles';
import { InputText } from '@/components/InputText';
import { ButtonIcon } from '@/components/ButtonIcon';
import { ButtonText } from '@/components/ButtonText';

export default function SignIn() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ButtonIcon name="arrow-back" style={styles.buttonIcon} onPress={() => navigation.goBack()}/>
      
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>Acesse sua conta usando seu e-mail cadastrado</Text>
      <View style={styles.form}>
        <View style={styles.input}>
          <Label style={styles.label}>Email</Label>
          <InputText placeholder="exemplo@gmail.com"/>
        </View>
        <View style={styles.input}>
          <Label style={styles.label}>Senha</Label>
          <InputText placeholder="********" secureTextEntry={true}/>
          <View style={styles.findPassword}>
            <Text>Caso tenha esquecido sua senha </Text>
            <ButtonText title="Clique aqui" onPress={() => navigation.navigate("signUp")}/>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title='Acessar minha conta'/>
        <View style={styles.register}>
            <Text>NÃO POSSUI CONTA? </Text>
            <ButtonText title="CADASTRE-SE" onPress={() => navigation.navigate("signUp")}/>
        </View>
        <Image style={styles.ouLine} source={require("@/assets/ouline.png")}/>
        <TouchableOpacity style={styles.googleButton} onPress={() => navigation.goBack()} >
          <Image source={require("@/assets/google.png")} style={styles.googleImg} width={24} height={24}/>
          <Text style={styles.buttonText}>CONTINUE COM O GOOGLE</Text>
        </TouchableOpacity>      
      </View>
    </View>
  );
}
