import { useState } from "react";
import { TextInput, TextInputProps, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = TextInputProps & {
  errorMessage?: string;
  isPassword?: boolean;
};

export function InputText({ errorMessage, isPassword = false, ...rest }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const hasError = !!errorMessage;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, hasError && styles.inputError]}>
        <TextInput
          style={styles.container}
          placeholderTextColor={"#555555"}
          secureTextEntry={isPassword && !isVisible}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsVisible((prev) => !prev)}
            style={styles.eyeButton}
            accessibilityLabel={isVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            <Ionicons
              name={isVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#555555"
            />
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
}