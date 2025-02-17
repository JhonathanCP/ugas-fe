import { useState } from 'react';
import { logout } from '../services/loginService';

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const executeLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logout();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { executeLogout, loading, error };
};