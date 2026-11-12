import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { EditNameSheet } from "@/components/EditNameSheet";
import { ProfileRow } from "@/components/ProfileRow";
import { useProfile } from "@/hooks/useProfile";
import { updateProfileName } from "@/services/profileService";
import { styles } from "./styles";

export default function Profile() {
    const insets = useSafeAreaInsets();
    const { state, reload, setProfile } = useProfile();
    const [isEditingName, setIsEditingName] = useState(false);

    async function handleSaveName(name: string) {
        const result = await updateProfileName(name);
        if (result.ok) setProfile(result.data);
        return result;
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <Text style={styles.title}>Perfil</Text>

            {state.status === "loading" && (
                <View style={styles.centered} accessibilityLiveRegion="polite">
                    <ActivityIndicator size="large" color="#7952b3" />
                    <Text style={styles.feedback}>Carregando seu perfil...</Text>
                </View>
            )}

            {state.status === "error" && (
                <View style={styles.centered}>
                    <Ionicons name="alert-circle-outline" size={40} color="#E53E3E" />
                    <Text style={styles.feedback} accessibilityRole="alert">
                        {state.error.message}
                    </Text>
                    {state.error.retryable && (
                        <View style={styles.retryButton}>
                            <Button title="Tentar novamente" onPress={reload} />
                        </View>
                    )}
                </View>
            )}

            {state.status === "success" && (
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <Ionicons name="person-outline" size={40} color="#7952b3" />
                        </View>
                        <Text style={styles.greeting}>Olá,{"\n"}{state.profile.name}</Text>
                    </View>

                    <Text style={styles.section}>Informações pessoais</Text>
                    <ProfileRow
                        label="Nome"
                        value={state.profile.name}
                        onPress={() => setIsEditingName(true)}
                    />
                    <ProfileRow label="E-mail" value={state.profile.email} />
                </View>
            )}

            {state.status === "success" && (
                <EditNameSheet
                    visible={isEditingName}
                    initialName={state.profile.name}
                    onClose={() => setIsEditingName(false)}
                    onSave={handleSaveName}
                />
            )}
        </View>
    );
}
