import { createContext, useContext, useState, ReactNode } from 'react';
import avatar from '../assets/avatar.png';

interface ProfileContextType {
    profile: string;
    setProfile: React.Dispatch<React.SetStateAction<string>>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState(avatar);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }
        }>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ModalProvider');
    }
    return context;
};