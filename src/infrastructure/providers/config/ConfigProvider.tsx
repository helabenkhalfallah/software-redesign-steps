import { ReactNode, createContext, useContext } from 'react';

import HttpRequestManager from '../../adapters/api/HttpRequestManager.ts';

interface ConfigProviderProps {
    children: ReactNode;
    apiBaseUrl: string;
}

interface ConfigContextProps {
    apiBaseUrl: string;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const useConfig = (): ConfigContextProps => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

export const ConfigProvider = ({ children, apiBaseUrl }: ConfigProviderProps) => {
    // Initialize the HttpRequestManager with the API URL
    HttpRequestManager.initialize(apiBaseUrl);

    return <ConfigContext.Provider value={{ apiBaseUrl }}>{children}</ConfigContext.Provider>;
};
