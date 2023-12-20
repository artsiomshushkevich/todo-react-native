import { Button, Text, View, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_TODOS_URL } from '../constants/urls';
import { useDefaultHeadersWithToken } from '../hooks/useDefaultHeadersWithToken';

const styles = StyleSheet.create({
    listItemContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6
    },
    startContainer: {
        flexDirection: 'row',
        gap: 8
    },
    todoText: {
        fontSize: 18
    }
});

export const TodoListItem = ({ todo, index }) => {
    const headers = useDefaultHeadersWithToken();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: ({ id }) =>
            fetch(`${BASE_TODOS_URL}/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers
            }).then(res => res.json()),
        onMutate: () => {
            queryClient.setQueryData(['todos'], oldTodos => {
                const newTodos = [...oldTodos];

                newTodos.splice(index, 1);

                return newTodos;
            });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ todo }) =>
            fetch(`${BASE_TODOS_URL}/${encodeURIComponent(todo.id)}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ todo: todo.todo, isChecked: todo.isChecked })
            }).then(res => res.json()),

        onMutate: ({ todo }) => {
            queryClient.setQueryData(['todos'], oldTodos => {
                const newTodos = [...oldTodos];

                newTodos[index] = todo;

                return newTodos;
            });
        }
    });

    const handleRemove = () => {
        deleteMutation.mutate({ id: todo.id });
    };

    const handleChecked = isChecked => {
        updateMutation.mutate({ todo: { ...todo, isChecked } });
    };

    const shouldDisableControls = deleteMutation.isPending || updateMutation.isPending;

    return (
        <View style={styles.listItemContainer}>
            <View style={styles.startContainer}>
                <Checkbox
                    value={todo.isChecked}
                    onValueChange={handleChecked}
                    disabled={shouldDisableControls}
                />
                <Text style={styles.todoText}>{todo.todo}</Text>
            </View>

            <Button
                disabled={shouldDisableControls}
                onPress={handleRemove}
                title='Delete'
                color='red'
            />
        </View>
    );
};
