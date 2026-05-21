import Home from "@/app/home";
import Register from "@/app/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="cadastro" component={Register} />
        </Stack.Navigator>
    )
}