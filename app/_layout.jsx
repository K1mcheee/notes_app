import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack
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

  </Stack>
};

export default RootLayout;