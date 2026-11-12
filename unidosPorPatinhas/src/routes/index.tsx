import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./StackRoutes";
import { navigationRef } from "./navigationRef";

export function Routes() {
    return (
        <NavigationContainer ref={navigationRef}>
            <StackRoutes />
        </NavigationContainer>
    )
}
