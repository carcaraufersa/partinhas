import { useState } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { InputText } from '../../components/InputText';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ButtonText } from '../../components/ButtonText';
import api from '../../services/api';

type FormErrors = {
  email?: string;
  password?: string;
  api?: string;  // erro retornado pela API
};

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSubmit() {
    const isValid = validate();
    if (!isValid) return;

    setIsLoading(true);
    setErrors({});

    try {
      // #64 — Envia email e senha para a API
      const response = await api.post('/auth/login', { email, password });

      // #65 — Processa resposta da API
      const { access_token } = response.data;

      // #66 — Armazena o token (por enquanto no console — AsyncStorage será usado futuramente)
      console.log("Login realizado com sucesso! Token:", access_token);

      // TODO: navegar para a tela principal após armazenar o token
      // navigation.navigate("home");

    } catch (error: any) {
      // #96 — Apresenta erros retornados pela API
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401) {
        setErrors({ api: message ?? "Credenciais inválidas." });
      } else if (status === 400) {
        setErrors({ api: message ?? "Dados inválidos." });
      } else {
        setErrors({ api: "Não foi possível conectar ao servidor. Tente novamente." });
      }
    } finally {
      setIsLoading(false);
    }
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

        {/* #96 — Exibe erro retornado pela API */}
        {errors.api && (
          <Text style={{ color: '#E53E3E', fontSize: 14, fontFamily: 'Inter_400Regular' }}>
            {errors.api}
          </Text>
        )}
      </View>

      <View style={styles.buttons}>
        {/* Mostra indicador de loading enquanto aguarda a API */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#7952b3" />
        ) : (
          <Button title="Acessar minha conta" onPress={handleSubmit} />
        )}
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