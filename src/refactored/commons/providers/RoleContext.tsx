import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface RoleContextProps {
    userRole: string;
    setUserRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const [userRole, setUserRole] = useState<string>('guest');

    // Fetch the user role once when the provider mounts
    useEffect(() => {
        const fetchUserRole = async () => {
            const roleFromAPI = await new Promise<string>((resolve) => {
                setTimeout(() => resolve('premium'), 1000);
            });
            setUserRole(roleFromAPI);
        };

        fetchUserRole();
    }, []);

    return (
        <RoleContext.Provider value={{ userRole, setUserRole }}>{children}</RoleContext.Provider>
    );
};

export const useRole = (): RoleContextProps => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
