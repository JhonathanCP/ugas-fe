import api from '../../core/services/tokenInterceptor';
import { ReportDTO } from '../types';

export const getReports = async (): Promise<ReportDTO[]> => {
    const response = await api.get<ReportDTO[]>('/reports');
    return response.data;
};

export const getReportById = async (id: number): Promise<ReportDTO> => {
    const response = await api.get<ReportDTO>(`/reports/${id}`);
    return response.data;
};

export const saveReport = async (report: ReportDTO): Promise<void> => {
    await api.post('/reports', report);
};

export const updateReport = async (id: number, report: ReportDTO): Promise<void> => {
    await api.put(`/reports/${id}`, report);
};

export const deleteReport = async (id: number): Promise<void> => {
    await api.delete(`/reports/${id}`);
};