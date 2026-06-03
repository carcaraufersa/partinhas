export type RootStackParamList = {
    home: undefined;
    signIn: undefined;
    signUp: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}