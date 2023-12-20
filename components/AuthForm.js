import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';

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
    button: {
        height: 60
    }
});

export const AuthForm = ({ onSubmit }) => {
    const [shouldSignUp, setShouldSignUp] = useState(false);

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
            <View>
                <Text style={styles.formHeader}>Log in or Sign up</Text>

                <TextInput
                    textContentType='emailAddress'
                    style={styles.input}
                    placeholder='Enter email'
                />

                <TextInput secureTextEntry style={styles.input} placeholder='Enter password' />

                <View style={styles.checkboxContainer}>
                    <Checkbox value={shouldSignUp} onValueChange={setShouldSignUp} />
                    <Text>Should sign up?</Text>
                </View>
                <Button
                    onPress={onSubmit}
                    title={shouldSignUp ? 'Sign up' : 'Log in'}
                    style={styles.button}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};
