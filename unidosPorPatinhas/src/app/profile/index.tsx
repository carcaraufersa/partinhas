import React, { useState } from "react";
import { View,Text,TouchableOpacity,ScrollView,Image,Modal,TextInput,Pressable,KeyboardAvoidingView,Platform,StyleSheet} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { styles, COLORS } from "./styles";

// Layout e edição local de nome (#162 / #171): integração com API entra nos cards seguintes.
export default function Profile() {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("Maria Luiza");
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const email = "maria@gmail.com";
  const maskedPassword = "•••••••••••";

  function handleOpenNameModal() {
    setDraftName(name);
    setNameError("");
    setIsNameModalVisible(true);
  }

  function handleConfirmName() {
    const trimmedName = draftName.trim();

    if (!trimmedName) {
      setNameError("Informe um nome válido.");
      return;
    }

    setName(trimmedName);
    setNameError("");
    setIsNameModalVisible(false);
  }

  function handleCancelName() {
    setNameError("");
    setDraftName(name);
    setIsNameModalVisible(false);
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
        </View>

        {/* Avatar ilustrativo + Saudação */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBox}>
              <Image
                source={require("@/assets/avatar.png")}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.cameraBadge}>
              <Feather name="camera" size={12} color={COLORS.white} />
            </View>
          </View>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Olá,</Text>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
        </View>

        {/* Seção Informações pessoais */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações pessoais</Text>
          </View>

          <TouchableOpacity
            style={styles.infoRow}
            activeOpacity={0.7}
            onPress={handleOpenNameModal}
          >
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.purple} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.purple} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoLabel}>Senha</Text>
              <Text style={styles.infoValue}>{maskedPassword}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.purple} />
          </TouchableOpacity>
        </View>

        {/* Ação Sair da minha conta */}
        <TouchableOpacity style={styles.logoutRow} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Sair da minha conta</Text>
          <Feather name="log-out" size={20} color={COLORS.purple} />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de edição de Nome */}
      <Modal
        visible={isNameModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelName}
      >
        <KeyboardAvoidingView
          style={styles.modalKeyboardWrapper}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleCancelName}
            />

            <View
              style={[
                styles.modalContent,
                { paddingBottom: Math.max(insets.bottom, 24) },
              ]}
            >
              <View style={styles.modalHandle} />

              <Text style={styles.modalLabel}>Nome</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  isInputFocused && styles.modalInputFocused,
                  !!nameError && styles.modalInputError,
                ]}
                value={draftName}
                onChangeText={(text) => {
                  setDraftName(text);
                  if (nameError) setNameError("");
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Digite seu nome"
                placeholderTextColor={COLORS.textSecondary}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleConfirmName}
              />

              {!!nameError && (
                <Text style={styles.modalErrorText}>{nameError}</Text>
              )}

              <TouchableOpacity
                style={styles.modalConfirmButton}
                activeOpacity={0.8}
                onPress={handleConfirmName}
              >
                <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalCancelButton}
                activeOpacity={0.7}
                onPress={handleCancelName}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}