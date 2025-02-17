import { useState } from 'react';
import { refreshToken } from '../services/loginService';
import { JwtResponse } from '../types';

export const useRefreshToken = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<JwtResponse | null>(null);

    const executeRefreshToken = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await refreshToken();
            setData(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { executeRefreshToken, loading, error, data };
};