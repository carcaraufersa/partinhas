import SignUp from "@/app/signUp";
import SignIn from "@/app/signIn";
import Splash from "@/app/splash";
import Transition from "../app/transition";
import TabRoutes from "./TabRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="splash" screenOptions={{headerShown:false}}>
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="transition" component={Transition}/>
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
            {/* Área logada: abas Home e Perfil */}
            <Stack.Screen name="main" component={TabRoutes} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    )
}
