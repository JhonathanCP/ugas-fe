import { useState } from 'react';
import {
    getUserById,
    getReportsForUser,
    addFavoriteReportToUser,
    removeFavoriteReportFromUser,
    getFavoriteReportsForUser,
    getModulesWithActiveReports
} from '../services/userService';
import { UserDTO, ReportDTO, ModuleDTO } from '../types';

export const useUsers = () => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [favoriteReports, setFavoriteReports] = useState<ReportDTO[]>([]);
    const [modules, setModules] = useState<ModuleDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserById = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserById(id);
            setUser(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReportsForUser = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReportsForUser(userId);
            setReports(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addFavoriteReport = async (userId: number, reportId: number) => {
        setLoading(true);
        setError(null);
        try {
            await addFavoriteReportToUser(userId, reportId);
            fetchFavoriteReportsForUser(userId); // Refresh the list after adding
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeFavoriteReport = async (userId: number, reportId: number) => {
        setLoading(true);
        setError(null);
        try {
            await removeFavoriteReportFromUser(userId, reportId);
            fetchFavoriteReportsForUser(userId); // Refresh the list after removing
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavoriteReportsForUser = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getFavoriteReportsForUser(userId);
            setFavoriteReports(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchModulesWithActiveReports = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getModulesWithActiveReports(userId);
            setModules(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        reports,
        favoriteReports,
        modules,
        loading,
        error,
        fetchUserById,
        fetchReportsForUser,
        addFavoriteReport,
        removeFavoriteReport,
        fetchFavoriteReportsForUser,
        fetchModulesWithActiveReports
    };
};