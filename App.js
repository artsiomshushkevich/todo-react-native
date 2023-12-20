import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './screens/HomeScreen';
import { TodosScreen } from './screens/TodosScreen';
import { TokenProvider } from './hooks/useToken';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});

export default function App() {
    return (
        <TokenProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <View style={styles.container}>
                        <Stack.Navigator>
                            <Stack.Screen name='Home' component={HomeScreen} />
                            <Stack.Screen name='Todos' component={TodosScreen} />
                        </Stack.Navigator>
                    </View>
                </NavigationContainer>
            </QueryClientProvider>
        </TokenProvider>
    );
}
