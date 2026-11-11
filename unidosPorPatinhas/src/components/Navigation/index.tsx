import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';


export function Navigation() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("home")} style={styles.button}>
                <Ionicons name="home-outline" size={24}/>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("requests")} style={styles.button}>
                <Ionicons name="timer-outline" size={24}/>
                <Text>Solicitação</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")} style={styles.button}>
                <Ionicons name="person-outline" size={24}/>
                <Text>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("more")} style={styles.button}>
                <Ionicons name="menu" size={24}/>
                <Text>Mais</Text>
            </TouchableOpacity>
        </View>
    )
}