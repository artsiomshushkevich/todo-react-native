import { StyleSheet, Text, View, Checkbox } from 'react-native';
import { AuthForm } from './components/AuthForm';

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
        <View style={styles.container}>
            <AuthForm />
        </View>
    );
}
