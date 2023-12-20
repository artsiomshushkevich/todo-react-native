import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@tanstack/react-query';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import { BASE_AUTH_URL } from '../constants/urls';

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    formHeader: {
        fontSize: 24,
        marginBottom: 16
    },
    checkboxContainer: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 16
    },
    input: {
        width: 300,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        paddingStart: 8,
        marginBottom: 16
    },
    errorContainer: {
        marginBottom: 16
    },
    errorText: {
        color: 'red',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 3,
        padding: 4
    },
    button: {
        height: 60
    }
});

export const AuthForm = ({ onSubmit }) => {
    const [shouldSignUp, setShouldSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isPending, isError, isSuccess, mutate, data, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            console.log('shouldSingUp', shouldSignUp);

            const response = await fetch(`${BASE_AUTH_URL}/${shouldSignUp ? 'signup' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Smth went wrong!');
            }

            return response.json();
        }
    });

    useEffect(() => {
        if (isSuccess && data) {
            onSubmit(data.token);
        }
    }, [isSuccess, data]);

    const isSubmissionEnabled = username.length > 0 && password.length > 0 && !isPending;

    const handleSubmit = () => {
        mutate({ username, password });
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
            <View>
                <Text style={styles.formHeader}>Log in or Sign up</Text>

                <TextInput
                    value={username}
                    textContentType='emailAddress'
                    style={styles.input}
                    placeholder='Enter email'
                    onChangeText={text => setUsername(text)}
                />

                <TextInput
                    value={password}
                    secureTextEntry
                    style={styles.input}
                    placeholder='Enter password'
                    onChangeText={text => setPassword(text)}
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox value={shouldSignUp} onValueChange={setShouldSignUp} />
                    <Text>Should sign up?</Text>
                </View>

                {isError && !isPending && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Smth went wrong!</Text>
                    </View>
                )}

                <Button
                    disabled={!isSubmissionEnabled}
                    onPress={handleSubmit}
                    title={shouldSignUp ? 'Sign up' : 'Log in'}
                    style={styles.button}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};
