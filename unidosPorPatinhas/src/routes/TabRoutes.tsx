import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {createBottomTabNavigator, BottomTabBarProps,} from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TabParamList } from "@/types/navigation";

import Home from "../app/home";
import Profile from "../app/profile";

const Tab = createBottomTabNavigator<TabParamList>();

const COLORS = {
  background: "#FFFFFF",
  activeBadge: "#9673C7",
  activeText: "#6E47B5",
  activeIcon: "#FFFFFF",
  inactive: "#8C8C8C",
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const renderNavItem = (
    routeName: keyof TabParamList,
    label: string,
    iconName: keyof typeof Feather.glyphMap
  ) => {
    const routeIndex = state.routes.findIndex((r) => r.name === routeName);
    const route = state.routes[routeIndex];
    const isFocused = state.index === routeIndex;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={descriptors[route.key]?.options.tabBarAccessibilityLabel}
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.tabItem}
      >
        <View style={[styles.iconBox, isFocused && styles.iconBoxActive]}>
          <Feather
            name={iconName}
            size={22}
            color={isFocused ? COLORS.activeIcon : COLORS.inactive}
          />
        </View>
        <Text
          style={[
            styles.label,
            { color: isFocused ? COLORS.activeText : COLORS.inactive },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Itens visuais do protótipo ainda sem ecrãs entregues (sem ação de navegação)
  const renderDisabledItem = (
    label: string,
    iconName: keyof typeof Feather.glyphMap
  ) => (
    <View key={label} style={styles.tabItem}>
      <View style={styles.iconBox}>
        <Feather name={iconName} size={22} color={COLORS.inactive} />
      </View>
      <Text style={[styles.label, { color: COLORS.inactive }]}>{label}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {renderNavItem("home", "Home", "home")}
      {renderDisabledItem("Solicitação", "clock")}
      {renderNavItem("profile", "Perfil", "user")}
      {renderDisabledItem("Mais", "align-justify")}
    </View>
  );
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconBoxActive: {
    backgroundColor: COLORS.activeBadge,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});