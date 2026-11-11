import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import type { Profile, ServiceResult } from "@/services/profileService";
import { styles } from "./styles";

// Limites do nome (depois do trim). O backend ainda não impõe limite: quando o
// PATCH /users/me existir, o DTO deve usar os mesmos valores.
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;

type Props = {
    visible: boolean;
    initialName: string;
    onClose: () => void;
    onSave: (name: string) => Promise<ServiceResult<Profile>>;
};

export function EditNameSheet({ visible, initialName, onClose, onSave }: Props) {
    const [name, setName] = useState(initialName);
    const [error, setError] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Trava síncrona: dois toques rápidos podem chegar antes do estado atualizar a tela
    const submittingRef = useRef(false);

    // A cada abertura começa do nome atual, sem erro anterior
    useEffect(() => {
        if (visible) {
            setName(initialName);
            setError(undefined);
        }
    }, [visible, initialName]);

    function handleClose() {
        if (submittingRef.current) return; // não fecha no meio do envio
        onClose();
    }

    async function handleSave() {
        if (submittingRef.current) return;

        const trimmedName = name.trim();
        if (!trimmedName) {
            setError("O nome é obrigatório.");
            return;
        }
        if (trimmedName.length < NAME_MIN_LENGTH) {
            setError(`O nome deve ter pelo menos ${NAME_MIN_LENGTH} caracteres.`);
            return;
        }
        // O maxLength do campo já barra a digitação; aqui cobre texto colado e outros caminhos
        if (trimmedName.length > NAME_MAX_LENGTH) {
            setError(`O nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres.`);
            return;
        }

        // Nada mudou: fecha sem chamar a API
        if (trimmedName === initialName) {
            onClose();
            return;
        }

        submittingRef.current = true;
        setIsSubmitting(true);
        setError(undefined);

        const result = await onSave(trimmedName);

        submittingRef.current = false;
        setIsSubmitting(false);

        if (result.ok) {
            onClose();
        } else {
            setError(result.error.message);
        }
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={handleClose}
                    accessibilityLabel="Fechar edição"
                />
                <View style={styles.sheet}>
                    <View style={styles.handle} />

                    <View style={styles.field}>
                        <Text style={styles.label}>Nome</Text>
                        <InputText
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                if (error) setError(undefined);
                            }}
                            errorMessage={error}
                            autoFocus
                            maxLength={NAME_MAX_LENGTH}
                            autoCapitalize="words"
                            returnKeyType="done"
                            onSubmitEditing={handleSave}
                            editable={!isSubmitting}
                        />
                    </View>

                    <View style={isSubmitting && styles.submitting}>
                        <Button
                            title={isSubmitting ? "Salvando..." : "Salvar"}
                            onPress={handleSave}
                            disabled={isSubmitting}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
