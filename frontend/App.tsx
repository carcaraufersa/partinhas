import { Routes } from "@/routes";
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Routes />
    </>
  );
}