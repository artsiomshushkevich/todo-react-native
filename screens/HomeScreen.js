import { AuthForm } from '../components/AuthForm';

export const HomeScreen = ({ navigation }) => {
    const onSubmit = () => {
        navigation.navigate('Todos');
    };
    return <AuthForm onSubmit={onSubmit} />;
};
