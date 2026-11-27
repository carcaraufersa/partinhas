import React, { useState, useRef, useEffect } from "react";
import {View,Text,TouchableOpacity,ScrollView,Image,Modal,TextInput,Pressable,KeyboardAvoidingView,Platform,StyleSheet,ActivityIndicator} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { styles, COLORS } from "./styles";

type PasswordFieldKey = "current" | "next" | "confirm";

interface PasswordErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

// Layout e edição local de nome/senha (#162 / #171 / #180): integração com API entra nos cards seguintes.
export default function Profile() {
  const insets = useSafeAreaInsets();

  // Estados da edição de Nome (#171)
  const [name, setName] = useState("Maria Luiza");
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);

  // Estados da edição de Senha (#180) — nunca persistidos nem registrados em texto claro
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [focusedPasswordField, setFocusedPasswordField] =
    useState<PasswordFieldKey | null>(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const isSubmittingRef = useRef(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const email = "maria@gmail.com";
  const maskedPassword = "•••••••••••";

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  // Handlers de Nome 
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

  // Handlers de Senha
  function clearSensitivePasswordState() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordErrors({});
    setFocusedPasswordField(null);
  }

  function handleOpenPasswordModal() {
    isSubmittingRef.current = false;
    setIsSubmittingPassword(false);
    clearSensitivePasswordState();
    setIsPasswordModalVisible(true);
  }

  function handleCancelPassword() {
    if (isSubmittingRef.current) return;
    clearSensitivePasswordState();
    setIsPasswordModalVisible(false);
  }

  function handleConfirmPassword() {
    if (isSubmittingRef.current) return;

    const errors: PasswordErrors = {};

    if (!currentPassword.trim()) {
      errors.current = "Informe a senha atual.";
    }

    if (!newPassword.trim()) {
      errors.next = "Informe a nova senha.";
    }

    if (!confirmNewPassword.trim()) {
      errors.confirm = "Confirme a nova senha.";
    } else if (newPassword !== confirmNewPassword) {
      errors.confirm = "A nova senha e a confirmação não coincidem.";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmittingPassword(true);
    setPasswordErrors({});

    submitTimerRef.current = setTimeout(() => {
      clearSensitivePasswordState();
      isSubmittingRef.current = false;
      setIsSubmittingPassword(false);
      setIsPasswordModalVisible(false);
    }, 300);
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

          <TouchableOpacity
            style={styles.infoRow}
            activeOpacity={0.7}
            onPress={handleOpenPasswordModal}
          >
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

      {/* Modal de edição de Nome (#171) */}
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
                  isNameInputFocused && styles.modalInputFocused,
                  !!nameError && styles.modalInputError,
                ]}
                value={draftName}
                onChangeText={(text) => {
                  setDraftName(text);
                  if (nameError) setNameError("");
                }}
                onFocus={() => setIsNameInputFocused(true)}
                onBlur={() => setIsNameInputFocused(false)}
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
                style={[styles.modalConfirmButton, { marginTop: 20 }]}
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

      {/* Modal de edição de Senha */}
      <Modal
        visible={isPasswordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelPassword}
      >
        <KeyboardAvoidingView
          style={styles.modalKeyboardWrapper}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleCancelPassword}
            />

            <View
              style={[
                styles.modalContent,
                { paddingBottom: Math.max(insets.bottom, 24) },
              ]}
            >
              <View style={styles.modalHandle} />

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Senha atual */}
                <View style={styles.modalFieldGroup}>
                  <Text style={styles.modalLabel}>Senha atual</Text>
                  <View
                    style={[
                      styles.modalPasswordContainer,
                      focusedPasswordField === "current" &&
                        styles.modalInputFocused,
                      !!passwordErrors.current && styles.modalInputError,
                    ]}
                  >
                    <TextInput
                      style={styles.modalPasswordInput}
                      value={currentPassword}
                      onChangeText={(text) => {
                        setCurrentPassword(text);
                        if (passwordErrors.current) {
                          setPasswordErrors((prev) => ({
                            ...prev,
                            current: undefined,
                          }));
                        }
                      }}
                      onFocus={() => setFocusedPasswordField("current")}
                      onBlur={() => setFocusedPasswordField(null)}
                      placeholder="Digite sua senha atual"
                      placeholderTextColor={COLORS.textSecondary}
                      secureTextEntry={!showCurrentPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      textContentType="none"
                      editable={!isSubmittingPassword}
                      autoFocus
                    />
                    <TouchableOpacity
                      style={styles.modalEyeButton}
                      onPress={() =>
                        setShowCurrentPassword((prev) => !prev)
                      }
                      disabled={isSubmittingPassword}
                    >
                      <Feather
                        name={showCurrentPassword ? "eye-off" : "eye"}
                        size={18}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {!!passwordErrors.current && (
                    <Text style={styles.modalErrorText}>
                      {passwordErrors.current}
                    </Text>
                  )}
                </View>

                {/* Nova senha */}
                <View style={styles.modalFieldGroup}>
                  <Text style={styles.modalLabel}>Nova senha</Text>
                  <View
                    style={[
                      styles.modalPasswordContainer,
                      focusedPasswordField === "next" &&
                        styles.modalInputFocused,
                      !!passwordErrors.next && styles.modalInputError,
                    ]}
                  >
                    <TextInput
                      style={styles.modalPasswordInput}
                      value={newPassword}
                      onChangeText={(text) => {
                        setNewPassword(text);
                        if (passwordErrors.next || passwordErrors.confirm) {
                          setPasswordErrors((prev) => ({
                            ...prev,
                            next: undefined,
                            confirm: undefined,
                          }));
                        }
                      }}
                      onFocus={() => setFocusedPasswordField("next")}
                      onBlur={() => setFocusedPasswordField(null)}
                      placeholder="Digite a nova senha"
                      placeholderTextColor={COLORS.textSecondary}
                      secureTextEntry={!showNewPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      textContentType="none"
                      editable={!isSubmittingPassword}
                    />
                    <TouchableOpacity
                      style={styles.modalEyeButton}
                      onPress={() => setShowNewPassword((prev) => !prev)}
                      disabled={isSubmittingPassword}
                    >
                      <Feather
                        name={showNewPassword ? "eye-off" : "eye"}
                        size={18}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {!!passwordErrors.next && (
                    <Text style={styles.modalErrorText}>
                      {passwordErrors.next}
                    </Text>
                  )}
                </View>

                {/* Confirmar nova senha */}
                <View style={styles.modalFieldGroup}>
                  <Text style={styles.modalLabel}>Confirmar nova senha</Text>
                  <View
                    style={[
                      styles.modalPasswordContainer,
                      focusedPasswordField === "confirm" &&
                        styles.modalInputFocused,
                      !!passwordErrors.confirm && styles.modalInputError,
                    ]}
                  >
                    <TextInput
                      style={styles.modalPasswordInput}
                      value={confirmNewPassword}
                      onChangeText={(text) => {
                        setConfirmNewPassword(text);
                        if (passwordErrors.confirm) {
                          setPasswordErrors((prev) => ({
                            ...prev,
                            confirm: undefined,
                          }));
                        }
                      }}
                      onFocus={() => setFocusedPasswordField("confirm")}
                      onBlur={() => setFocusedPasswordField(null)}
                      placeholder="Confirme a nova senha"
                      placeholderTextColor={COLORS.textSecondary}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      textContentType="none"
                      editable={!isSubmittingPassword}
                      returnKeyType="done"
                      onSubmitEditing={handleConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.modalEyeButton}
                      onPress={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      disabled={isSubmittingPassword}
                    >
                      <Feather
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {!!passwordErrors.confirm && (
                    <Text style={styles.modalErrorText}>
                      {passwordErrors.confirm}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalConfirmButton,
                    isSubmittingPassword && styles.modalConfirmButtonDisabled,
                  ]}
                  activeOpacity={0.8}
                  onPress={handleConfirmPassword}
                  disabled={isSubmittingPassword}
                >
                  {isSubmittingPassword ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCancelButton}
                  activeOpacity={0.7}
                  onPress={handleCancelPassword}
                  disabled={isSubmittingPassword}
                >
                  <Text style={styles.modalCancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}