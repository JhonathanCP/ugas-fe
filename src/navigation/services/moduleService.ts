import api from '../../core/services/tokenInterceptor';
import { ModuleDTO, ReportDTO } from '../types';

export const getModules = async (): Promise<ModuleDTO[]> => {
    const response = await api.get<ModuleDTO[]>('/modules');
    return response.data;
};

export const getModuleById = async (id: number): Promise<ModuleDTO> => {
    const response = await api.get<ModuleDTO>(`/modules/${id}`);
    return response.data;
};

export const saveModule = async (module: ModuleDTO): Promise<void> => {
    await api.post('/modules', module);
};

export const updateModule = async (id: number, module: ModuleDTO): Promise<void> => {
    await api.put(`/modules/${id}`, module);
};

export const deleteModule = async (id: number): Promise<void> => {
    await api.delete(`/modules/${id}`);
};

export const getActiveModulesWithReports = async (): Promise<ModuleDTO[]> => {
    const response = await api.get<ModuleDTO[]>('/modules/active-with-reports');
    return response.data;
};

export const getActiveModulesWithReportsInProduction = async (): Promise<ModuleDTO[]> => {
    const response = await api.get<ModuleDTO[]>('/modules/active-with-reports-in-production');
    return response.data;
};

export const getReportsByModule = async (id: number): Promise<ReportDTO[]> => {
    const response = await api.get<ReportDTO[]>(`/modules/${id}/reports`);
    return response.data;
};