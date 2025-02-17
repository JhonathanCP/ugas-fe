import { useState } from 'react';
import { login } from '../services/loginService';
import { JwtResponse } from '../types';

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<JwtResponse | null>(null);

  const executeLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(username, password);
      setData(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { executeLogin, loading, error, data };
};