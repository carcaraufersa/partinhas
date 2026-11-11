import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
    home: undefined;
    profile: undefined;
}

export type RootStackParamList = {
    splash: undefined;
    transition: undefined;
    signIn: undefined;
    signUp: undefined;
    main: NavigatorScreenParams<TabParamList> | undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
