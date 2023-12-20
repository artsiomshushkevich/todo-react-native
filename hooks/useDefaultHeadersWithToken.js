import { useToken } from './useToken';

export const useDefaultHeadersWithToken = () => {
    const [token] = useToken();

    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};
