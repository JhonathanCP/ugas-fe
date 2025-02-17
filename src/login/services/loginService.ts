import api from '../../core/services/tokenInterceptor';
import { LoginRequest, JwtResponse } from "../types";

export const login = async (username: string, password: string): Promise<JwtResponse> => {
    const requestData: LoginRequest = { username, password };
    const response = await api.post<JwtResponse>('/login', requestData);
    const { access_token, refresh_token } = response.data;

    // Guardar los tokens en el local storage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return response.data;
};

export const refreshToken = async (): Promise<JwtResponse> => {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await api.post<JwtResponse>('/refresh-token', { refresh_token });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    // Actualizar los tokens en el local storage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', newRefreshToken);

    return response.data;
};

export const logout = async (): Promise<void> => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    await api.post('/logout-token', { access_token, refresh_token });

    // Eliminar los tokens del local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};