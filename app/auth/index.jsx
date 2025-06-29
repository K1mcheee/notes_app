import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);
    const [error, setError] = useState(false);

    return ( <View style={ styles.container }>
        <Text style={ styles.header }>{ isRegistering ? 'Sign Up' : 'Login' }</Text>

        { error ? <Text style={ styles.error }>{ error }</Text> : null }

        <TextInput 
            style={ styles.input }
            placeholder='Email'
            placeholderTextColor='#aaa'
            value={ email }
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
        />
        <TextInput 
            style={ styles.input }
            placeholder='Password'
            placeholderTextColor='#aaa'
            value={ password }
            onChangeText={setPassword}
            secureTextEntry            
        />

        { isRegistering && (
            <TextInput 
                style={ styles.input }
                placeholder='Confirm Password'
                placeholderTextColor='#aaa'
                value={ confirmPassword }
                onChangeText={setConfirmPassword}
                secureTextEntry            
            />
        ) }

        <TouchableOpacity style={ styles.button }>
            <Text style={ styles.buttonText }>
                { isRegistering ? 'Sign Up' : 'Login' }
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => setIsRegistering(!isRegistering) }>
            <Text style={ styles.switchText }>
                { isRegistering 
                ? 'Already have an account? Login' 
                : "Don't have an account? Sign up." }
            </Text>
        </TouchableOpacity>
        
    </View>);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#0e28b6',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        margin: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    switchText: {
        marginTop: 10,
        color: '#007bff',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
    },

});

export default AuthScreen;