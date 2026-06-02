import { TouchableOpacity, Text, TextProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    style?: TextProps['style'];
}
export function ButtonIcon({ name, style, ...rest}: Props) {
    return (
        <TouchableOpacity onPress={rest.onPress} style={style}>
            <MaterialIcons name={name} size={24} />
        </TouchableOpacity>
    )
}