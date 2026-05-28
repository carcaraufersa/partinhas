export type RootStackParamList = {
    home: undefined;
    cadastro: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}