import api from '../../core/services/tokenInterceptor';
import { UserDTO, ReportDTO, ModuleDTO } from '../types';

export const getUserById = async (id: number): Promise<UserDTO> => {
    const response = await api.get<UserDTO>(`/users/${id}`);
    return response.data;
};

export const getReportsForUser = async (userId: number): Promise<ReportDTO[]> => {
    const response = await api.get<ReportDTO[]>(`/users/${userId}/reports`);
    return response.data;
};

export const addFavoriteReportToUser = async (userId: number, reportId: number): Promise<void> => {
    await api.post(`/users/${userId}/favoriteReports/${reportId}`); 
};

export const removeFavoriteReportFromUser = async (userId: number, reportId: number): Promise<void> => {
    await api.delete(`/users/${userId}/favoriteReports/${reportId}`);
};

export const getFavoriteReportsForUser = async (userId: number): Promise<ReportDTO[]> => {
    const response = await api.get<ReportDTO[]>(`/users/${userId}/favoriteReports`);
    return response.data;
};

export const getModulesWithActiveReports = async (userId: number): Promise<ModuleDTO[]> => {
    const response = await api.get<ModuleDTO[]>(`/users/${userId}/modules`);
    return response.data;
};