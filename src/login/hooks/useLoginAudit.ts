import { useState, useEffect } from 'react';
import { saveLoginAudit, getLoginAudits, getLoginAuditById } from '../services/loginAuditService';
import { LoginAuditSuccess, LoginAuditFailed } from '../types';

export const useLoginAudit = () => {
    const [audits, setAudits] = useState<LoginAuditSuccess[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAudits = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getLoginAudits();
            setAudits(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAuditById = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getLoginAuditById(id);
            setAudits([data]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const saveAudit = async (audit: LoginAuditSuccess|LoginAuditFailed) => {
        setLoading(true);
        setError(null);
        try {
            await saveLoginAudit(audit);
            fetchAudits(); // Refresh the list after saving
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudits();
    }, []);

    return { audits, loading, error, fetchAudits, fetchAuditById, saveAudit };
};