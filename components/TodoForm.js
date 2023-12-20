import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { BASE_TODOS_URL } from '../constants/urls';
import { useDefaultHeadersWithToken } from '../hooks/useDefaultHeadersWithToken';

const styles = StyleSheet.create({
    formHeader: {
        fontSize: 24,
        marginBottom: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    input: {
        width: 220,
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
        paddingStart: 8,
        marginBottom: 16,
        fontSize: 16
    }
});

export const TodoForm = () => {
    const [todo, setTodo] = useState('');

    const queryClient = useQueryClient();
    const headers = useDefaultHeadersWithToken();

    const { isPending, mutate } = useMutation({
        mutationFn: async ({ todo }) => {
            const response = await fetch(`${BASE_TODOS_URL}/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ todo })
            });

            if (!response.ok) {
                throw new Error('Smth went wrong!');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            setTodo('');
        }
    });

    const isSubmissionEnabled = todo.length > 0 && !isPending;

    const handleSubmit = () => {
        mutate({ todo });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Add todo</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={todo}
                    style={styles.input}
                    placeholder='Enter todo'
                    onChangeText={text => setTodo(text)}
                />

                <Button
                    disabled={!isSubmissionEnabled}
                    onPress={handleSubmit}
                    title={isPending ? 'Loading' : 'Add'}
                />
            </View>
        </View>
    );
};
