import api from '../../core/services/tokenInterceptor';
import { LoginAuditSuccess, LoginAuditFailed } from '../types';

export const saveLoginAudit = async (audit: LoginAuditSuccess|LoginAuditFailed): Promise<void> => {
    await api.post('/login-audits', audit);
};

export const getLoginAudits = async (): Promise<LoginAuditSuccess[]> => {
    const response = await api.get<LoginAuditSuccess[]>('/login-audits');
    return response.data;
};

export const getLoginAuditById = async (id: number): Promise<LoginAuditSuccess> => {
    const response = await api.get<LoginAuditSuccess>(`/login-audits/${id}`);
    return response.data;
};