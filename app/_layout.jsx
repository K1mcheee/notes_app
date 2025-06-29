import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={ styles.logout } onPress={ logout }>
      <Text style={ styles.logoutText }>Logout</Text>
    </TouchableOpacity>
  ) : null;
}

const RootLayout = () => {
  return <AuthProvider>
   <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4e42d5',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerRight: () => <HeaderLogout />,
      contentStyle: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
      },
    }}
  >
    <Stack.Screen name='index' options={{ title: 'Home' }} />
    <Stack.Screen name='notes' 
      options={{ headerTitle: 'Notes',
                 headerTitleAlign: 'center',
     }} />
      <Stack.Screen name='auth' 
      options={{ headerTitle: 'Login',
                 headerTitleAlign: 'center',
     }} />

  </Stack>
  </AuthProvider>
};

const styles = StyleSheet.create({

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default RootLayout;