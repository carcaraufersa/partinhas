import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { InputText } from '@/components/InputText';
import { ButtonIcon } from '@/components/ButtonIcon';
import { ButtonText } from '@/components/ButtonText';

// Tipagem dos erros — um erro opcional para cada campo
type FormErrors = {
  email?: string;
  password?: string;
};

export default function SignIn() {
  const navigation = useNavigation();

  // Estados dos campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado dos erros — começa vazio (sem erros)
  const [errors, setErrors] = useState<FormErrors>({});

  // Valida os campos e retorna true se tudo estiver correto
  function validate(): boolean {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Chamado ao pressionar "Acessar minha conta"
  function handleSubmit() {
    const isValid = validate();
    if (!isValid) return;

    // TODO: integrar com a API de login quando o backend estiver pronto
    console.log("Login válido:", { email });
  }

  return (
    <View style={styles.container}>
      <ButtonIcon
        name="arrow-back"
        style={styles.buttonIcon}
        onPress={() => navigation.goBack()}
      />

      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>
        Acesse sua conta usando seu e-mail cadastrado
      </Text>

      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.label}>Email</Text>
          <InputText
            placeholder="exemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Senha</Text>
          <InputText
            placeholder=""
            value={password}
            onChangeText={setPassword}
            errorMessage={errors.password}
            isPassword
          />
          <View style={styles.findPassword}>
            <Text>Caso tenha esquecido sua senha </Text>
            <ButtonText
              title="Clique aqui"
              onPress={() => navigation.navigate("signUp")}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button title="Acessar minha conta" onPress={handleSubmit} />
        <View style={styles.register}>
          <Text>NÃO POSSUI CONTA? </Text>
          <ButtonText
            title="CADASTRE-SE"
            onPress={() => navigation.navigate("signUp")}
          />
        </View>
        <Image style={styles.ouLine} source={require("@/assets/ouline.png")} />
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("@/assets/google.png")}
            style={styles.googleImg}
            width={24}
            height={24}
          />
          <Text style={styles.buttonText}>CONTINUE COM O GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}