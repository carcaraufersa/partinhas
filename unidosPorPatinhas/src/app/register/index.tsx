import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { InputText } from "@/components/InputText";
import { ButtonIcon } from "@/components/ButtonIcon";
import { styles } from "./styles";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "O nome é obrigatório.";
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

  function handleSubmit() {
    const isValid = validate();
    if (!isValid) return;

    // TODO: integrar com a API quando o backend estiver pronto
    console.log("Formulário válido:", { name, email });
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
        Preencha as informações para efetuar o seu cadastro
      </Text>

      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.label}>Nome*</Text>
          <InputText
            placeholder="Fulando Fulando"
            value={name}
            onChangeText={setName}
            errorMessage={errors.name}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Email*</Text>
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

      <StatusBar style="auto" />
    </View>
  );
}