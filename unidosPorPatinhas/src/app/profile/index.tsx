import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { styles, COLORS } from "./styles";


export default function Profile() {
  const insets = useSafeAreaInsets();

  // Dados ilustrativos conforme referência do Figma até a integração com a API
  const user = {
    name: "Maria Luiza",
    email: "maria@gmail.com",
    maskedPassword: "•••••••••••",
  };

  return (
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
          <Text style={styles.userNameText}>{user.name}</Text>
        </View>
      </View>

      {/* Seção Informações pessoais */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações pessoais</Text>
        </View>

        <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Nome</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={COLORS.purple} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={COLORS.purple} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoLabel}>Senha</Text>
            <Text style={styles.infoValue}>{user.maskedPassword}</Text>
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
  );
}