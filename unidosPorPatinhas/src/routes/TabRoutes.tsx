import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/app/home";
import Profile from "@/app/profile";
import { TabBar } from "@/components/TabBar";
import type { TabParamList } from "@/types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

// Uma tela por aba: navegar entre Home e Perfil reaproveita a tela já montada,
// então nunca empilha cópias. Com o backBehavior padrão, Voltar no Perfil leva à Home.
export default function TabRoutes() {
    return (
        <Tab.Navigator
            initialRouteName="home"
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
    )
}
