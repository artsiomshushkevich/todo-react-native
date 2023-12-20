import { AuthForm } from '../components/AuthForm';
import { useToken } from '../hooks/useToken';

export const HomeScreen = ({ navigation }) => {
    const [, setToken] = useToken();

    const onSubmit = token => {
        setToken(token);
        navigation.navigate('Todos');
    };
    return <AuthForm onSubmit={onSubmit} />;
};
