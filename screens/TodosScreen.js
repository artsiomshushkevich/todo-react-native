import { View, Text } from 'react-native';
import { useToken } from '../hooks/useToken';

export const TodosScreen = () => {
    const [token] = useToken();
    console.log(token);
    return (
        <View>
            <Text>Todos</Text>
        </View>
    );
};
