import Home from "@/app/home";
import SignUp from "@/app/signUp";
import SignIn from "@/app/signIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
        </Stack.Navigator>
    )
}