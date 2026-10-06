import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40, 
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 24, 
    marginTop: 20,
  },
  logo: {
    width: '20%',
    maxWidth: 80, 
    height: undefined,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: '100%',
    height: 300, 
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  title: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    color: '#1A1A1A', 
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#8257E5', 
    width: '95%',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Inter_500Medium',
    color: '#FFFFFF',
    fontSize: 16,
  }
});