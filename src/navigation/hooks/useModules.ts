import { useState, useEffect } from 'react';
import {
    getModules,
    getModuleById,
    saveModule,
    updateModule,
    deleteModule,
    getActiveModulesWithReports,
    getActiveModulesWithReportsInProduction,
    getReportsByModule
} from '../services/moduleService';
import { ModuleDTO, ReportDTO } from '../types';

export const useModules = () => {
    const [modules, setModules] = useState<ModuleDTO[]>([]);
    const [module, setModule] = useState<ModuleDTO | null>(null);
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchModules = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getModules();
            setModules(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchModuleById = async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                const data = await getModuleById(id);
                setModule(data); // Guardamos el objeto directamente
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

    const createModule = async (module: ModuleDTO) => {
        setLoading(true);
        setError(null);
        try {
            await saveModule(module);
            fetchModules(); // Refresh the list after saving
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const modifyModule = async (id: number, module: ModuleDTO) => {
        setLoading(true);
        setError(null);
        try {
            await updateModule(id, module);
            fetchModules(); // Refresh the list after updating
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeModule = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteModule(id);
            fetchModules(); // Refresh the list after deleting
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveModulesWithReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getActiveModulesWithReports();
            setModules(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveModulesWithReportsInProduction = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getActiveModulesWithReportsInProduction();
            setModules(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReportsByModule = async (id: number): Promise<ReportDTO[]> => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReportsByModule(id);
            setReports(data);
            return data;
        } catch (err: any) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    return {
        modules,
        module,
        reports,
        loading,
        error,
        fetchModules,
        fetchModuleById,
        createModule,
        modifyModule,
        removeModule,
        fetchActiveModulesWithReports,
        fetchActiveModulesWithReportsInProduction,
        fetchReportsByModule
    };
};