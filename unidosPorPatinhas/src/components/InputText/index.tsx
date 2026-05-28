import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

export function InputText({ ...rest }: TextInputProps) {
    return <TextInput
        style={styles.container}
        placeholderTextColor={"#555555"}
        { ...rest }
    />
}