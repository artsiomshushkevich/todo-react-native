import { createContext, useContext, useState } from 'react';

const TokenContext = createContext(null);

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const tokenState = useState('');

    return <TokenContext.Provider value={tokenState}>{children}</TokenContext.Provider>;
};
