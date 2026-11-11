import Home from "@/app/home";
import SignUp from "@/app/signUp";
import SignIn from "@/app/signIn";
import Splash from "@/app/splash";
import Transition from "../app/transition";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import More from "@/app/more";
import Profile from "@/app/profile";
import Requests from "@/app/requests";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="transition" component={Transition}/>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
            <Stack.Screen name="requests" component={Requests} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="more" component={More} />
        </Stack.Navigator>
    )
}