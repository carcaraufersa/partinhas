import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { styles } from './styles';
import { InputText } from '@/components/InputText';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Camera, Settings } from 'lucide-react-native';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/iconname.png")} style={styles.logo} />
      <Text>Olá, Maria</Text>
      <View style={styles.searchContainer}>
        <InputText placeholder="O que está procurando?" />
        <ButtonIcon name="more-vert" onPress={() => {}} />
      </View>
      <Navigation />
    </View>
  );
};
