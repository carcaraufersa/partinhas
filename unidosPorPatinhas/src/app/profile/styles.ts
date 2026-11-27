import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#FFFFFF",
  textPrimary: "#1E1E1E",
  textSecondary: "#8C8C8C",
  purple: "#7952B3",
  purpleLightBorder: "#D6C4F0",
  avatarBg: "#F7F3FC",
  divider: "#ECECEC",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarWrapper: {
    position: "relative",
    width: 72,
    height: 72,
    marginRight: 16,
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.purpleLightBorder,
    backgroundColor: COLORS.avatarBg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cameraBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingContainer: {
    justifyContent: "center",
  },
  greetingText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  sectionTitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  infoTextGroup: {
    flex: 1,
    paddingRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.purple,
  },
});