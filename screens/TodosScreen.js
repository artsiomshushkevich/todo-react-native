import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { BASE_TODOS_URL } from '../constants/urls';
import { useDefaultHeadersWithToken } from '../hooks/useDefaultHeadersWithToken';
import { useToken } from '../hooks/useToken';

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    logOutButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    loadingText: {
        fontSize: 18
    }
});

export const TodosScreen = () => {
    const [, setToken] = useToken();
    const navigation = useNavigation();
    const headers = useDefaultHeadersWithToken();
    const { isFetching, data: todos } = useQuery({
        queryFn: () =>
            fetch(`${BASE_TODOS_URL}/`, { method: 'GET', headers }).then(res => res.json()),
        queryKey: ['todos']
    });

    const handleLogOut = () => {
        setToken('');
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logOutButtonContainer}>
                <Button onPress={handleLogOut} title='Log out' color='red' />
            </View>

            <TodoForm />

            {isFetching ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <TodoList todos={todos} />
            )}
        </View>
    );
};
