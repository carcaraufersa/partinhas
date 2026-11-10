import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios, { AxiosError } from "axios"; 

import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { ButtonIcon } from "../../components/ButtonIcon";
import { styles } from "./styles";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

// Interface do erro vindo do NestJS
interface NestJsErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

export default function SignUp() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "O nome é obrigatório.";
    }

    if (!phone.trim()) {
      newErrors.phone = "O telefone é obrigatório.";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    const isValid = validate();
    if (!isValid) return;

    try {
      // Faz o pedido POST à API
      const response = await api.post('/users', {
        name: name,
        email: email.toLowerCase(),
        telephone: phone,
        password: password,
      });

      console.log("Conta criada com sucesso:", response.data);
      Alert.alert(
        "Conta Criada!",
        "O seu cadastro foi realizado com sucesso.",
        [
          { 
            text: "Fazer Login", 
            onPress: () => navigation.navigate("signIn" as never) 
          }
        ]
      );

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<NestJsErrorResponse>; 
        const status = error.response?.status;
        const errorData = error.response?.data;

        // Task #113: Tratamento da ConflictException (E-mail duplicado)
        if (status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: "Este e-mail já está em uso.",
          }));
          return;
        }

        // Task #114: Tratamento do ValidationPipe (Erros de campos enviados pelo back-end)
        if (status === 400) {
          const errorMessage = Array.isArray(errorData?.message) 
            ? errorData.message.join('\n') 
            : errorData?.message || "Verifique os dados informados.";
            
          Alert.alert("Atenção aos dados", errorMessage);
          return;
        }

        // Outros erros do servidor (Ex: 500)
        Alert.alert(
          "Erro no Servidor",
          "Ocorreu um problema ao tentar criar a conta. Tente novamente mais tarde."
        );
      } else {
        // Falha de rede / API offline
        Alert.alert(
          "Sem Conexão",
          "Não foi possível conectar ao servidor. Verifique a sua internet."
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <ButtonIcon
        name="arrow-back"
        style={styles.buttonIcon}
        onPress={() => navigation.goBack()}
      />

      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.description}>
        Preencha as informações para fazer seu cadastro
      </Text>

      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.label}>Nome*</Text>
          <InputText
            placeholder="Fulano Fulano"
            value={name}
            onChangeText={setName}
            errorMessage={errors.name}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Telefone*</Text>
          <InputText
            placeholder="(00) 00000-0000"
            value={phone}
            onChangeText={setPhone}
            errorMessage={errors.phone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>E-mail*</Text>
          <InputText
            placeholder="exemplo@email.com"
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Senha*</Text>
          <InputText
            placeholder=""
            value={password}
            onChangeText={setPassword}
            errorMessage={errors.password}
            isPassword
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Confirmar senha*</Text>
          <InputText
            placeholder=""
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            errorMessage={errors.confirmPassword}
            isPassword
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <Button title="Fazer meu cadastro" onPress={handleSubmit} />
        <Image style={styles.ouLine} source={require("../../assets/ouline.png")} />
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.googleImg}
            width={24}
            height={24}
          />
          <Text style={styles.buttonText}>CONTINUE COM O GOOGLE</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}