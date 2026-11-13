import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";

type TabItem = { label: string; icon: keyof typeof Ionicons.glyphMap };

const TAB_ITEMS: Record<string, TabItem> = {
    home: { label: "Home", icon: "home-outline" },
    profile: { label: "Perfil", icon: "person-outline" },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            {state.routes.map((route, index) => {
                const item = TAB_ITEMS[route.name];
                if (!item) return null;

                const focused = state.index === index;

                function handlePress() {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        style={styles.item}
                        onPress={handlePress}
                        activeOpacity={0.7}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: focused }}
                        accessibilityLabel={item.label}
                    >
                        <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color={focused ? "#FFFFFF" : "#9A9A9A"}
                            />
                        </View>
                        <Text style={[styles.label, focused && styles.labelActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
