import NoteImage from '@/assets/images/note.png';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/notes');
    }
  }, [user, loading]);

  if (loading) {
    return (<View style={ styles.centeredContainer }>
      <ActivityIndicator size='large' color='#007bff' />
    </View>)
  }

  return (
    <View style={styles.container}>
      <Image source={ NoteImage} style={styles.image} />
      <Text style={styles.title}>Welcome to your notes app!</Text>
      <Text style={styles.subtitle}>Create and sort notes easily</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={ () => router.push('/notes') } // push to stack on notes page
      >
        <Text style={ styles.buttonText }>Record</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0e28b6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'cetner',
  },
});

export default HomeScreen;